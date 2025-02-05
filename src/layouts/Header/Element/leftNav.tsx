import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Image,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { HiMenuAlt2 } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import BtnYellow from "../../../components/Button/BtnYellow.tsx";
import BtnGray from "../../../components/Button/BtnGray.tsx";
import {AiOutlineTransaction} from "react-icons/ai";
import {RiVipLine} from "react-icons/ri";
import {VscDashboard} from "react-icons/vsc";
import {GrTransaction} from "react-icons/gr";
import {CiWallet} from "react-icons/ci";
import {useTranslation} from "react-i18next";

const LeftNav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement] = useState<any>('left');
  const location = useLocation();
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const {t} = useTranslation();

  const menuLeftNav = [
    {
      title: t('Kiếm tiền'),
      content: [
        {
          iconL: <AiOutlineTransaction size={22}/>,
          title2: t('Giao dịch'),
          iconR: null,
          href: '/'
        },
        {
          iconL: <RiVipLine size={22}/>,
          title2: t('Thành viên VIP'),
          iconR: null,
          href: "/affiliate",
        },
      ]
    },
    {
      title: t('Quản lý hồ sơ'),
      content: [
        {
          iconL: <VscDashboard size={22}/>,
          title2: t('Bảng điều khiển'),
          iconR: null,
          href: "/trade-history",
        },
        {
          iconL: <GrTransaction size={22}/>,
          title2: t('Lệnh'),
          iconR: null,
          href: "#",
        },
        {
          iconL: <CiWallet size={22}/>,
          title2: t('Ví'),
          iconR: null,
          href: "/balance",
        },
      ]
    },
  ]

  const handleButtonClick = (index: number) => {
    setSelectedButton(index);
  };

  useEffect(() => {
    const currentIndex = menuLeftNav.flatMap(category => category.content)
      .findIndex(item => item.href === location.pathname);
    setSelectedButton(currentIndex !== -1 ? currentIndex : null);
  }, [location.pathname]);

  return (
    <Box>
      <Flex align={'center'}>
        <Box display={{ base: 'block', lg: 'none' }}>
          <Box onClick={onOpen}>
            <HiMenuAlt2 size={32} />
          </Box>
          <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent maxW={'300px'} background={'#011022'}>
              <DrawerCloseButton />
              <DrawerHeader>
                <Image src='assets/img/logoPage/logoWeb.svg' />
              </DrawerHeader>
              <DrawerBody padding={'8px 12px'}>
                <BtnYellow>
                  {t('Nạp nhanh')}
                </BtnYellow>
                {menuLeftNav.map((items, index) => (
                  <Box key={index}>
                    <Box mb={2}>
                      <Text fontSize='lg' as='b'>
                        {items.title}
                      </Text>
                    </Box>
                    {items.content.map((item, idx) => (
                      <Link key={idx} to={item.href}>
                        <BtnGray
                          leftIcon={item.iconL}
                          rightIcon={item.iconR}
                          onClick={() => {
                            handleButtonClick(idx);
                          }}
                          background={selectedButton === idx ? 'linear-gradient(180deg,#fef78a,#dbb311 50%,#f3b50e)' : '#1d233b'}
                        >
                          {item.title2}
                        </BtnGray>
                      </Link>
                    ))}
                  </Box>
                ))}
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Box>
        <Link to={"/"}>
          <Image src={'assets/img/logoPage/logoWeb.svg'}
                 width={'90px'}
                 height={'32px'}
                 display={{ base: 'none', sm: 'block' }} />
        </Link>
      </Flex>
    </Box>
  );
}

export default LeftNav;