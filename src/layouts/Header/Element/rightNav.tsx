import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  ListItem,
  OrderedList,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import {useRef} from "react";
import {backgrounds, colors} from "../../../theme";
import {IoMdNotifications} from "react-icons/io";
import {CheckmarkIcon} from "../../../../public/assets/img/exportSvg";
import Notification from "../../../components/Notification";
import {useTranslation} from "react-i18next";

const RightNav = () => {
  const {t} = useTranslation();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const btnRef = useRef<any>();

  return (
    <>
      <Box onClick={onOpen} cursor={"pointer"}>
        <Button
          height={'22px'}
          ref={btnRef}
          background={backgrounds.darkBlu}
          position={"relative"}
          _hover='transparent'
        >
          <IoMdNotifications size={23} color={colors.white}/>
        </Button>
        <Text fontSize='sm' color={backgrounds.gray} display={{base: 'none', lg: 'block'}}>{t('Notifications')}</Text>
      </Box>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay/>
        <DrawerContent background={'#011022'} maxW={'300px'}>
          <DrawerCloseButton/>
          <DrawerHeader background={'#1f2f43'}>
            <Flex align={"center"} gap={2}>
              {t('Notifications')} <CheckmarkIcon/>
            </Flex>
          </DrawerHeader>
          <DrawerBody p={'8px 12px'}>
            <OrderedList ms={0}>
              <ListItem position={'relative'}>
                <Notification/>
              </ListItem>
            </OrderedList>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default RightNav;