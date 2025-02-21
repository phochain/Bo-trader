import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from 'wagmi';

const phoTestnet = {
  id: 3106,
  name: "PHO TESTNET",
  network: "pho-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "PHO",
    symbol: "PHO",
  },
  rpcUrls: {
    default: {
      http: ["https://testnet.phochain.org"],
    },
  },
  blockExplorers: {
    default: {
      name: "PHO Explorer",
      url: "",
    },
  },
};

const projectId = '1fed74cecc1c7544f6ea1d985f77ca8e';
const config = getDefaultConfig({
  appName: 'BO Trader',
  projectId: projectId,
  chains: [phoTestnet],
  transports: {
    [phoTestnet.id]: http('https://testnet.phochain.org'),
  },
  ssr: true
} as any);

export default config;
