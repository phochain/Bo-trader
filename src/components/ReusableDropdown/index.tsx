import React, {useEffect, useState} from 'react';
import {Box, Center, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Switch, Text} from "@chakra-ui/react";
import {backgrounds} from "../../theme";
import {CiSettings} from "react-icons/ci";
import {useTranslation} from 'react-i18next';
import {MdKeyboardArrowDown, MdLanguage} from "react-icons/md";
// import useGlobalApi from "../../lib/zustand/useUserStore.tsx";
import {FaEyeSlash} from "react-icons/fa";

interface MenuItemConfig {
  icon: any;
  label: string;
  value: string | boolean;
  isSwitch: boolean;
  isBorderBottom?: boolean;
  onChange?: () => void;
}

const languageOptions = [
  {value: 'vi', label: 'Tiếng Việt', img: 'assets/img/flag/vietnam.png'},
  {value: 'en', label: 'English', img: 'assets/img/flag/eng.png'},
  {value: 'jp', label: '日本', img: 'assets/img/flag/jp.png'},
  {value: 'kr', label: '한국어', img: 'assets/img/flag/kr.png'},
  {value: 'ch', label: '中国', img: 'assets/img/flag/ch.png'},
  {value: 'cam', label: 'ប្រទេសកម្ពុជា', img: 'assets/img/flag/cam.png'},
  {value: 'th', label: 'Thai', img: 'assets/img/flag/th.png'},
  {value: 'idn', label: 'Indonesian', img: 'assets/img/flag/idn.png'},
  {value: 'la', label: 'Lao', img: 'assets/img/flag/la.png'},
];

const ReusableDropdown: React.FC = () => {
  const {t, i18n} = useTranslation();
  const [isBalanceVisible, setIsBalanceVisible] = useState(() => {
    // Load initial state from localStorage
    return localStorage.getItem('balanceVisible') === 'true';
  });
  const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem('language') || 'vi');
  // const {toggleBalanceVisibility} = useGlobalApi();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
    setCurrentLanguage(lng);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      changeLanguage(savedLanguage);
    }
  }, []);

  const menuItems: MenuItemConfig[] = [
    {
      icon: (<><MdLanguage size={19} color={'#b6adad'}/></>),
      label: t('Language'),
      value: currentLanguage,
      isSwitch: false,
      isBorderBottom: true,
    },
    {
      icon: (<><FaEyeSlash size={19} color={'#b6adad'}/></>),
      label: t('Hide balance'),
      value: isBalanceVisible,
      isSwitch: true,
      onChange: () => {
        const newVisibility = !isBalanceVisible;
        setIsBalanceVisible(newVisibility); // Update local state
        localStorage.setItem('balanceVisible', String(newVisibility)); // Save to localStorage
        // toggleBalanceVisibility(); // Call function to toggle balance visibility
      },
    },
  ];

  return (
    <Menu>
      <MenuButton
        className='flex-box-center'
        background={backgrounds.grayDark}
        w={'39px'}
        h={'39px'}
        borderRadius={'6px'}
        cursor={"pointer"}
      >
        <Center>
          <CiSettings size={22}/>
        </Center>
      </MenuButton>
      <MenuList border={'1px solid #ffffff1a'} padding={'0 15px'} background={backgrounds.darkBlu} minW={'390px'}>
        {menuItems.map((item, index) => (
          <Box
            key={index}
            className='flex-box-between'
            padding={'15px'}
            mb={item.isBorderBottom ? 4 : 0}
            borderBottom={item.isBorderBottom ? '1px solid #ffffff1a' : 'none'}
          >
            <Text color="white">
              <Flex align={"center"} gap={2}>
                <Box>{item.icon}</Box>
                <Box>{item.label}</Box>
              </Flex>
            </Text>
            <Flex alignItems="center">
              {item.isSwitch ? (
                <>
                  <Text color="white" mr={2}>{item.value ? 'ON' : 'OFF'}</Text>
                  <Switch isChecked={item.value as boolean} onChange={item.onChange}/>
                </>
              ) : (
                <Menu>
                  <MenuButton color="white" minW={'160px'} padding={'12px'} border={'1px solid #3f465b'}
                              background={'#011022'} fontSize={'13px'}>
                    <Flex alignItems={"center"} justifyContent={"space-between"}>
                      <Flex alignItems={"center"}>
                        <Image width={'22px'} mr={2}
                               src={languageOptions.find(lang => lang.value === currentLanguage)?.img}
                               alt={currentLanguage}/>
                        {languageOptions.find(lang => lang.value === currentLanguage)?.label}
                      </Flex>
                      <MdKeyboardArrowDown/>
                    </Flex>
                  </MenuButton>
                  <MenuList bg={'#011022'} borderColor="#ffffff1a" padding={0}>
                    {languageOptions.map(({value, label, img}) => (
                      <MenuItem
                        fontSize={'14px'}
                        key={value}
                        onClick={() => changeLanguage(value)}
                        bg={backgrounds.darkBlu}
                        color="white"
                        px={4}
                        py={3}
                        background={'#011022'}
                        borderTop={'1px solid #02142b'}
                        borderColor={'#3f465b'}
                      >
                        <Image width={'22px'} me={2} src={img} alt={label}/>
                        {label}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              )}
            </Flex>
          </Box>
        ))}
      </MenuList>
    </Menu>
  );
};

export default ReusableDropdown;