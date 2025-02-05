import { useEffect, useState } from "react";
import { Box, Center, Divider, Flex, Image, Text } from "@chakra-ui/react";

// Define the interface for ticker data
interface TickerData {
  s: string; // Symbol
  p: string; // Price Change
  c: string; // Last Price
  b: string; // Bid Price
  a: string; // Ask Price
  o: string; // Open Price
  h: string; // High Price
  l: string; // Low Price
  v: string; // Volume
  q: string; // Quote Volume
}

const Indicators = () => {
  const [tickerData, setTickerData] = useState<TickerData | null>(null);

  useEffect(() => {
    const socket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker');

    socket.onopen = () => {
      console.log('WebSocket connection established for BTCUSDT.');
    };

    socket.onmessage = (event) => {
      const data: TickerData = JSON.parse(event.data);
      console.log('Received BTCUSDT data:', data);
      setTickerData(data);
    };

    socket.onclose = () => {
      console.log('WebSocket closed');
    };

    return () => {
      socket.close();
    };
  }, []);

  if (!tickerData) {
    return <div className="loading">Loading BTC/USDT data...</div>;
  }

  const priceChangeData = [
    { label: 'Price Change', value: tickerData.p },
    { label: 'Last Price', value: tickerData.c },
    { label: 'Bid Price', value: tickerData.b },
    { label: 'Ask Price', value: tickerData.a },
    { label: 'Open Price', value: tickerData.o },
    { label: 'High Price', value: tickerData.h },
    { label: 'Low Price', value: tickerData.l },
    { label: 'Volume', value: tickerData.v },
    { label: 'Quote Volume', value: tickerData.q }
  ];

  return (
    <Box
      border={'1px solid #000'}
      borderRadius={'4px'}
      background={'#02142b'}
      boxShadow={'0px 1px 3px 0px rgba(0, 0, 0, 0.10),0px 1px 2px 0px rgba(0, 0, 0, 0.06)'}
      p={'12px 20px'}
      color={'#333'}
    >
      <Flex>
        <Flex align={"center"}>
          <Image src={'assets/img/coins/btc.png'} w={'24px'} me={'12px'} />
          <Text color={'#fff'} fontSize='2xl' fontWeight={'bold'}>{tickerData.s}</Text>
        </Flex>
        <Center height='2.5rem' m={'0 16px'}>
          <Divider orientation='vertical' w={'2px'} color='rgb(52, 56, 76)' />
        </Center>
        <Flex gap={10}>
          {priceChangeData.map((item, index) => (
            <Box key={index} color={'#9d8d8d'}>
              <Text color={'#d3d3d4'} fontSize='sm'>{item.label}</Text>
              {parseFloat(item.value).toFixed(2)}
            </Box>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Indicators;