import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { BoTraderApi } from "../../lib/api/service/boTraderApi.ts";
import { JWT_LOCAL_STORAGE_KEY } from "../../constant";
import toast from "react-hot-toast";
import { useAccount, useSignMessage } from "wagmi";
import { useUserInfo } from "../../lib/states/user";
import BtnConnect from "../Button/BtnConnect.tsx";
import { Text } from "@chakra-ui/react";
import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";
import useGlobalApi from "../../lib/zustand/useUserStore.tsx";

const ConnectWalletBtn = () => {
  const { referrerId } = useParams();
  const [storedReferrerId, setStoredReferrerId] = useState<any>(null);
  const { signMessageAsync } = useSignMessage();
  const { setUserInfo } = useUserInfo();
  const { address } = useAccount();
  const { openAccountModal } = useAccountModal();
  const formattedAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';
  const { openConnectModal } = useConnectModal();
  const navigate = useNavigate();
  const { getBalance , resetWalletBalance} = useGlobalApi(); // Get the getBalance function from the Zustand store

  useEffect(() => {
    if (referrerId) {
      localStorage.setItem('referrerId', referrerId);
      setStoredReferrerId(referrerId);
      console.log("Referrer ID stored in localStorage:", referrerId);
    } else {
      const savedReferrerId = localStorage.getItem('referrerId');
      if (savedReferrerId) {
        setStoredReferrerId(savedReferrerId);
      } else {
        console.log("No Referrer ID found in URL or localStorage");
      }
    }
  }, [referrerId]);

  useEffect(() => {
    const loginBo = async () => {
      try {
        const message = "Login Bo-trader: " + new Date().getTime();
        const signature = await signMessageAsync({ message });
        const referrer_id = storedReferrerId ? parseInt(storedReferrerId) : 0;
        console.log("Using Referrer ID for login:", referrer_id);
        const loginRes = await BoTraderApi.login(message, signature, referrer_id);
        console.log("Login response:", loginRes);
        window.localStorage.setItem(JWT_LOCAL_STORAGE_KEY, loginRes.data.jwt);
        setUserInfo(loginRes.user);
        console.log("User info set:", loginRes.user);
        toast.success("Login successful");

        // Fetch balance immediately after login
        await getBalance(); // Call the getBalance function
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
    } else if (!address) {
      console.log("No address, clearing user info...");
      window.localStorage.removeItem(JWT_LOCAL_STORAGE_KEY);
      setUserInfo(null);
      resetWalletBalance()
    }
  }, [address, storedReferrerId]);

  const getUserInfo = async () => {
    try {
      const userInfo = await BoTraderApi.getMe();
      setUserInfo(userInfo);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    getUserInfo().then();
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