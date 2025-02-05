import { create } from "zustand";
import axios from "axios";
import { BoTraderApi } from "../api/service/boTraderApi.ts";

interface ITokenState {
  name: string;
  symbol: string;
  address: string;
  id: number;
  balance: number;
  balanceInUsd?: number;
}

interface IListTokenState {
  listToken: ITokenState[];
  setListToken: (listToken: ITokenState[]) => void;
  refetchListToken: () => Promise<void>;
}

export const useToken = create<IListTokenState>((set) => ({
  listToken: [],
  setListToken: (listToken) => {
    if (Array.isArray(listToken)) {
      set({ listToken });
    } else {
      console.error("setListToken expects an array", listToken);
    }
  },
  refetchListToken: async () => {
    try {
      const listTokenResponse = await BoTraderApi.getListToken();
      const listBalanceResponse = await BoTraderApi.getBalance();

      // Ensure listTokenResponse is an array
      if (!Array.isArray(listTokenResponse)) {
        console.error("Expected listToken to be an array", listTokenResponse);
        return;
      }

      const data = await Promise.all(listTokenResponse.map(async (item: any) => {
        const balanceData = listBalanceResponse.find((balance: any) => balance.token.id === item.id);
        const symbol = item.binanceSymbol.toUpperCase();
        let balanceInUsdt = 0;
        let balance = 0;

        if (balanceData) {
          balance = balanceData.balance ?? 0;
          if (balance > 0) {
            if (symbol === 'USDT') {
              balanceInUsdt = balanceData.balance ?? 0;
            } else {
              const { data: { price } }: any = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}USDT`);
              balanceInUsdt = balance * price;
            }
          }
        }

        return {
          id: item.id,
          symbol: symbol,
          name: item.name,
          address: item.address,
          balance: balance,
          balanceInUsd: balanceInUsdt,
        };
      }));

      set({ listToken: data });
    } catch (error) {
      console.error("Error fetching tokens or balances", error);
    }
  },
}));