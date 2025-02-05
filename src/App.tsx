import './App.css'
import {ChakraProvider} from "@chakra-ui/react";
import theme from "./theme";
import toast, {Toaster} from "react-hot-toast";
import Routes from "./routes";
import '@rainbow-me/rainbowkit/styles.css';
import {RainbowKitProvider} from '@rainbow-me/rainbowkit';
import {WagmiProvider} from 'wagmi';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import config from "./providers/wagmiConfig.ts";
import i18n from "i18next";
import {useTranslation} from "react-i18next";
import {useEffect} from "react";

const queryClient = new QueryClient();
function App() {
  const {t} = useTranslation();
  const getLanguage = async () => {
    try {
      const language = localStorage.getItem('language');
      if (language) {
        await i18n.changeLanguage(language);
      } else {
        localStorage.setItem('language', 'vi');
      }
    } catch (err: any) {
      toast.error(t(err.message));
    }
  }

  useEffect(() => {
    getLanguage().then();
  }, [])

  return (
    <WagmiProvider config={config as any}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <ChakraProvider theme={theme}>
            <Routes/>
            <Toaster
              position="top-center"
              reverseOrder={false}
            />
          </ChakraProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
