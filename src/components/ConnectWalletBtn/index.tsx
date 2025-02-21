import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { BoTraderApi } from "../../lib/api/service/boTraderApi.ts";
import { JWT_LOCAL_STORAGE_KEY } from "../../constant";
import toast from "react-hot-toast";
import { useAccount, useSignMessage } from "wagmi";
import { useUserInfo } from "../../lib/states/user";
import BtnConnect from "../Button/BtnConnect.tsx";
import { Text } from "@chakra-ui/react";
import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";
import useGlobalApi from "../../lib/zustand/useUserStore.tsx";
import { useTradeStore } from "../../lib/zustand/TransactionHistory.tsx";

const ConnectWalletBtn = () => {
  const { signMessageAsync } = useSignMessage();
  const { setUserInfo } = useUserInfo();
  const { address } = useAccount();
  const { openAccountModal } = useAccountModal();
  const formattedAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';
  const { openConnectModal } = useConnectModal();
  const {resetWalletBalance, getBalance, getUserInfo} = useGlobalApi()
  const {fetchTradeHistory} = useTradeStore()
  const navigate = useNavigate();

  useEffect(() => {
    const loginBo = async () => {
      try {
        const message = "Login Bo-trader: " + new Date().getTime(); 
        // console.log("Login message:", message);
        const signature = await signMessageAsync({ message });
        // console.log("Login signature:", signature);
        const loginRes = await BoTraderApi.login(message, signature);
        // console.log("Login response:", loginRes);
        window.localStorage.setItem(JWT_LOCAL_STORAGE_KEY, loginRes.accessToken);
        // console.log(loginRes.accessToken,"token")
        setUserInfo(loginRes.user);
        // console.log("User info set:", loginRes.user);
        toast.success("Login successful");
        await getBalance();
        await fetchTradeHistory();
        navigate('/'); // Navigate to home
      } catch (error) {
        console.error("Error during login:", error);
        toast.error("Error login Bo-trader");
      }
    };

    if (address && !window.localStorage.getItem(JWT_LOCAL_STORAGE_KEY)) {
      loginBo();
    } else if (address && window.localStorage.getItem(JWT_LOCAL_STORAGE_KEY)) {
      getUserInfo().then();
      fetchTradeHistory().then();
    } else if (!address) {
      console.log("No address, clearing user info...");
      window.localStorage.removeItem(JWT_LOCAL_STORAGE_KEY);
      setUserInfo(null);
      resetWalletBalance()
    }
  }, [address]);

  useEffect(() => {
    getUserInfo().then();
    fetchTradeHistory().then();
  }, []);

  return (
    <>
      {address ? (
        <BtnConnect onClick={openAccountModal}>
          {formattedAddress}
        </BtnConnect>
      ) : (
        <BtnConnect onClick={openConnectModal}>
          <Text fontSize='sm'>
            Connect Wallet
          </Text>
        </BtnConnect>
      )}
    </>
  );
};

export default ConnectWalletBtn;