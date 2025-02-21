import { Box, Center, Flex, Progress, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const PsychologicalIndicator = () => {
  const { t } = useTranslation();
  const [progressValue, setProgressValue] = useState(0);
  const [targetValue, setTargetValue] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      if (progressValue < targetValue) {
        setProgressValue(prev => Math.min(prev + 1, targetValue));
      } else if (progressValue > targetValue) {
        setProgressValue(prev => Math.max(prev - 1, targetValue));
      }
      requestAnimationFrame(updateProgress);
    };

    const interval = setInterval(() => {
      const randomValue = Math.floor(Math.random() * (82 - 18 + 1)) + 18; // Từ 18 đến 82
      setTargetValue(randomValue);
    }, 700);

    requestAnimationFrame(updateProgress); // Bắt đầu update progress

    return () => {
      clearInterval(interval);
    };
  }, [progressValue, targetValue]);

  return (
    <Box m={"28px 0 24px 0"} display={{ base: 'none', lg: 'block' }}>
      <Center fontSize='lg' my={4} pb={1}>
        {t('Psychological Indicators')}
      </Center>
      <Progress value={progressValue} size='sm' borderRadius={'4px'} colorScheme='pink' background={'#03a781'}/>
      <Flex justifyContent={"space-between"} mt={2}>
        <Text fontSize='sm' color={'rgb(240, 83, 89)'}>{progressValue}%</Text>
        <Text fontSize='sm' color={'rgb(3, 167, 129)'}>{100 - progressValue}%</Text>
      </Flex>
    </Box>
  );
};

export default PsychologicalIndicator;