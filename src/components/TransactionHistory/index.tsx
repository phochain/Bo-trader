import {Box, Flex, Text} from "@chakra-ui/react";
import ConversionTable from "../Table";
import {conversionHeaders} from "../../constant";
import {Pagination} from "antd";
import {useTradeHistory} from "../../pages/trade-history/components/useTradeHistory.tsx";
import LoadingComponent from "../Loading";
import {useTranslation} from "react-i18next";

const TransactionHistory = () => {
  const {t} = useTranslation()
  const {
    conversionDataTable,
    isLoading,
    currentPage,
    pageSize,
    total,
    handlePageChange
  } = useTradeHistory();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" h="100vh">
        <LoadingComponent/>
      </Box>
    );
  }
  return (
    <>
      <Text fontSize='3xl' fontWeight={'bold'} my={'24px'}>
        {t('Lịch sử Giao dịch')}
      </Text>
      <ConversionTable headers={conversionHeaders} data={conversionDataTable}/>
      <Flex justifyContent={"end"} p={'25px 0'}>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={total}
          onChange={handlePageChange}
          className="custom-pagination"
        />
      </Flex>
    </>
  )
}

export default TransactionHistory