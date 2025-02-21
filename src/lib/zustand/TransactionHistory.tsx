import { create } from "zustand";
import { BoTraderApi } from "../api/service/boTraderApi";
import TradeHistory from "../../pages/trade-history";

interface TransactionHistory {
    amount: number;
    userId: number;
    direction: number;
    txHash: string;
    createdAt: string;
  }

  interface TradeHistory {
    betAmount:  number;
    betDirection: string;
    openPrice:  number;
    closePrice:  number;
    closeTime:  string;
    userId: number;
    result: number | string;
    createdAt: string;
  }
  
interface TradeStore {
  TransactionHistory: TransactionHistory[];
  fetchTransactionHistory: () => Promise<void>;
  TradeHistory: TradeHistory[];
  fetchTradeHistory: () => Promise<void>;
}

export const useTradeStore = create<TradeStore>((set) => ({
  TransactionHistory: [], 
  TradeHistory: [], 

  fetchTransactionHistory: async () => {
    try {
      const res = await BoTraderApi.getHistory('0','1000');
    //   console.log(res.contents)
      set({ TransactionHistory: res.contents }); 
    } catch (err) {
      console.error("Error fetching trade history:", err);
    }
  },

  fetchTradeHistory: async () => {
    try {
      const res = await BoTraderApi.historyTrade('0','1000');
    //   console.log(res.contents)
      set({ TradeHistory: res.contents }); 
    } catch (err) {
      console.error("Error fetching trade history:", err);
    }
  },
}));
