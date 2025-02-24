import { FC, useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { IoMdNotifications } from "react-icons/io";
import { backgrounds } from "../../theme";
import useUserStore from "../../lib/zustand/useUserStore";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useTradeStore } from "../../lib/zustand/TransactionHistory";

interface Notification {
  betAmount:  number;
  betDirection: string;
  openPrice:  number;
  closePrice:  number;
  closeTime:  string;
  userId: number;
  result: number | string;
  createdAt: string;
  id: number;
  readed: number;
}

const NotificationPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { getUserInfo } = useUserStore();
  const { TradeHistory, fetchTradeHistory } = useTradeStore()
  const { t } = useTranslation();

  const NotificationItem: FC<{ notification: Notification }> = ({ notification }) => (
    <Link to={'#'}>
      <Box
        ms={'40px'}
        mb={2}
        cursor="pointer"
      >
        <Text fontSize={'14px'} color={notification.readed === 0 ? '#fff' : '#ffffff70'}>
          {t('You have placed an order')} {notification.betDirection === 'UP' ? 'Buy' : 'Sell'} {t('with quantity')} {(Number(notification.betAmount)).toFixed(2)} MSG {t('with trading pair')} BTC/MSG
          <br />
          {t('Result')}: {notification.result === 1 ? "Win" : notification.result === 2 ? "Lose" : "Pending"}
        </Text>
        <Text
          mt={2}
          background={backgrounds.darkBlu}
          p={'3px 8px'}
          fontSize={'12px'}
          borderRadius={'3px'}
          color={'#8b6b4f'}
        >
          {new Date(notification.createdAt).toLocaleString()}
        </Text>
      </Box>
    </Link>
  );

  useEffect(() => {
    getUserInfo().then();
  }, [getUserInfo]);

  useEffect(() => {
    const fetchNotificationHistory = async () => {
      try {
        await fetchTradeHistory();
        const latestNotifications = TradeHistory as Notification[];
        console.log(latestNotifications, 'latestNotifications');
        latestNotifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setNotifications(latestNotifications.slice(0, 10));
      } catch (error) {
        console.error("Failed to fetch notification history:", error);
      }
    };

    fetchNotificationHistory().then();
  }, []);

  return (
    <Box>
      <Flex align="center" mb={2}>
        <Box
          className='flex-box-center'
          borderRadius="32px"
          background={backgrounds.iconGray}
          minW="32px"
          h="32px"
        >
          <IoMdNotifications size={19} />
        </Box>
        <Box ms={2} pe={2}>
          <Text fontWeight="bold" color="#8b8d96cc">
            {t('Order result notification')}
          </Text>
        </Box>
        <Box className="notification-item-status"/>
      </Flex>
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <NotificationItem key={index} notification={notification} />
        ))
      ) : (
        <Text textAlign="center">{t('No notifications')} !!!</Text>
      )}
    </Box>
  );
};

export default NotificationPage;