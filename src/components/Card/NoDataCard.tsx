import CardSecondary from "./CardSecondary.tsx";
import {Box, Text} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";

const NoDataCard = () => {
  const {t} = useTranslation();

  return (
    <CardSecondary>
      <Box className='flex-box-center' p={'16px'}>
        <Text fontSize='sm'>{t('Không có dữ liệu')}</Text>
      </Box>
    </CardSecondary>
  );
};

export default NoDataCard;