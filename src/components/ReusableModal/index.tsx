import {Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay,} from '@chakra-ui/react';
import {backgrounds} from "../../theme";

const ReusableModal = ({title, body, isOpen, onClose}:any) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent background={backgrounds.darkBlu}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>{body}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ReusableModal