import {
  Box,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import {useRef, useState} from "react";
import CustomTabs from "../CustomTabs";
import Deposit from "../../pages/balance/Element/deposit.tsx";
import Withdraw from "../../pages/balance/Element/withdraw.tsx";
import {backgrounds} from "../../theme";
import {useTranslation} from "react-i18next";


const ActionButtons = () => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const finalRef = useRef(null);
  const [tabIndex, setTabIndex] = useState(0); // State to manage the current tab
  const {t} = useTranslation();

  const actions = [
    {label: t('Nạp tiền'), icon: '/assets/img/icon-deposit.svg', index: 0},
    {label: t('Rút tiền'), icon: '/assets/img/icon-withdraw.svg', index: 1}
  ];

  const tabs: any = [
    <Text fontSize='sm' className='lastResults'>{t('Nạp tiền')}</Text>,
    <Text fontSize='sm' className='lastResults'>{t('Rút tiền')}</Text>
  ];

  const contents = [
    <Deposit/>,
    <Withdraw/>
  ];

  const handleActionClick = (index: number) => {
    setTabIndex(index); // Update the current tab
    onOpen();
  };

  // Handle tab change
  const handleTabChange = (index: number) => {
    setTabIndex(index); // Update the current tab on tab change
  };

  return (
    <Box borderTop={'1px solid #142545'} position={"relative"}>
      <Flex justify={"space-between"} p={'16px'}>
        {actions.map((action) => (
          <Flex align={"center"} key={action.label} cursor={"pointer"} onClick={() => handleActionClick(action.index)}>
            <Image src={action.icon} mr={1}/>
            <Text fontSize='xs'>{action.label}</Text>
          </Flex>
        ))}
      </Flex>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent background={backgrounds.darkBlu}>
          <Box position={"absolute"} right={'-10px'}>
            <ModalCloseButton/>
          </Box>
          <ModalBody>
            <CustomTabs
              tabs={tabs}
              contents={contents}
              index={tabIndex}
              onChange={handleTabChange} // Pass the tab change handler
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ActionButtons;