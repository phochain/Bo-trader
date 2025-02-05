import {Button} from "@chakra-ui/react";

const BtnPrice = ({children, onClick}:any) => {
  return (
    <Button
      background={'rgb(29, 35, 59)'}
      color={'rgb(255, 255, 255)'}
      minW={'40px'}
      minH={'40px'}
      fontSize={'20px'}
      fontWeight={700}
      borderRadius={'4px'}
      onClick={onClick}
      _hover='transparent'
    >
      {children}
    </Button>
  )
}

export default BtnPrice