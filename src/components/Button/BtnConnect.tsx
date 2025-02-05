import {Button} from "@chakra-ui/react";
import {colors} from "../../theme";

const BtnConnect = ({children, onClick}: any) => {
  return (
    <Button
      background={'linear-gradient(180deg,#fef78a,#dbb311 50%,#f3b50e)'}
      color={colors.white} m={'0 10px'}
      p={'0 24px'}
      borderRadius={'10px'}
      onClick={onClick}
      _hover='transparent'
    >
      {children}
    </Button>
  )
}

export default BtnConnect