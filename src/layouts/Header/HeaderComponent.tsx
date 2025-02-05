import {useEffect, useState} from "react";
import mqtt from 'mqtt';
import {Box, Flex, Heading, Text} from "@chakra-ui/react";
import {backgrounds} from "../../theme";
import LeftNav from "./Element/leftNav.tsx";
import RightNav from "./Element/rightNav.tsx";
import Navigate from "./Navigate";
import {ChangeAccount} from "../../../public/assets/img/exportSvg";
import {IoReload} from "react-icons/io5";
import CustomCheckbox from "../../components/Checkbox";
import useGlobalApi from "../../lib/zustand/useUserStore.tsx";
import {Dropdown} from "antd";
import {IoMdArrowDropdownCircle} from "react-icons/io";
import {useTranslation} from "react-i18next";

interface Balance {
  balance: number;
  balanceTest: number;
}
const HeaderComponent = () => {
  const {t} = useTranslation();
  const {
    balance,
    balanceTest,
    getBalance,
    resetBalanceTest,
    is_demo,
    setIsDemo,
    userInfo,
    getUserInfo
  } = useGlobalApi();
  const [scrolling, setScrolling] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(balance);
  const [currentBalanceTest, setCurrentBalanceTest] = useState(balanceTest);

  useEffect(() => {
    setCurrentBalance(balance);
    setCurrentBalanceTest(balanceTest);
  }, [balance, balanceTest]);

  useEffect(() => {
    getUserInfo().then();
  }, [getUserInfo]);

  const MQTT_URL = import.meta.env.VITE_APP_MQTT_URL;
  const USER_ID = userInfo?.data?.id;

  useEffect(() => {
    if (!USER_ID) return;
    const client = mqtt.connect(MQTT_URL);
    const topic = `trade-success/${USER_ID}`;
    console.log("topic", topic);

    client.on('connect', () => {
      console.log('MQTT connected');
      client.subscribe(topic);
    });

    client.on('message', async (receivedTopic, message) => {
      console.log('Trade success message received:', message.toString(), receivedTopic);

      if (receivedTopic === `trade-success/${USER_ID}`) {
        console.log('Updating balance...');
        try {
          const updatedBalance = await getBalance();
          console.log('Updated balance:', updatedBalance);

          if (updatedBalance && typeof updatedBalance === 'object') {
            setCurrentBalance(updatedBalance.balance || 0);
            setCurrentBalanceTest(updatedBalance.balanceTest || 0);
            console.log('Balance updated');
          } else {
            console.error('getBalance returned invalid data:', updatedBalance);
          }
        } catch (error) {
          console.error('Error updating balance:', error);
        }
      }
    });

    return () => {
      client.end();
    };
  }, [USER_ID, getBalance]);

  const handleScroll = () => {
    if (window.scrollY > 1) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    getBalance()
      .then((updatedBalance: Balance) => {
        if (updatedBalance && typeof updatedBalance === 'object') {
          setCurrentBalance(updatedBalance.balance || 0);
          setCurrentBalanceTest(updatedBalance.balanceTest || 0);
        }
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          console.error('Error fetching balance:', error.message);
        } else {
          console.error('Unexpected error fetching balance:', error);
        }
      });
  }, [getBalance]);

  const handleAccountChange = (isDemo: boolean) => {
    setIsDemo(isDemo);
  };
  const items: any = [
    {
      label: (
        <Flex minH='48px' w={'200px'} align={"center"} background={backgrounds.darkBlu}>
          <CustomCheckbox
            mr={2}
            size='md'
            colorScheme='yellow'
            isChecked={!is_demo}
            onChange={() => handleAccountChange(false)}
          />
          <Box mr={'auto'}>
            <Text fontSize='xs' color={'hsla(0,0%,100%,.5)'}>{t('Tài khoản thực')}</Text>
            <Text fontSize='lg' color={'#fff'}>${currentBalance.toLocaleString()}</Text>
          </Box>
          <ChangeAccount/>
        </Flex>
      ),
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: (
        <Flex minH='40px' w={'200px'} align={"center"} background={backgrounds.darkBlu}>
          <CustomCheckbox
            mr={2}
            size='md'
            colorScheme='yellow'
            isChecked={is_demo}
            onChange={() => handleAccountChange(true)}
          />
          <Box mr={'auto'}>
            <Text fontSize='xs' color={'hsla(0,0%,100%,.5)'}>{t('Tài khoản demo')}</Text>
            <Text fontSize='lg' color={'#fff'}>${currentBalanceTest.toLocaleString()}</Text>
          </Box>
          <IoReload onClick={resetBalanceTest} size={22} color={'#fff'}/>
        </Flex>
      ),
      key: '2',
    },
  ];

  const displayedBalance = is_demo ? currentBalanceTest : currentBalance;

  return (
    <Box
      position="sticky"
      top={0}
      left={0}
      right={0}
      backgroundColor={scrolling ? '#02142b' : '#02142b'}
      transition="background-color 0.2s"
      zIndex={1000}
    >
      <Box className='container flex-box-between' py={'11px'}>
        <LeftNav/>
        <Flex gap={2} align={"center"}>
          <Dropdown
            menu={{
              items,
            }}
            trigger={['click']}
          >
            <Flex
              align={"center"}
              cursor={"pointer"}
              background={backgrounds.grayDark}
              padding={'3px 10px 3px 20px'}
              borderRadius={{base: '3px', lg: '10px'}}
            >
              <Box me={'12px'}>
                <Text fontSize={'8px'} mb={'4px'}>
                  {is_demo ? t('Tài khoản demo') : t('Tài khoản thực')}
                </Text>
                <Heading as='h5' size='sm'>
                  ${displayedBalance.toLocaleString()}
                </Heading>
              </Box>
              <IoMdArrowDropdownCircle size={25} color='#8b8d96'/>
            </Flex>
          </Dropdown>
          <Navigate/>
          <Box display={{base: 'block', lg: 'none'}}>
            <RightNav/>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default HeaderComponent;