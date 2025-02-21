import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import CardSecondary from "../../../components/Card/CardSecondary.tsx";
import { useTradeHistory } from "../components/useTradeHistory.tsx";
import PieCharts from "../../../components/PieCharts";
import useGlobalApi from "../../../lib/zustand/useUserStore.tsx";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

const TradeStats = () => {
  const { t } = useTranslation();
  const { tradeStats } = useTradeHistory();
  const { isBalanceVisible } = useGlobalApi();

  // Sử dụng useMemo để tránh tính toán lại các giá trị không thay đổi
  const stats = useMemo(() => [
    { label: t('Number of transactions'), value: tradeStats.totalTrades.toString(), isBold: true },
    { label: t('Win rate'), value: `${tradeStats.winRate} %`, isBold: true, border: true },
    { label: t('Total transactions'), value: isBalanceVisible ? `${tradeStats.totalVolume.toString()} MSG` : "******", isBold: true }
  ], [t, tradeStats, isBalanceVisible]);

  const rounds = useMemo(() => [
    { label: t('Total wins'), className: 'round--win', value: tradeStats.totalWins },
    { label: t('Total losses'), className: 'round--lose', value: tradeStats.totalLosses }
  ], [t, tradeStats]);

  // Hàm để render các phần tử lặp lại (vòng thắng và thua)
  const renderRounds = () => (
    rounds.map(({ label, className, value }, index) => (
      <Flex justifyContent={{ base: 'center', md: 'start' }} key={index} align={'center'} mb={3}>
        <Box className={`round ${className}`}></Box>
        <Text fontSize='md'>{label}: {value}</Text>
      </Flex>
    ))
  );

  // Hàm để render các thông tin thống kê
  const renderStats = (stat:any) => (
    <>
      <Text fontSize='sm' textAlign={{ base: "center", md: 'start' }}>{stat.label}</Text>
      <Text fontSize='xl' textAlign={{ base: "center", md: 'start' }} fontWeight={stat.isBold ? 'bold' : 'normal'}>
        {stat.value}
      </Text>
    </>
  );

  return (
    <CardSecondary>
      <Box p={'16px 48px'}>
        <Text fontSize='lg' mb={'14px'} fontWeight={'bold'}>Trade Stats</Text>
        <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={6} alignItems={"center"}>
          <GridItem display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <PieCharts />
          </GridItem>
          <GridItem>
            {renderRounds()}
          </GridItem>
          <GridItem>
            <Box borderRight={{ base: "none", md: '1px solid hsla(0,0%,100%,.22)' }}>
              {renderStats(stats[1])}
            </Box>
          </GridItem>
          <GridItem>
            <Box>
              {renderStats(stats[2])}
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </CardSecondary>
  );
};

export default TradeStats;
