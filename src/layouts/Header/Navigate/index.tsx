import {Box, Center, Divider, Flex} from "@chakra-ui/react";
import ConnectWalletBtn from "../../../components/ConnectWalletBtn";
import ReusableDropdown from "../../../components/ReusableDropdown";
import RightNav from "../Element/rightNav.tsx";


const Navigate = () => {
  return (
    <Box display={{base: 'none', lg: 'block'}} alignItems={"center"}>
      <Flex align={"center"}>
        <ConnectWalletBtn/>
        <Box textAlign={"center"} padding={'0 10px'}>
          <RightNav/>
        </Box>
        <Center p={'0 8px'} h='39px'>
          <Divider orientation='vertical'/>
        </Center>
        <ReusableDropdown/>
      </Flex>
    </Box>
  )
}

export default Navigate