import TokenTransactionForm from "./tokenTransactionForm.tsx";
import { useAccount, useConfig } from "wagmi";
import toast from "react-hot-toast";
import { useState } from "react";
import { ethers } from "ethers";
import { LIST_TOKEN_CONTRACT_DATA, TOKEN_CONTRACT_ABI } from "../../../constant";
import { useQuery } from "@tanstack/react-query";
import { readContract, waitForTransactionReceipt, writeContract } from "@wagmi/core";
import { BoTraderApi } from "../../../lib/api/service/boTraderApi.ts";
import useGlobalApi from "../../../lib/zustand/useUserStore.tsx";
import { useTradeStore } from "../../../lib/zustand/TransactionHistory.tsx";

const Deposit = () => {
  const [amount, setAmount] = useState<any>('');
  const [selectedAsset, setSelectedAsset] = useState<string>('MSG');
  const config = useConfig();
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { getBalance } = useGlobalApi();
  const {fetchTransactionHistory} = useTradeStore();

  const {
    data: tokenWalletBalance = 0,
    refetch: refetchTokenWalletBalance
  } = useQuery({
    queryKey: ['tokenWalletBalance', selectedAsset, address],
    queryFn: async ({ queryKey }) => {
      const [_, token, userAddress] = queryKey;

      if (!userAddress) return 0;

      const tokenContractAddress = LIST_TOKEN_CONTRACT_DATA.find(item => item.symbol === token)?.address;
      if (!tokenContractAddress) return 0;

      const balance = await readContract(config, {
        abi: TOKEN_CONTRACT_ABI,
        address: tokenContractAddress as `0x${string}`,
        functionName: 'balanceOf',
        args: [userAddress],
      });

      return Number(ethers.formatEther(balance as string));
    },
    enabled: !!address
  });

  const handleSubmit = async () => {
    if (!address) {
      toast.error('Please connect your wallet');
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    if (+amount > tokenWalletBalance) {
      toast.error('Insufficient balance');
      return;
    }

    const tokenContractAddress = LIST_TOKEN_CONTRACT_DATA.find(item => item.symbol === selectedAsset)?.address;
    const productId = LIST_TOKEN_CONTRACT_DATA.find(item => item.symbol === selectedAsset)?.productId;
    // console.log("Selected Asset:", selectedAsset);
    // console.log("Token Contract Address:", tokenContractAddress);
    // console.log("Product ID:", productId);

    if (!tokenContractAddress || productId == null) {
      toast.error('Token not supported or invalid product ID');
      return;
    }

    try {
      setIsLoading(true);
      const amountInWei = ethers.parseEther(amount).toString();
      const depositContractAddress = import.meta.env.VITE_ENDPOINT_CONTRACT_ADDRESS;

      const txHash = await writeContract(config, {
        abi: TOKEN_CONTRACT_ABI,
        address: tokenContractAddress as `0x${string}`,
        functionName: 'transfer',
        args: [depositContractAddress, amountInWei],
      });

      // console.log("Hash:", txHash);
      await waitForTransactionReceipt(config, { hash: txHash });
      await BoTraderApi.deposit(txHash);

      setAmount('');
      await refetchTokenWalletBalance();
      await getBalance(); 
      toast.success('Deposit successful');

      setTimeout(async () => {
        await getBalance(); 
        await fetchTransactionHistory();
      }, 1000);
    } catch (error) {
      toast.error('Deposit failed: ' + (error as unknown as Error).message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetMax = () => {
    setAmount(tokenWalletBalance.toString());
  };

  return (
    <TokenTransactionForm
      isLoading={isLoading}
      type="deposit"
      onSubmit={handleSubmit}
      setAmount={setAmount}
      amount={amount}
      tokenWalletBalance={tokenWalletBalance}
      selectedAsset={selectedAsset}
      setSelectedAsset={setSelectedAsset}
      handleSetMax={handleSetMax}
    />
  );
};

export default Deposit;
