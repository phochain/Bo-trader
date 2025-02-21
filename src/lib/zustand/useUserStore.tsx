import { create } from "zustand";
import { BoTraderApi } from "../api/service/boTraderApi.ts";

// Define the state and actions interface
interface CombinedState {
  userInfo: any;
  balance: number ;
  isBalanceVisible: boolean;
  getUserInfo: () => Promise<void>;
  toggleBalanceVisibility: () => void;
  resetWalletBalance: () => void;
  getBalance: () => Promise<void>;
}

const useCombinedStore = create<CombinedState>((set) => ({
  userInfo: null,
  balance: 0,
  isBalanceVisible: true,

  getUserInfo: async () => {
    try {
      const userInfo = await BoTraderApi.getMe();
      set({ userInfo, balance: userInfo?.balance || 0 });
    } catch (error) {
      console.error(error, "Error getting user info");
    }
  },

  toggleBalanceVisibility: () => {
    set((state) => ({ isBalanceVisible: !state.isBalanceVisible }));
  },

  resetWalletBalance: () => {
    set({balance: 0});
  },

  getBalance: async () => {
    try {
      const userInfo = await BoTraderApi.getMe();
      set({ balance: userInfo?.balance || 0 });
    } catch (error) {
      console.error(error, "Error getting user info");
    }
  },

}));

export default function useGlobalApi() {
  return useCombinedStore();
}
