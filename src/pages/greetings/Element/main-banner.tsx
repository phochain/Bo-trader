import {Box, Text} from "@chakra-ui/react";
import ConnectWalletBtn from "../../../components/ConnectWalletBtn";
import {useTranslation} from "react-i18next";

const MainBanner = () => {
  const {t} = useTranslation();
  return (
    <Box overflow={"hidden"}>
      <Box padding={{base: '125px 0 0 0', xl: '125px 0 185px 0'}} className='main-banner'>
        <Box className='container' display={{base: 'block', xl: 'flex'}} position='relative'>
          <Box paddingRight={{base: '0', xl: "500px"}}>
            <Box className='main-banner-title'>
              <Text fontSize={{base: '2xl', sm: '4xl'}} paddingRight={'100px'} mb={{base: '15px', sm: '20px'}}>
                {t('Nâng tầm kỹ năng giao dịch của bạn')}
              </Text>
            </Box>
            <Box className='main-banner-text' mb={'26px'}>
              <Text fontSize={{base: 'sm', xl: 'md'}}>
                {t('1point cam kết cung cấp trải nghiệm giao dịch tuyệt vời cho khách hàng và nền tảng của chúng tôi được xây dựng để đáp ứng tất cả những chiến lược giao dịch phức tạp nhất')}
              </Text>
            </Box>
            <ConnectWalletBtn />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default MainBanner