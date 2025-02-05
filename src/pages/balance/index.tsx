import {Box, Flex, Grid, GridItem, SimpleGrid, Text} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { colors } from "../../theme";
import CardSecondary from "../../components/Card/CardSecondary.tsx";
import ActionButtons from "../../components/Button/ActionButtons.tsx";
import TokenDisplay from "../../components/TokenDisplay";
import BtnYellow from "../../components/Button/BtnYellow.tsx";
import { IoReload } from "react-icons/io5";
import CustomTabs from "../../components/CustomTabs";
import useGlobalApi from "../../lib/zustand/useUserStore.tsx";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ConversionTable from "../../components/Table";
import { BoTraderApi } from "../../lib/api/service/boTraderApi.ts";
import { Pagination } from "antd";
import {formatHash} from "../../utils"; // Import Pagination from Ant Design

// Define types for trade history and commission
interface TradeHistoryItem {
  token: {
    symbol: string;
  };
  amount: number;
  type: string;
  currentBalance: number;
  txHash: string;
  createdAt: string; // Or Date if preferred
}

interface TradeCommission {
  userId: number;
  token: string;
  commissionAmount: string;
  commission_from: string;
  createdAt: string;
}

const Balance = () => {
  const { t } = useTranslation();
  const {
    balance,
    balanceTest,
    resetBalanceTest,
    isBalanceVisible,
    toggleBalanceVisibility,
  } = useGlobalApi();

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tradeHistory, setTradeHistory] = useState<TradeHistoryItem[]>([]);
  const [tradeCommission, setTradeCommission] = useState<TradeCommission[]>([]);
  const [currentPageHistory, setCurrentPageHistory] = useState(1);
  const [currentPageCommission, setCurrentPageCommission] = useState(1);
  const pageSize = 5; // Items per page

  const tabs = [
    t('Ví chính'),
    t('Ví giao dịch'),
  ];

  const conversionHeaders = [
    { label: t('Token'), key: 'token' },
    { label: t('Amount'), key: 'amount' },
    { label: t('Type'), key: 'type' },
    { label: t('Current Balance'), key: 'currentBalance' },
    { label: t('Transaction Hash'), key: 'txHash' },
    { label: t('Created At'), key: 'createdAt' },
  ];

  const commissionHeaders = [
    { label: t('Token'), key: 'token' },
    { label: t('Commission Amount'), key: 'commissionAmount' },
    { label: t('Commission From'), key: 'commission_from' },
    { label: t('Created At'), key: 'createdAt' },
  ];

  const handleChangeHistory = async () => {
    try {
      const res = await BoTraderApi.getHistory();
      if (res.status === 200) {
        setTradeHistory(res.data.contents); // Save the contents to state
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangeCommission = async () => {
    try {
      const res = await BoTraderApi.getCommission('0', '1000');
      if (res.status === 200) {
        setTradeCommission(res.data.contents);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error fetching commission:", err.message);
      } else if (typeof err === 'object' && err !== null && 'response' in err) {
        console.error("Error fetching commission:", (err as any).response?.data || err);
      } else {
        console.error("Error fetching commission:", err);
      }
    }
  };

  useEffect(() => {
    handleChangeHistory();
    handleChangeCommission();
  }, []);

  // Map trade history to dataTable format
  const dataTable = tradeHistory.map(item => ({
    token: item.token.symbol,
    amount: item.amount,
    type: item.type,
    currentBalance: item.currentBalance.toFixed(2),
    txHash: formatHash(item.txHash), // Format Transaction Hash
    createdAt: new Date(item.createdAt).toLocaleString(),
    color: item.type === 'withdraw' ? 'red' : 'green', // Conditional color
  }));

  // Map trade commission to dataTable format
  const commissionDataTable = tradeCommission.map(item => ({
    token: 'USDT',
    commissionAmount: parseFloat(item.commissionAmount).toFixed(2),
    commission_from: formatHash(item.commission_from), // Format Commission From
    createdAt: new Date(item.createdAt).toLocaleString(),
  }));

  // Pagination for trade history
  const paginatedData = dataTable.slice((currentPageHistory - 1) * pageSize, currentPageHistory * pageSize);
  const totalItems = dataTable.length;

  // Pagination for commission history
  const paginatedCommissionData = commissionDataTable.slice((currentPageCommission - 1) * pageSize, currentPageCommission * pageSize);
  const totalCommissionItems = commissionDataTable.length;

  const contents = [
    <>
      <CardSecondary>
        <TokenDisplay
          icon='/assets/img/token/icon-usdt.svg'
          name='USDT'
          symbol='Tether'
          amount={isBalanceVisible ? balance.toLocaleString() : '******'}
        />
        <ActionButtons />
      </CardSecondary>

      <SimpleGrid columns={{base: 1, lg: 2}} spacing={10}>
        <Box>
          <Text fontSize='2xl' fontWeight={'bold'} mb={'24px'}>{t('Lịch sử giao dịch')}</Text>
          <ConversionTable
            headers={conversionHeaders}
            data={paginatedData.map(item => ({
              ...item,
              type: <Text color={item.color}>{item.type}</Text>, // Render type with color
            }))}
          />
          <Flex justifyContent={"end"} pt={5}>
            <Pagination
              current={currentPageHistory}
              pageSize={pageSize}
              total={totalItems}
              onChange={setCurrentPageHistory}
              className="custom-pagination"
            />
          </Flex>
        </Box>
        <Box>
          <Text fontSize='2xl' fontWeight={'bold'} mb={'24px'}>{t('Lịch sử hoa hồng')}</Text>
          <ConversionTable headers={commissionHeaders} data={paginatedCommissionData} />
          <Flex justifyContent={"end"} pt={5}>
            <Pagination
              current={currentPageCommission}
              pageSize={pageSize}
              total={totalCommissionItems}
              onChange={setCurrentPageCommission}
              className="custom-pagination"
            />
          </Flex>
        </Box>
      </SimpleGrid>
    </>,
    <>
      <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={6}>
        <GridItem>
          <Box className='live-banner' minH={'152px'}>
            <Text fontSize='lg'>Live account</Text>
            <Text fontSize='3xl'>{isBalanceVisible ? <>${balance.toLocaleString()}</> : '******'}</Text>
          </Box>
        </GridItem>
        <GridItem>
          <Box className='live-banner-2' minH={'152px'}>
            <Text fontSize='lg'>Demo account</Text>
            <Text fontSize='3xl'>{isBalanceVisible ? <>${balanceTest.toLocaleString()}</> : '******'}</Text>
            <BtnYellow onClick={resetBalanceTest}>
              <IoReload size={18} />
              <Box ml={1}>{t('Nạp lại')}</Box>
            </BtnYellow>
          </Box>
        </GridItem>
      </Grid>
    </>,
  ];

  const handleTabChange = (index: number) => {
    setActiveTabIndex(index);
  };

  return (
    <Box maxW={'100vw'}>
      <Box borderTop={'2px solid #000'} className='subBanner'>
        <Box className='container'>
          <Flex justify={"space-between"} mb={2} color={'hsla(0,0%,100%,.6)!important'}>
            <Text fontSize='md'>{t('Tổng tài sản')} (USDT)</Text>
            <Flex align={"center"} onClick={toggleBalanceVisibility} cursor="pointer">
              {isBalanceVisible ? (
                <>
                  <FaEye size={22} />
                  <Text color={colors.white} ms={2} fontSize='sm'>{t('Ẩn số dư')}</Text>
                </>
              ) : (
                <>
                  <FaEyeSlash size={22} />
                  <Text color={colors.white} ms={2} fontSize='sm'>{t('Hiện số dư')}</Text>
                </>
              )}
            </Flex>
          </Flex>
          <Box>
            <Text fontSize='3xl' fontWeight={'bold'}>
              {isBalanceVisible ? `$${balance.toLocaleString()}` : '******'}
            </Text>
          </Box>
        </Box>
      </Box>
      <Box className='container'>
        <CustomTabs
          tabs={tabs}
          contents={contents}
          index={activeTabIndex}
          onChange={handleTabChange}
        />
      </Box>
    </Box>
  );
}

export default Balance;