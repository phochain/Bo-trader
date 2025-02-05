import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import TradeStats from "./element/tradeStats.tsx";
import FinancialInformation from "./element/financial-Information.tsx";
import useGlobalApi from "../../lib/zustand/useUserStore.tsx";
import { useTranslation } from "react-i18next";
import TransactionHistory from "../../components/TransactionHistory";
import { useMemo } from "react";

const TradeHistory = () => {
  const { t } = useTranslation();
  const { isBalanceVisible, toggleBalanceVisibility } = useGlobalApi();

  // Sử dụng useMemo để tránh tính toán lại chuỗi tĩnh
  const title = useMemo(() => t('Số liệu') + " B.O", [t]);

  return (
    <Box borderTop={'2px solid #000'} p={'16px'}>
      <Flex align={'center'} mb={2}>
        <Text fontSize='3xl' fontWeight={'bold'} mr={2}>
          {title}
        </Text>
        <Box onClick={toggleBalanceVisibility} cursor={"pointer"}>
          {isBalanceVisible ? <FaEye size={22} /> : <FaEyeSlash size={22} />}
        </Box>
      </Flex>
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', xl: 'repeat(2, 1fr)' }} gap={6}>
        <GridItem>
          <TradeStats />
        </GridItem>
        <GridItem>
          <FinancialInformation />
        </GridItem>
      </Grid>
      <TransactionHistory />
    </Box>
  );
};

export default TradeHistory;