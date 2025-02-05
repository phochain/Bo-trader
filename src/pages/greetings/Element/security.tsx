import {Box, Image, SimpleGrid, Text} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";

const Security = () => {
  const {t} = useTranslation();
  const securityItems = [
    {
      imgSrc: '/assets/img/security_img_1.png',
      title: t('Các Chỉ báo kỹ thuật Chất lượng cao'),
      description: t('1point là nhà phát triển hàng đầu với các chỉ số giao dịch được tính toán kỹ lưỡng và dễ sử dụng')
    },
    {
      imgSrc: '/assets/img/security_img_2.png',
      title: t('Nền tảng bảo mật cao'),
      description: t('Với nhiều năm kinh nghiệm phát triển các giao thức bảo mật cho nền tảng giao dịch, chúng tôi dùng những phương pháp tốt nhất bảo vệ tài sản của bạn trên 1point')
    },
    {
      imgSrc: '/assets/img/security_img_3.png',
      title: t('Giải pháp Giao dịch Trọn vẹn'),
      description: t('Giao dịch tốt hơn với nền tảng giao dịch toàn diện, dễ sử dụng, có tất cả những gì bạn cần'),
    },
    {
      imgSrc: '/assets/img/security_img_4.png',
      title: t('Kiếm thu nhập thụ động'),
      description: t('Trở thành đại lý để kiếm thu nhập thụ động không giới hạn từ khối lượng giao dịch của đội nhóm'),
    },
  ];
  return (
    <Box padding='130px 0 200px'>
      <Box className='container'>
        <Box className='main-banner-title' textAlign={{base: "center", xl: "start"}}>
          <Text fontSize={{base: '2xl', sm: '4xl'}} mb={{base: '15px', sm: '20px'}}>
            {t('Lựa chọn thay đổi tương lai')}
          </Text>
          <Box className='main-banner-text' mb={'66px'}>
            <Text fontSize={{base: 'sm', xl: 'md'}}>
              {t('Sự đổi mới là trọng tâm của 1point, và chúng tôi tự hào mang đến cho khách hàng của mình một trải nghiệm giao dịch chưa từng có')}
            </Text>
          </Box>
          <SimpleGrid columns={{base: 1, xl: 2}} spacing={10}>
            {securityItems.map((item, index) => (
              <Box key={index} className='security-item' paddingTop={'125px'}>
                <Box className='security-item-inner'>
                  <Box className='security-item-img'>
                    <Image src={item.imgSrc}/>
                  </Box>
                  <Box>
                    <Text fontSize='lg' fontWeight={700} lineHeight={'24px'} mb={'17px'}>
                      {item.title}
                    </Text>
                    <Text fontSize='md' color='#8d9eb9' lineHeight={'22px'}>
                      {item.description}
                    </Text>
                  </Box>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};

export default Security;