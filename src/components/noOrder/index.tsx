import {PiSwapThin} from "react-icons/pi";
import {Box, Text} from "@chakra-ui/react";

const NoOrder = () => {
  return (
    <>
      <Box flexDirection={"column"} className='flex-box-center'>
        <PiSwapThin size={82}/>
        <Text textAlign={"center"} fontSize='sm'>You haven't issued any commands yet</Text>
      </Box>
    </>
  )
}

export default NoOrder