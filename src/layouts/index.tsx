import {Box, Flex} from "@chakra-ui/react";
import HeaderComponent from "./Header/HeaderComponent.tsx";
import {Outlet} from "react-router-dom";
import ContentSidebar from "./Sidebar/contentSidebar.tsx";

const LayoutComponents = () => {
  return (
    <Box className='w-full h-full'>
      <HeaderComponent/>
      <Flex>
        <Box><ContentSidebar/></Box>
        <Box w={'100%'}><Outlet/></Box>
      </Flex>
    </Box>
  )
}

export default LayoutComponents