import {Button} from "@chakra-ui/react";

const BtnAmountItem = ({children, onClick}:any) => {
  return (
    <Button
      w={'100%'}
      fontSize={'14px'}
      background={'rgb(29, 35, 59)'}
      color={'rgb(255, 255, 255)'}
      onClick={onClick}
      _hover='transparent'
    >
      {children}
    </Button>
  )
}

export default BtnAmountItem