import {Box, Center, Image, Text} from "@chakra-ui/react";
import ConnectWalletBtn from "../../../components/ConnectWalletBtn";
import {useTranslation} from "react-i18next";

const TradeNow = () => {
  const {t} = useTranslation();
  return (
    <Box className='tradeNow'>
      <Box className='container'>
        <Box paddingBottom={'150px'} textAlign={"center"}>
          <Center>
            <Image src='/assets/img/trade-now-img.png' className='trade-now-img' />
          </Center>
          <Text fontSize={{base: '2xl', sm: '4xl'}} mb={{base: '15px', sm: '20px'}} fontWeight={'700'}>
            {t('Tham gia 1point ngay')}
          </Text>
          <Box className='main-banner-text' mb={'66px'}>
            <Text fontSize={{base: 'sm', xl: 'md'}}>
              {t('Bắt đầu tạo thu nhập mơ ước ngay hôm nay')}!
            </Text>
          </Box>
          <ConnectWalletBtn />
        </Box>
      </Box>
    </Box>
  )
}

export default TradeNow