import {Box, Grid, GridItem, Progress, Text} from "@chakra-ui/react";
import Profits from "../../../components/Card/Profits.tsx";
import {BsBarChartLineFill} from "react-icons/bs";
import {GiFireFlower} from "react-icons/gi";
import {useTradeHistory} from "../components/useTradeHistory.tsx";
import {useAccount} from "wagmi";
import useGlobalApi from "../../../lib/zustand/useUserStore.tsx";
import {useTranslation} from "react-i18next";

const FinancialInformation = () => {
  const {t} = useTranslation()
  const {address} = useAccount();
  const {tradeStats} = useTradeHistory();
  const { isBalanceVisible } = useGlobalApi();

  const profitData = [
    {
      icon: <BsBarChartLineFill size={35}/>,
      title: t('Net profit'),
      amount: isBalanceVisible
        ? tradeStats.netProfit > 0
          ? `+ ${tradeStats.netProfit} $`
          : "0 $"
        : "******", // Hide amount if not visible
      bg: '-webkit-gradient(linear,left top,left bottom,from(#fef78a),color-stop(50%,#dbb311),to(#f3b50e))',
    },
    {
      icon: <GiFireFlower size={35}/>,
      title: t('Total revenue'),
      amount: isBalanceVisible
        ? tradeStats.totalProfit >= 0
          ? `+ ${tradeStats.totalProfit} $`
          : `- ${Math.abs(tradeStats.totalProfit)} $`
        : "******", // Hide amount if not visible
      bg: '#01b58c',
    },
  ];

  return (
    <Box>
      <Grid templateColumns={{base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)'}} gap={6}>
        {profitData.map(({icon, title, amount, bg}, index) => (
          <GridItem key={index}>
            <Profits background={bg}>
              {icon}
              <Box ml={3}>
                <Text fontSize='xl' color='hsla(0,0%,100%,.67)'>
                  {title}
                </Text>
                <Text fontSize='3xl'>{amount}</Text>
              </Box>
            </Profits>
          </GridItem>
        ))}
      </Grid>
      <Grid mt={6} templateColumns='repeat(4, 1fr)' gap={6}>
        <GridItem colSpan={4}>
          <Text fontSize='xl' mb={3} textAlign="center">{t('Transaction summary')}</Text>
          <Progress
            value={Number(tradeStats.buyPercentage) || 0}
            size='sm'
            borderRadius='4px'
            colorScheme='red'
            background={address ? '#03a781' : '#2f3342'}
          />
        </GridItem>
        {[`${tradeStats.buyPercentage || 0} % ${t('Sell')}`, `${tradeStats.sellPercentage || 0} % ${t('Buy')}`].map((text, index) => (
          <GridItem colSpan={2} key={index}>
            <Text fontSize='md' color={index === 0 ? 'rgb(240, 83, 89)' : 'rgb(3, 167, 129)'}
                  textAlign={index === 1 ? 'end' : 'start'}>
              {text}
            </Text>
          </GridItem>
        ))}
      </Grid>
    </Box>
  )
}

export default FinancialInformation