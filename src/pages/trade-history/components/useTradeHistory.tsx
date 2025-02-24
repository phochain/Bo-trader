import { useEffect, useState, useMemo, useTransition, useCallback, useRef } from "react";
import { useTradeStore } from "../../../lib/zustand/TransactionHistory.tsx";

export const useTradeHistory = () => {
  const [conversionDataTable, setConversionDataTable] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [prevData, setPrevData] = useState([]);
  const [isPending, startTransition] = useTransition();
  const prevFormattedData = useRef([]);
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

  const { TradeHistory, fetchTradeHistory } = useTradeStore();
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    await fetchTradeHistory();
    setIsLoading(false);
  }, [fetchTradeHistory]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const formattedData = useMemo(() => {
    return TradeHistory.map((item) => ({
      userId: item.userId,
      results: item.result === 1 ? "Win" : item.result === 2 ? "Lose" : "Pending",
      betAmount: parseFloat(item.betAmount.toFixed(2)),
      betDirection: item.betDirection === "UP" ? "Buy" : "Sell",
      openPrice: parseFloat(item.openPrice.toFixed(2)),
      closePrice: parseFloat(item.closePrice.toFixed(2)),
      closeTime: new Date(item.closeTime).toLocaleString(),
      createdAt: new Date(item.createdAt).toLocaleString(),
    }));
  }, [TradeHistory]);

  useEffect(() => {
    if (formattedData.length === 0) return;
    if (JSON.stringify(prevFormattedData.current) === JSON.stringify(formattedData)) {
      return;
    }
    prevFormattedData.current = formattedData;
    const totalTrades = formattedData.length;
    const totalBuyTrades = formattedData.filter((trade) => trade.betDirection === "Buy").length;
    const totalSellTrades = formattedData.filter((trade) => trade.betDirection === "Sell").length;
    const buyPercentage = totalTrades > 0 ? ((totalBuyTrades / totalTrades) * 100).toFixed(2) : 0;
    const sellPercentage = totalTrades > 0 ? ((totalSellTrades / totalTrades) * 100).toFixed(2) : 0;
    const totalWins = formattedData.filter((trade) => trade.results === "Win").length;
    const totalLosses = totalTrades - totalWins;
    const winRate = totalTrades > 0 ? ((totalWins / totalTrades) * 100).toFixed(2) : 0;
    const totalVolume = formattedData.reduce((sum, trade) => sum + trade.betAmount, 0).toFixed(2);
    const totalProfit = (parseFloat(totalVolume) - totalLosses).toFixed(2);
    const exchangeFee = parseFloat(totalProfit) * 0.05;
    const netProfit = (parseFloat(totalProfit) - exchangeFee).toFixed(2);

    setTradeStats({
      totalTrades,
      winRate,
      totalVolume,
      totalWins,
      totalLosses,
      buyPercentage,
      sellPercentage,
      totalProfit,
      netProfit,
    });

    setTotal(totalTrades);
  }, [formattedData]);

  useEffect(() => {
    if (!isLoading) {
      setPrevData(conversionDataTable);
    }
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setConversionDataTable(formattedData.slice(startIndex, endIndex));
  }, [formattedData, currentPage, pageSize, isLoading]);

  const handlePageChange = (page: number, pageSize: number) => {
    startTransition(() => {
      setCurrentPage(page);
      setPageSize(pageSize);
    });
  };

  return {
    conversionDataTable: isLoading ? prevData : conversionDataTable,
    isLoading,
    isPending,
    currentPage,
    pageSize,
    total,
    handlePageChange,
    tradeStats,
  };
};
