import {Box, Center, Grid, GridItem, Image, SimpleGrid, Text} from "@chakra-ui/react";
import ConnectWalletBtn from "../../../components/ConnectWalletBtn";
import {useTranslation} from "react-i18next";

const TradeFaster = () => {
  const {t} = useTranslation();
  return (
    <Box className='trade-faster'>
      <Box className='container'>
        <SimpleGrid columns={{base: 1, xl: 2}} spacing={10} alignItems={"center"}>
          <Box>
            <Box className='main-banner-title'>
              <Grid templateColumns={{base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', xl: 'repeat(1, 1fr)'}} gap={6}>
                <GridItem>
                  <Text fontSize={{base: '2xl', sm: '4xl'}} mb={{base: '15px', sm: '20px'}}>
                    {t('Giao dịch Với')}
                    <br/>
                    {t('Lợi nhuận Cao')}
                  </Text>
                  <Box className='main-banner-text' mb={'66px'}>
                    <Text fontSize={{base: 'sm', xl: 'md'}}>
                      {t('Các chỉ báo kỹ thuật chất lượng cao của 1point giúp các nhà giao dịch đưa ra quyết định sáng suốt hơn và kiếm được lợi nhuận đáng kể')}.
                    </Text>
                  </Box>
                </GridItem>
              </Grid>
              <ConnectWalletBtn />
            </Box>
          </Box>
          <Center>
            <Image src='/assets/img/trade-faster-img.png'/>
          </Center>
        </SimpleGrid>
      </Box>
    </Box>
  )
}

export default TradeFaster