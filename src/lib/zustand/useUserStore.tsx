import {create} from "zustand";
import {BoTraderApi} from "../api/service/boTraderApi.ts";
import toast from "react-hot-toast";

// Define the state and actions interface
interface CombinedState {
  userInfo: any;
  getUserInfo: () => Promise<void>;

  notifications: any[];
  fetchNotificationHistory: () => Promise<void>;
  clearNotifications: () => void;

  balance: number;
  balanceTest: number;
  isBalanceVisible: boolean;
  toggleBalanceVisibility: () => void;
  getBalance: () => any;
  resetBalanceTest: () => Promise<void>;
  resetWalletBalance: () => void;

  is_demo: any;
  setIsDemo: (value: boolean) => void;
}

interface TokenData {
  token: {
    symbol: string;
  };
  balance: number;
  balance_test: number;
}

const useCombinedStore = create<CombinedState>((set, get) => ({
  // User related state and actions
  userInfo: null,
  getUserInfo: async () => {
    try {
      const userInfo = await BoTraderApi.getMe();
      set({userInfo});
    } catch (error) {
      console.error(error, "Error getting user info");
    }
  },

  // Notification related state and actions
  notifications: [],
  fetchNotificationHistory: async () => {
    try {
      const is_demo = get().is_demo; // Get is_demo value from state
      const res = await BoTraderApi.historyTrade('0', '100000', is_demo);
      const latestNotifications = res.data.contents;
      latestNotifications.sort((a: { createdAt: string }, b: { createdAt: string }) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      set({notifications: latestNotifications.slice(0, 100)}); // Limit to 100
    } catch (error) {
      console.error("Failed to fetch notification history:", error);
    }
  },


  clearNotifications: () => set({notifications: []}), // Reset cả notifications

  // Balance related state and actions
  balance: 0,
  balanceTest: 0,
  isBalanceVisible: localStorage.getItem('isBalanceVisible') === 'true', // Load from localStorage
  toggleBalanceVisibility: () => {
    const currentVisibility = get().isBalanceVisible;
    localStorage.setItem('isBalanceVisible', (!currentVisibility).toString()); // Update localStorage
    set({isBalanceVisible: !currentVisibility}); // Toggle state
  },

  getBalance: async () => {
    try {
      const res = await BoTraderApi.getBalance();
      const usdtData = res?.data?.find((token: TokenData) => token.token.symbol === 'USDT');

      if (!usdtData) {
        console.error('USDT data not found in the response');
        return null;
      }

      const balanceData = usdtData.balance || 0;
      const balanceTestData = usdtData.balance_test || 0;

      set({ balance: balanceData, balanceTest: balanceTestData });

      return { balance: balanceData, balanceTest: balanceTestData };
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching balance:', error.message);
      } else {
        console.error("An unknown error occurred while fetching balance", error);
      }
      return null;
    }
  },
  // Reset Wallet Balance
  resetWalletBalance: () => {
    set({balance: 0, balanceTest: 0}); // Reset both balance and balanceTest
  },

  // Reset Demo Balance
  resetBalanceTest: async () => {
    try {
      const tokenId = 2;
      const res = await BoTraderApi.resetBalanceTest(tokenId);
      console.log(res, "Balance reset successful");
      await get().getBalance();
      toast.success('Thiết lập lại số dư demo thành công');
    } catch (error) {
      console.error("Failed to reset demo balance:", error);
      toast.error('Không thể thiết lập lại số dư demo:');
    }
  },

  is_demo: localStorage.getItem('is_demo') === 'true',
  setIsDemo: (value: boolean) => {
    localStorage.setItem('is_demo', value.toString());
    set({is_demo: value});
  },
}));

export default function useGlobalApi() {
  return useCombinedStore();
}
