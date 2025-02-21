import axiosClient from "../config/axiosClient.ts";

export const BoTraderApi = {
  login: async (message: string, signature: string): Promise<any> => {
    return await axiosClient.post('users/login', {
      message,
      signature
    });
  },

  getMe: async (): Promise<any> => {
    return await axiosClient.get('users/me');
  },

  deposit: async (txHash: string): Promise<any> => {
    const res = await axiosClient.post('wallet/deposit', {
      txHash
    });
    return res.data;
  },

  withdraw: async (amount: number): Promise<any> => {
    return await axiosClient.post('wallet/withdraw', {
      amount
    });
  },

  getHistory: async (page: string, limit: string): Promise<any> => {
    return await axiosClient.get(`wallet/transactions?page=${page}&limit=${limit}`)
  },

  historyTrade: async (page: string, limit: string): Promise<any> => {
    return await axiosClient.get(`orders/?page=${page}&limit=${limit}`)
  },


  userPlaceTrade: async (
    betAmount: number,
    betDirection: string
  ): Promise<any> => {
    return await axiosClient.post('orders/place', {
      betAmount,
      betDirection,
    });
  },

  setReaded: async (tradeId: number, readed: number): Promise<any> => {
    return await axiosClient.post('trade/set-readed', {
      tradeId,
      readed
    })
  }
}