import axiosClient from "../config/axiosClient.ts";

export const BoTraderApi = {
  login: async (message: string, signature: string, referrer_id: number): Promise<any> => {
    return await axiosClient.post('auth/sign', {
      message,
      signature,
      referrer_id
    });
  },

  getMe: async (): Promise<any> => {
    return await axiosClient.get('/auth/me');
  },

  getListToken: async (): Promise<any> => {
    return await axiosClient.get('/tokens');
  },

  getBalance: async (): Promise<any> => {
    return await axiosClient.get('/wallet/balance');
  },

  getHistory: async (): Promise<any> => {
    return await axiosClient.get('wallet/history')
  },

  getCommission: async (page: string, limit: string,): Promise<any> => {
    return await axiosClient.get(`/wallet/get-commission?page=${page}&limit=${limit}`)
  },

  deposit: async (txHash: string): Promise<any> => {
    const res = await axiosClient.post('/wallet/deposit', {
      txHash
    });
    return res.data;
  },

  withdraw: async (data: any): Promise<any> => {
    return await axiosClient.post('wallet/withdraw', {
      ...data
    });
  },

  historyTrade: async (page: string, limit: string, is_demo: boolean): Promise<any> => {
    return await axiosClient.get(`/trade/get-trade-by-user-2?page=${page}&limit=${limit}&is_demo=${is_demo}`);
  },

  userPlaceTrade: async (
    tokenId: number,
    quoteTokenId: number,
    baseTokenId: number,
    amount: number,
    direction: string,
    expiryTime: number,
    is_demo: boolean
  ): Promise<any> => {
    return await axiosClient.post('trade/place-trade', {
      tokenId,
      quoteTokenId,
      baseTokenId,
      amount,
      direction,
      expiryTime,
      is_demo
    });
  },

  resetBalanceTest: async (tokenId: number): Promise<any> => {
    return await axiosClient.post('trade/reset-balance-test', {
      tokenId
    });
  },

  setReaded: async (tradeId: number, readed: number): Promise<any> => {
    return await axiosClient.post('trade/set-readed', {
      tradeId,
      readed
    })
  }
}