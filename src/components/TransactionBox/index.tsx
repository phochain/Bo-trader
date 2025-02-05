import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import useGlobalApi from "../../lib/zustand/useUserStore.tsx";

const TransactionBox = ({ children }: any) => {
  const { notifications, fetchNotificationHistory, is_demo } = useGlobalApi();

  useEffect(() => {
    const fetchData = async () => {
      await fetchNotificationHistory();
    };

    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 3000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [fetchNotificationHistory, is_demo]);

  // Lọc các thông báo chỉ trong ngày hiện tại
  const todayNotifications = notifications.filter((notification) => {
    const notificationDate = new Date(notification.createdAt);
    const today = new Date();

    return (
      notificationDate.getDate() === today.getDate() &&
      notificationDate.getMonth() === today.getMonth() &&
      notificationDate.getFullYear() === today.getFullYear()
    );
  });

  // Lấy ngày hiện tại
  const today = new Date();
  const todayString = today.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <>
      <Text fontSize='md' m={'16px 0'}>
        {todayString}
      </Text>
      {todayNotifications.map((notification) => (
        <Box background={'#1d233b'} borderRadius={'4px'} p={'.5rem'} mb={'.5rem'} key={notification.id}>
          {children}
          <Box className='flex-box-between' mb={'8px'}>
            <Flex align={"center"}>
              <Text fontSize='sm' fontWeight={'700'}>BTC/USD</Text>
              {is_demo && <Box className='accType'>DEMO</Box>}
            </Flex>
            <Image src='assets/img/coins/btc.png' w={'18px'} alt="Bitcoin" />
          </Box>
          <Box className='flex-box-between' mb={'8px'}>
            <Flex align={"center"}>
              <Image me={'8px'} src={notification.direction === 'SELL' ? 'assets/img/sell.png' : 'assets/img/buy.png'}
                     w={'20px'} h={'20px'} alt={notification.direction} />
              <Text fontSize='sm' fontWeight={'700'}>{notification.direction}</Text>
            </Flex>
            <Text fontSize='sm' fontWeight={'700'}>{`$${parseFloat(notification.amount).toFixed(2)}`}</Text>
          </Box>
          <Box className='flex-box-between'>
            <Text fontSize='xs' color={'#8b8d96'}>
              {new Date(notification.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
            <Text fontSize='sm' color={'#8b8d96'}>
              {notification.result === 'WIN'
                ? <Box color={'#03a781'}>+${(parseFloat(notification.amount) * 1.95).toFixed(2)}</Box>
                : <Box color={'#f05359'}>$0</Box>}
            </Text>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default TransactionBox;