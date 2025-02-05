import { Box, Button, Center, Flex, Grid, GridItem, Image, Input, Text, useDisclosure } from "@chakra-ui/react";
import BtnYellow from "../../components/Button/BtnYellow.tsx";
import { backgrounds } from "../../theme";
import { useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import useUserStore from "../../lib/zustand/useUserStore.tsx";
import ReusableModal from "../../components/ReusableModal";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Affiliate = () => {
  const { userInfo, getUserInfo } = useUserStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();

  const items = [
    {
      imgSrc: 'assets/img/ref1.svg',
      title: t('Mời bạn'),
      description: t('Mời bạn đăng ký https://bo-trader-fe.pages.dev/ qua liên kết'),
    },
    {
      imgSrc: 'assets/img/ref2.svg',
      title: t('Bạn đăng ký'),
      description: t('Bạn của bạn đồng ý lời mời, hoàn tất đăng ký và giao dịch'),
    },
    {
      imgSrc: 'assets/img/ref3.svg',
      title: t('Nhận phần hoa hồng tương ứng'),
      description: t('Nhận hoa hồng dễ dàng'),
    },
  ];

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  const idMe = userInfo?.data?.id || 14;
  const registrationLink = `https://bo-trader-fe.pages.dev/greetings/ref/${idMe}`;
  const referralCode = idMe;

  const handleCopy = useCallback((text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => toast.success('Đã sao chép vào bộ nhớ!'))
      .catch(err => console.error('Lỗi khi sao chép: ', err));
  }, []);

  const renderInputWithCopyButton = (label: string, value: string, handleCopy: (text: string) => void) => (
    <GridItem>
      <Text fontSize='sm' color={backgrounds.gray} mb={2}>{label}</Text>
      <Flex>
        <Input
          p="5px 5px 5px 20px"
          borderRadius="4px"
          background={backgrounds.white}
          color="rgb(23, 27, 44)"
          value={value}
          readOnly
        />
        <Button
          onClick={() => handleCopy(value)}
          ms={2}
          background={'linear-gradient(180deg,#fef78a,#dbb311 50%,#f3b50e)'} color={'#fff'}
          fontWeight={700} fontSize={'16px'}
          _hover='transparent'
        >
          {t('Sao chép')}
        </Button>
      </Flex>
    </GridItem>
  );

  return (
    <>
      <Box className='banner' borderTop={'2px solid #000'}>
        <Box maxW={{ base: "95%", md: "85%", lg: "75%", xl: "60%" }}>
          <Grid templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }} gap={6}>
            <GridItem>
              <Text fontSize={{ base: 'lg', xl: '3xl' }} mb={'30px'}>
                {t('Bạn cần trở thành Thành viên VIP để nhận hoa hồng VIP và hoa hồng giao dịch')}
              </Text>
              <BtnYellow onClick={onOpen}>
                {t('Mua ngay')} $100
              </BtnYellow>
              <ReusableModal
                title={t('Chấp Nhận Tham Gia')}
                body={
                  <Box borderTop='1px solid #142545' p={'32px 48px'}>
                    <Center>
                      <Image src='assets/img/shake.svg' mb={'18px'} />
                    </Center>
                    <Text fontSize='sm' textAlign={"center"} mb={'24px'}>
                      {t('Bạn cần thanh toán')} $100 {t('để mua Quyền Thành viên VIP. Bạn muốn tiếp tục?')}
                    </Text>
                    <Link to={'/balance'}>
                      <BtnYellow>
                        {t('Mua ngay')} $100
                      </BtnYellow>
                    </Link>
                  </Box>
                }
                isOpen={isOpen}
                onClose={onClose}
              />
            </GridItem>
            <GridItem>
              <Box className='affiliateInfo' background={backgrounds.darkBlu}>
                <Grid templateRows='repeat(2, 1fr)' gap={2}>
                  {renderInputWithCopyButton(t('Link Đăng ký'), registrationLink, handleCopy)}
                  {renderInputWithCopyButton(t('Mã giới thiệu'), referralCode.toString(), handleCopy)}
                </Grid>
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Box>

      <Box className='container' mt={5}>
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }} gap={6}>
          {items.map((item, index) => (
            <Flex key={index}>
              <GridItem w='100%' p={'0 15px'}>
                <Flex align={"center"}>
                  <Image src={item.imgSrc} w={'52px'} mr={'1rem'} />
                  <Box>
                    <Text fontSize='sm' mb={'.25rem'}>{item.title}</Text>
                    <Text fontSize='sm' color='hsla(0,0%,100%,.5)'>{item.description}</Text>
                  </Box>
                </Flex>
              </GridItem>
              {index < items.length - 1 && <Box className='borderSubBanner'></Box>}
            </Flex>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Affiliate;
