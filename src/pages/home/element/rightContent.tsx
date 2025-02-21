import {useEffect, useMemo, useRef, useState} from "react";
import {motion} from "framer-motion";
import {CiMenuKebab} from "react-icons/ci";
import {MdOutlineFormatListBulleted} from "react-icons/md";
import toast from "react-hot-toast";
import {useAccount} from "wagmi";

import CustomTabs from "../../../components/CustomTabs";
import OpenOrder from "./openOrder";
import OrderMatched from "./orderMatched";
import ValueInput from "../components/valueInput";
import ProfitDisplay from "../components/profitDisplay";
import ButtonsSection from "../components/buttonsSection";
import PsychologicalIndicator from "../components/psychologicalIndicator";
import {BoTraderApi} from "../../../lib/api/service/boTraderApi";
import useGlobalApi from "../../../lib/zustand/useUserStore";
import {playSound} from "../../../utils";

import {Box, Button, Text} from "@chakra-ui/react";
import { useTradeStore } from "../../../lib/zustand/TransactionHistory";

interface Order {
  id: string;
  status: string;
  createdAt?: string;
  betAmount?: number;
  betDirection?: 'UP' | 'DOWN';
  openPrice?: number | string;
  closePrice?: number | string;
  closeTime?: string;
  result?: string;
}

const RightContent: React.FC = () => {
  const [inputValue, setInputValue] = useState('0');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isTabsVisible, setIsTabsVisible] = useState(false);
  const {address} = useAccount();
  const {balance, getBalance} = useGlobalApi();
  const {fetchTradeHistory} =useTradeStore()
  const [orders, setOrders] = useState<Order[]>(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });
  const [loadingState, setLoadingState] = useState({
    BUY: false,
    SELL: false,
  });

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const currentRef = inputRef.current;
      if (currentRef && !currentRef.contains(event.target as Node) && inputValue === '') {
        setInputValue('0');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [inputValue]);

  const tabs = useMemo(() => [
    <Text key="open" fontSize='sm' className='lastResults'>Open</Text>,
    <Text key="closed" fontSize='sm' className='lastResults'>Close</Text>
  ], []);

  const contents = useMemo(() => [
    <OpenOrder key="open" orders={orders.filter(order => order.status === "PENDING")}/>,
    <OrderMatched key="matched" orders={orders.filter(order => order.status !== "PENDING")}/>
  ], [orders]);

  const toggleTabs = () => {
    setIsTabsVisible(!isTabsVisible);
  };

  const handleTabChange = (index: number) => {
    setActiveTabIndex(index);
  };

  const handlePlaceTrade = async (betDirection: 'UP' | 'DOWN') => {
    const betAmount = Number(inputValue);

    const currentBalance =  balance;

    if (!address) {
      toast.error('Wallet not connected');
      return;
    }
    if (betAmount <= 0) {
      toast.error('The number of transactions must be greater than 0.');
      return;
    }
    if (betAmount > currentBalance) {
      toast.error("Insufficient balance.");
      return;
    }
    try {
      setLoadingState((prev) => ({...prev, [betDirection]: true}));
      const res = await BoTraderApi.userPlaceTrade(
        betAmount,
        betDirection,
      );
      playSound('assets/mp3/mouse-click.mp3');
      toast.success('Order placed successfully.');
      await getBalance()
      await fetchTradeHistory();

      const newOrder: Order = {
        ...res.data,
        createdAt: new Date().toISOString(),
      };

      setOrders(prevOrders => {
        const updatedOrders = [...prevOrders, newOrder];
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
        return updatedOrders;
      });

      setTimeout(async () => {
        await fetchTradeHistory();
        await getBalance();
      }, 30000);

    } catch (error: any) {
      console.error('Đã xảy ra lỗi:', error.response ? error.response.data : error.message);
      toast.error(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setLoadingState((prev) => ({...prev, [betDirection]: false}));
    }
  };

  return (
    <Box display={{base: 'block', lg: 'flex'}}>
      <Box minW={'250px'} maxW={{base: '100%', lg: '250px'}} p={'8px 10px'}>
        <ValueInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          inputRef={inputRef}
          currentBalance={ balance}
        />
        <ProfitDisplay inputValue={Number(inputValue)}/>
        <PsychologicalIndicator/>
        <ButtonsSection
          onPlaceTrade={handlePlaceTrade}
          loadingState={loadingState}
          playSound={playSound}
          inputValue={Number(inputValue)}
        />
      </Box>
      <motion.div
        initial={false}
        animate={{x: isTabsVisible ? 0 : 250}}
        transition={{duration: 0.3}}
        className='motion'
      >
        <Button
          onClick={toggleTabs}
          className='motion-btn'
          borderLeftRadius="md"
          borderRightRadius="none"
          _hover='transparent'
          p={0}
        >
          {isTabsVisible ? <MdOutlineFormatListBulleted size={22}/> : <CiMenuKebab size={22}/>}
        </Button>
        <Box p={'8px 10px'} h={'100%'}>
          <CustomTabs
            tabs={tabs}
            contents={contents}
            index={activeTabIndex}
            onChange={handleTabChange}
          />
        </Box>
      </motion.div>
    </Box>
  );
};

export default RightContent;