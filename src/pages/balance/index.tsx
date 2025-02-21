import {Box, Flex, Grid, GridItem, Text} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { colors } from "../../theme";
import CardSecondary from "../../components/Card/CardSecondary.tsx";
import ActionButtons from "../../components/Button/ActionButtons.tsx";
import TokenDisplay from "../../components/TokenDisplay";
import CustomTabs from "../../components/CustomTabs";
import useGlobalApi from "../../lib/zustand/useUserStore.tsx";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ConversionTable from "../../components/Table";
import { Pagination } from "antd";
import {formatHash} from "../../utils"; 
import { useTradeStore } from "../../lib/zustand/TransactionHistory.tsx";

const Balance = () => {
  const { t } = useTranslation();
  const {
    getUserInfo,
    balance,
    isBalanceVisible,
    toggleBalanceVisibility,
  } = useGlobalApi();

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [currentPageHistory, setCurrentPageHistory] = useState(1);
  const {fetchTransactionHistory, TransactionHistory} = useTradeStore();
  const pageSize = 5;

  const tabs = [
    t('Main wallet'),
    t('Trading wallet'),
  ];

  const conversionHeaders = [
    { label: t('UserId'), key: 'userId' },
    { label: t('Amount'), key: 'amount' },
    { label: t('Direction'), key: 'directions' },
    { label: t('Transaction Hash'), key: 'txHash' },
    { label: t('Created At'), key: 'createdAt' },
  ];

  // Map trade history to dataTable format
  const dataTable = TransactionHistory.map(item => ({
    amount: item.amount,
    userId: item.userId,
    directions: item.direction === 1 ? t('Deposit') : t('Withdraw'),
    txHash: formatHash(item.txHash), // Format Transaction Hash
    createdAt: new Date(item.createdAt).toLocaleString(),
  }));

  useEffect(() => {
    getUserInfo();
    fetchTransactionHistory();
  }, []);

  // Pagination for trade history
  const paginatedData = dataTable.slice((currentPageHistory - 1) * pageSize, currentPageHistory * pageSize);
  const totalItems = dataTable.length;

  const contents = [
    <>
      <CardSecondary>
        <TokenDisplay
          icon='/assets/img/token/icon-usdt.svg'
          name='MSG'
          symbol=''
          amount={isBalanceVisible ? <>{balance.toLocaleString()} MSG</> : '******'}
        />
        <ActionButtons />
      </CardSecondary>

        <Box>
          <Text fontSize='2xl' fontWeight={'bold'} mb={'24px'}>{t('Transaction history')}</Text>
          <ConversionTable
            headers={conversionHeaders}
            data={paginatedData.map(item => ({
              ...item,
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
    </>,
    <>
      <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={6}>
        <GridItem>
          <Box className='live-banner' minH={'152px'}>
            <Text fontSize='lg'>Live account</Text>
            <Text fontSize='3xl'>{isBalanceVisible ? <>{balance?.toLocaleString()} MSG</> : '******'}</Text>
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
            <Text fontSize='md'>{t('Total assets')} (MSG)</Text>
            <Flex align={"center"} onClick={toggleBalanceVisibility} cursor="pointer">
              {isBalanceVisible ? (
                <>
                  <FaEye size={22} />
                  <Text color={colors.white} ms={2} fontSize='sm'>{t('Hide balance')}</Text>
                </>
              ) : (
                <>
                  <FaEyeSlash size={22} />
                  <Text color={colors.white} ms={2} fontSize='sm'>{t('Show balance')}</Text>
                </>
              )}
            </Flex>
          </Flex>
          <Box>
            <Text fontSize='3xl' fontWeight={'bold'}>
              {isBalanceVisible ? `${balance} MSG` : '******'}
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