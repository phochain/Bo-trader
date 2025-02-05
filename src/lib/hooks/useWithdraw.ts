import {ethers} from "ethers";
import {readContract} from "@wagmi/core";
import {useAccount, useChainId, useConfig, useSignTypedData} from "wagmi";
import {useCallback} from "react";
import {ENDPOINT_CONTRACT_ABI, ENDPOINT_CONTRACT_ADDRESS} from "../../constant";



export type WithdrawCollateral = {
  sender: string;
  productId: number;
  amount: bigint;
  nonce: bigint;
};

const useWithDraw = () => {
  const {
    signTypedDataAsync
  } = useSignTypedData()
  const {address} = useAccount()
  const chainId = useChainId()
  const config = useConfig()

  const getWithdrawSignature = async (
    data: WithdrawCollateral,
    endpointAddress: any,
    chainId: number,
  ) => {
    const types = {
      WithdrawCollateral: [
        {name: 'sender', type: 'bytes32'},
        {name: 'productId', type: 'uint32'},
        {name: 'amount', type: 'uint128'},
        {name: 'nonce', type: 'uint64'},
      ],
    };
    const domain = {
      name: 'Endpoint',
      version: '0.0.1',
      chainId,
      verifyingContract: endpointAddress,
    };

    return await signTypedDataAsync({
      domain,
      types,
      primaryType: 'WithdrawCollateral',
      message: data
    });
  };

  const getWithdrawData = useCallback(async (amount: number, productId: number) => {
    const nonce: bigint = await readContract(config, {
      abi: ENDPOINT_CONTRACT_ABI,
      functionName: 'nonces',
      args: [address],
      address: ENDPOINT_CONTRACT_ADDRESS,
    }) as bigint
    const subAccountByte = ethers.encodeBytes32String("").slice(0, 26)
    const withdrawData: WithdrawCollateral = {
      amount: ethers.parseEther(amount.toString()),
      nonce,
      productId,
      sender: (address) + subAccountByte.slice(2), // address + subaccount 12 bytes without 0x
    };
    const sig = await getWithdrawSignature(
      withdrawData,
      ENDPOINT_CONTRACT_ADDRESS,
      chainId,
    );
    return {
      signature: sig,
      data: {
        amount: amount,
        nonce: Number(nonce),
        productId: withdrawData.productId,
        sender: withdrawData.sender
      }
    }
  }, [address, config, chainId, getWithdrawSignature])

  return {
    getWithdrawData
  }

}
export default useWithDraw