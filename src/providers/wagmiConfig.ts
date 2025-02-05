import {getDefaultConfig} from "@rainbow-me/rainbowkit";
import {sepolia} from "wagmi/chains";
import {http} from 'wagmi';

const projectId = '1fed74cecc1c7544f6ea1d985f77ca8e';
const config = getDefaultConfig({
  appName: 'BO Trader',
  projectId: projectId,
  chains: [sepolia],
  transports: {
    [sepolia.id]: http('https://eth-sepolia.g.alchemy.com/v2/jG2KYCWqUGgnFEGuKAvsCKSEIn13mKPh'),
  },
  ssr: true
} as any)


export default config