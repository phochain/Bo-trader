import {Box, Center, Text} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";

interface ProfitDisplayProps {
  inputValue: number; // Define the type for inputValue
}

const ProfitDisplay: React.FC<ProfitDisplayProps> = ({inputValue}) => {
  const {t} = useTranslation();
  const calculatedValue = inputValue * 0.95;

  return (
    <Box m={'16px 0'} display={{base: 'flex', lg: 'block'}} justifyContent={"center"} alignItems={"center"} gap={{base: 2, lg: 0}}>
      <Box mb={{base: 0, lg: 2}} className='flex-box-center'>
        <Text fontSize='sm'>{t('Profit')}</Text>
        <Text fontSize='xl' ms={2} fontWeight={'bold'}>95%</Text>
      </Box>
      <Center color={'rgb(3, 167, 129)'} fontWeight={700} fontSize={{base: '24px', lg: '30px'}}>
        +${calculatedValue.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}
      </Center>
    </Box>
  );
};

export default ProfitDisplay;