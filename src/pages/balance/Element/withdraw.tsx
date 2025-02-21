import TokenTransactionForm from "./tokenTransactionForm.tsx";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import { BoTraderApi } from "../../../lib/api/service/boTraderApi.ts";
import { useQueryClient } from "@tanstack/react-query";
import useGlobalApi from "../../../lib/zustand/useUserStore.tsx";
import { useTradeStore } from "../../../lib/zustand/TransactionHistory.tsx";

const Withdraw = () => {
  const [selectedAsset, setSelectedAsset] = useState<string>('MSG');
  const { address } = useAccount();
  const [amount, setAmount] = useState<string>('');
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { getBalance, balance } = useGlobalApi();
  const {fetchTransactionHistory} = useTradeStore()

  const handleSubmit = async () => {
    if (!address) {
      toast.error('Please connect your wallet');
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    try {
      setIsLoading(true);
      await BoTraderApi.withdraw(parsedAmount);
      await queryClient.refetchQueries(['tokenWalletBalance', selectedAsset] as any);
      await getBalance();
      setTimeout(async () => {
        await getBalance(); 
        await fetchTransactionHistory();
      }, 1000);
      toast.success('Withdraw successful');
      setAmount('');
    } catch (error: any) {
      console.error('Withdraw failed:', error);
      toast.error('Withdraw failed: ' + (error.message || 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  const tokenWalletBalanceData = queryClient.getQueryData(['tokenWalletBalance', selectedAsset, address]);
  const tokenWalletBalance = typeof tokenWalletBalanceData === 'number' ? tokenWalletBalanceData : 0;

  return (
    <TokenTransactionForm
      isLoading={isLoading}
      type="withdraw"
      onSubmit={handleSubmit}
      setAmount={setAmount}
      amount={amount}
      tokenWalletBalance={tokenWalletBalance}
      handleSetMax={() => setAmount(balance.toString())}
      selectedAsset={selectedAsset}
      setSelectedAsset={setSelectedAsset}
    />
  );
};

export default Withdraw;