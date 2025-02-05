import { useCallback, useEffect, useState } from "react";
import { BoTraderApi } from "../../../lib/api/service/boTraderApi.ts";
import { formatTradeData } from "../../../utils";

// Define Token interface that matches the expected structure
interface Token {
  id: string;
  name: string;
  symbol: string;
}

interface TradeData {
  tokenId: string;
  amount: string;
  direction: { text: string; color: string };
  tradingPair: string;
  entryPrice: string;
  expiryTime: string;
  exitPrice: string;
  result: { text: string; color: string };
  status: string;
  createdAt: string;
}

export const useTradeHistory = () => {
  const [listToken, setListToken] = useState<Token[]>([]); // Set the correct type to Token[]
  const [conversionDataTable, setConversionDataTable] = useState<TradeData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [tradeStats, setTradeStats] = useState<any>({
    totalTrades: 0,
    winRate: 0,
    totalVolume: 0,
    totalWins: 0,
    totalLosses: 0,
    totalBuy: 0,
    totalSell: 0,
    totalProfit: 0,
    netProfit: 0,
  });

  const getListToken = useCallback(async () => {
    try {
      const res = await BoTraderApi.getListToken();
      setListToken(res.data); // Assuming res.data is an array of Token objects
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleHistoryTrade = useCallback(async () => {
    if (listToken.length === 0) return;
    try {
      setIsLoading(true);
      const res = await BoTraderApi.historyTrade('0', '100000', false);
      const formattedData: TradeData[] = formatTradeData(res?.data?.contents, listToken); // Now listToken is correctly typed as Token[]
      const totalTrades = formattedData.length;
      const totalBuyTrades = formattedData.filter((trade) => trade.direction.text === 'BUY').length;
      const totalSellTrades = formattedData.filter((trade) => trade.direction.text === 'SELL').length;
      const buyPercentage = totalTrades > 0 ? ((totalBuyTrades / totalTrades) * 100).toFixed(2) : 0;
      const sellPercentage = totalTrades > 0 ? ((totalSellTrades / totalTrades) * 100).toFixed(2) : 0;
      const totalWins = formattedData.filter((trade) => trade.result.text === 'WIN').length;
      const winRate = totalTrades > 0 ? (totalWins / totalTrades * 100).toFixed(2) : 0;
      const totalVolume = formattedData.reduce((sum, trade) => sum + parseFloat(trade.amount), 0).toFixed(2);
      const totalLosses = formattedData.filter((trade) => trade.result.text === 'LOSS').reduce((sum, trade) => sum + parseFloat(trade.amount), 0).toFixed(2);
      const totalProfit = (parseFloat(totalVolume) - parseFloat(totalLosses)).toFixed(2);
      const exchangeFee = parseFloat(totalProfit) * 0.05;
      const netProfit = (parseFloat(totalProfit) - exchangeFee).toFixed(2);
      setTradeStats({
        totalTrades,
        winRate,
        totalVolume,
        totalWins,
        totalLosses: totalTrades - totalWins,
        buyPercentage,
        sellPercentage,
        totalProfit,
        netProfit
      });
      setTotal(formattedData.length);
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      setConversionDataTable(formattedData.slice(startIndex, endIndex));
    } catch (error) {
      console.error('Error fetching trade history:', error);
    } finally {
      setIsLoading(false);
    }
  }, [listToken, currentPage, pageSize]);

  useEffect(() => {
    getListToken().then();
  }, [getListToken]);

  useEffect(() => {
    if (listToken.length > 0) {
      handleHistoryTrade().then();
    }
  }, [listToken, handleHistoryTrade, currentPage, pageSize]);

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return {
    conversionDataTable,
    isLoading,
    currentPage,
    pageSize,
    total,
    handlePageChange,
    tradeStats
  };
};
