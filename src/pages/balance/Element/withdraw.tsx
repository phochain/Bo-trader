import TokenTransactionForm from "./tokenTransactionForm.tsx";
import { useState } from "react";
import { useToken } from "../../../lib/token";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import { LIST_TOKEN_CONTRACT_DATA } from "../../../constant";
import { BoTraderApi } from "../../../lib/api/service/boTraderApi.ts";
import { useQueryClient } from "@tanstack/react-query";
import useWithdraw from "../../../lib/hooks/useWithdraw.ts";
import useGlobalApi from "../../../lib/zustand/useUserStore.tsx";

const Withdraw = () => {
  const [selectedAsset, setSelectedAsset] = useState<string>('USDT');
  const { refetchListToken } = useToken();
  const { address } = useAccount();
  const [amount, setAmount] = useState<string>('');
  const { getWithdrawData } = useWithdraw();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { getBalance } = useGlobalApi();

  const handleSubmit = async () => {
    if (!address) {
      toast.error('Please connect your wallet');
      return;
    }
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    try {
      setIsLoading(true);
      const productId = LIST_TOKEN_CONTRACT_DATA.find(item => item.symbol === selectedAsset)?.productId;
      const withdrawData = await getWithdrawData(+amount, productId as number);

      await BoTraderApi.withdraw(withdrawData);
      await queryClient.refetchQueries(['tokenWalletBalance', selectedAsset] as any);
      await refetchListToken();
      await getBalance(); // Cập nhật số dư global ngay lập tức

      // Thêm một delay ngắn để đảm bảo backend đã cập nhật số dư
      setTimeout(async () => {
        await getBalance(); // Cập nhật lại số dư sau một khoảng thời gian ngắn
      }, 1000); // Đợi 1 giây

      toast.success('Withdraw successful');
      setAmount(''); // Reset amount after successful withdrawal
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
      handleSetMax={() => setAmount(tokenWalletBalance.toString())}
      selectedAsset={selectedAsset}
      setSelectedAsset={setSelectedAsset}
    />
  );
};

export default Withdraw;