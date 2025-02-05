import {Box, Center, ListItem, UnorderedList} from "@chakra-ui/react";
import {Link, useLocation} from "react-router-dom";
import {backgrounds} from "../../theme";
import {useEffect, useState} from "react";
import {AiOutlineTransaction} from "react-icons/ai";
import {RiVipLine} from "react-icons/ri";
import {CiWallet} from "react-icons/ci";
import {VscDashboard} from "react-icons/vsc";
import {useTranslation} from "react-i18next";


const ContentSidebar = () => {
  const {t} = useTranslation();
  const location = useLocation()
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const menuLeftPc = [
    {
      icon: <AiOutlineTransaction size={22}/>,
      title: t('Giao Dịch'),
      href: "/",
    },
    {
      icon: <RiVipLine size={22}/>,
      title: t('Thành viên VIP'),
      href: "/affiliate",
    },
    {
      icon: <CiWallet size={22}/>,
      title: t('Ví'),
      href: "/balance",
    },
    {
      icon: <VscDashboard size={22}/>,
      title: t('Bảng điều khiển'),
      href: "/trade-history",
    },
  ]

  useEffect(() => {
    const currentIndex = menuLeftPc.findIndex(item => item.href === location.pathname);
    setActiveIndex(currentIndex !== -1 ? currentIndex : 0); // Default to first item if not found
  }, [location.pathname, menuLeftPc]);

  const handleClick = (index: any) => {
    setActiveIndex(index);
  };

  return (
    <Box
      fontSize={'16px'}
      borderTop={'2px solid #000'}
      borderRight={'2px solid #000'}
      minH={'100vh'}
      h={'100%'}
      display={{base: "none", lg: 'block'}}
      minW={'107px'}
    >
      <UnorderedList ms={0}>
        {menuLeftPc.map((items, index) => (
          <ListItem key={index} p={'12px 0'} onClick={() => handleClick(index)}>
            <Link to={items.href}>
              <Center
                color={activeIndex === index ? '#e8ab10' : backgrounds.gray}
              >
                {items.icon}
              </Center>
              <Box
                color={activeIndex === index ? '#e8ab10' : backgrounds.gray}
                textAlign={'center'}
                fontSize={'18px'}
              >
                {items.title}
              </Box>
            </Link>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  )
}

export default ContentSidebar