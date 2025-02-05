import {Box, Center, Image, Text} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";

const Introduce = () => {
  const {t} = useTranslation();
  return (
    <Box className='introduce' textAlign={"center"}>
      <Box className='container'>
        <Box className='main-banner-title'>
          <Text fontSize={{base: '2xl', sm: '4xl'}} mb={{base: '15px', sm: '20px'}}>
            {t('Trải nghiệm giao dịch mới')}
          </Text>
          <Box className='main-banner-text' mb={'66px'} maxW={'625px'} margin='0 auto 121px'>
            <Text fontSize={{base: 'sm', xl: 'md'}}>
              {t('1point không ngừng cải thiện nền tảng để mang đến trải nghiệm tốt hơn cho các nhà giao dịch. Do đó, 1point giúp các nhà giao dịch mới đạt được tỷ lệ thắng tương tự như các nhà giao dịch có kinh nghiệm')}
            </Text>
          </Box>
          <Center>
            <Image src='/assets/img/introduce_img.png'/>
          </Center>
        </Box>
      </Box>
    </Box>
  )
}

export default Introduce