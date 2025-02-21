import { FC, useCallback, useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { IoMdNotifications } from "react-icons/io";
import mqtt from 'mqtt';
import { BoTraderApi } from "../../lib/api/service/boTraderApi";
import { backgrounds } from "../../theme";
import useUserStore from "../../lib/zustand/useUserStore";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface Notification {
  direction: string;
  amount: number;
  tokenId: string;
  baseTokenId: string;
  quoteTokenId: string;
  result: string;
  createdAt: string;
  id: number; // Sử dụng id thay vì tradeId
  readed?: number;
}

const NotificationPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { userInfo, getUserInfo } = useUserStore();
  const { t } = useTranslation();

  const markAsRead = async (id: number) => {
    try {
      await BoTraderApi.setReaded(id, 1); // Gọi API với id
      setNotifications(prevNotifications =>
        prevNotifications.map(notification =>
          notification.id === id ? { ...notification, readed: 1 } : notification
        )
      );
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  const NotificationItem: FC<{ notification: Notification }> = ({ notification }) => (
    <Link to={'#'} onClick={() => markAsRead(notification.id)}>
      <Box
        ms={'40px'}
        mb={2}
        cursor="pointer"
      >
        <Text fontSize={'14px'} color={notification.readed === 0 ? '#fff' : '#ffffff70'}>
          {t('Bạn đã đặt lệnh')} {notification.direction} {t('với số lượng')} ${(Number(notification.amount)).toFixed(2)} USD {t('với cặp giao dịch')} BTC/USD
          <br />
          {t('Kết quả')}: {notification.result}
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

  const MQTT_URL = import.meta.env.VITE_APP_MQTT_URL;
  const USER_ID = userInfo?.data?.id;

  const handleNewNotification = useCallback((newNotification: Notification) => {
    setNotifications(prevNotifications => {
      const updatedNotifications = [newNotification, ...prevNotifications];
      return updatedNotifications
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 10);
    });
  }, []);

  useEffect(() => {
    const client = mqtt.connect(MQTT_URL);
    const topic = `trade-success/${USER_ID}`;

    client.on("connect", () => {
      console.log("Connected to EMQ server");
      client.subscribe(topic);
      console.log(`Subscribed to topic ${topic}`);
    });

    client.on("message", (receivedTopic, message) => {
      const data = JSON.parse(message.toString()) as Notification;
      console.log(`Received message on topic ${receivedTopic}:`, data);
      handleNewNotification(data);
    });

    return () => {
      client.end();
    };
  }, [MQTT_URL, USER_ID, handleNewNotification]);

  useEffect(() => {
    const fetchNotificationHistory = async () => {
      try {
        const res = await BoTraderApi.historyTrade('0', '100000');
        const latestNotifications = res.data.contents as Notification[];
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