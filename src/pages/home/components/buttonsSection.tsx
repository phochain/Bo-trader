import {Box, Button, Text, VStack} from "@chakra-ui/react";
import {FaArrowTrendDown, FaArrowTrendUp} from "react-icons/fa6";
import {useCountdown} from "../../../utils";
import {useTranslation} from "react-i18next";
import toast from "react-hot-toast";

type ButtonContent = {
  text: string;
  bg: string;
  icon: JSX.Element | null;
  action: 'UP' | 'DOWN' | null;
};

interface ButtonsSectionProps {
  onPlaceTrade: (action: 'UP' | 'DOWN') => void;
  loadingState: { [key: string]: boolean };
  playSound: (soundPath: string) => void;
  inputValue: number;
}

const ButtonsSection: React.FC<ButtonsSectionProps> = ({onPlaceTrade, loadingState, playSound, inputValue}) => {
  const countdownDuration = 30;
  const {timeLeft, isActive, startCountdown} = useCountdown(countdownDuration);
  const {t} = useTranslation();

  // Thay đổi nội dung dựa trên trạng thái isActive
  const buttonsRightContent: ButtonContent[] = [
    {text: t('BUY'), bg: 'rgb(3, 167, 129)', icon: <FaArrowTrendUp/>, action: 'UP'},
    {text: isActive ? t('Wait for the result') : t('Place an order'), bg: 'rgb(29, 35, 59)', icon: null, action: null},
    {text: t('SELL'), bg: 'rgb(240, 83, 89)', icon: <FaArrowTrendDown/>, action: 'DOWN'},
  ];

  const handleButtonClick = (action: 'UP' | 'DOWN' | null) => {
    if (action === 'UP' || action === 'DOWN') {
      if (inputValue <= 0) {
        toast.error('The number of transactions must be greater than 0.');
        return;
      }
      startCountdown();
      onPlaceTrade(action);
      playSound('assets/mp3/mouse-click.mp3');
    }
  }

  return (
    <Box mt={2} display={{base: 'flex', lg: 'block'}} gap={{base: '2', lg: '0'}}>
      {buttonsRightContent.map((button, index) => (
        button.action ? (
          <Button
            className='flex-box-center'
            key={index}
            gap={2}
            background={button.bg}
            borderRadius={'10px'}
            fontSize={{base: '16px', lg: '20px'}}
            w={'100%'}
            color={"fff"}
            fontWeight={700}
            p={{base: '28px 0px', lg: '30px 0px'}}
            mb={2}
            onClick={() => button.action && handleButtonClick(button.action)}
            cursor="pointer"
            isLoading={loadingState[button.action]}
            isDisabled={isActive}
            _hover='transparent'
          >
            {button.text} {button.icon}
          </Button>
        ) : (
          <Box
            key={index}
            background={button.bg}
            gap={2}
            borderRadius={'10px'}
            fontSize={'20px'}
            w={'100%'}
            color={"fff"}
            fontWeight={700}
            p={{base: '5px 0px', lg: '6px 0px'}}
            mb={2}
          >
            <VStack align="center" spacing={0}>
              <Text fontSize={'12px'}>{button.text}</Text>
              <Text fontSize="18px" color="white" fontWeight={700}>{timeLeft}s</Text>
            </VStack>
          </Box>
        )
      ))}
    </Box>
  );
};

export default ButtonsSection;
