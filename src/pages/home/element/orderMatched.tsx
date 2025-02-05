import NoOrder from "../../../components/noOrder";
import TransactionBox from "../../../components/TransactionBox";
import useGlobalApi from "../../../lib/zustand/useUserStore.tsx";
import {useEffect} from "react";
import {Box} from "@chakra-ui/react";

// Định nghĩa kiểu dữ liệu cho orders và notifications


interface Notification {
  id: string;
  status: string;
  message: string;
  // các thuộc tính khác của notification
}

interface OrderMatchedProps {
  orders: any;
}

const OrderMatched = ({orders}: OrderMatchedProps) => {
  const {notifications, fetchNotificationHistory} = useGlobalApi() as {
    notifications: Notification[];
    fetchNotificationHistory: () => Promise<void>;
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchNotificationHistory();
    };
    fetchData().then();
  }, [fetchNotificationHistory]);

  const allOrders = [...orders, ...notifications];

  return (
    <Box maxH={'100%'} overflow={"auto"}>
      {allOrders.length === 0 ? <NoOrder/> : <TransactionBox transactions={allOrders}/>}
    </Box>
  );
};

export default OrderMatched;
