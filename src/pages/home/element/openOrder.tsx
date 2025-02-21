import NoOrder from "../../../components/noOrder";
import {Box, Flex, Image, Text} from "@chakra-ui/react";
import useGlobalApi from "../../../lib/zustand/useUserStore.tsx";
import {useEffect, useState} from "react";

// Định nghĩa kiểu dữ liệu cho orders
interface Order {
  id: string;
  status: string;
  direction: string;
  amount: string;
  createdAt: string;
  entryPrice: string;
}

interface OpenOrderProps {
  orders: any;
}

const OpenOrder = ({orders: initialOrders}: OpenOrderProps) => {

  const [orders, setOrders] = useState<Order[]>(initialOrders);

  return (
    <Box>
      {orders.length === 0 ? (
        <NoOrder/>
      ) : (
        <Box>
          {orders.map((order) => (
            <Box background={'#1d233b'} borderRadius={'4px'} p={'.5rem'} mb={'.5rem'} key={order.id}>
              <Box className='flex-box-between' mb={'8px'}>
                <Flex align={"center"}>
                  <Text fontSize='sm' fontWeight={'700'}>BTC/USD</Text>
                </Flex>
                <Image src='assets/img/coins/btc.png' w={'18px'} alt="Bitcoin"/>
              </Box>
              <Box className='flex-box-between' mb={'8px'}>
                <Flex align={"center"}>
                  <Image me={'8px'} src={order.direction === 'SELL' ? 'assets/img/sell.png' : 'assets/img/buy.png'}
                         w={'20px'} h={'20px'} alt={order.direction}/>
                  <Text fontSize='sm' fontWeight={'700'}>{order.direction}</Text>
                </Flex>
                <Text fontSize='sm' fontWeight={'700'}>{`$${parseFloat(order.amount).toFixed(2)}`}</Text>
              </Box>
              <Box className='flex-box-between'>
                <Text fontSize='xs' color={'#8b8d96'}>
                  {new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                </Text>
                <Text fontSize='sm' color={'#8b8d96'}>
                  {order.status}
                </Text>
              </Box>
              <Box className='flex-box-between'>
                <Box>Entry Price:</Box>
                <Box>${order?.entryPrice}</Box>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default OpenOrder;
