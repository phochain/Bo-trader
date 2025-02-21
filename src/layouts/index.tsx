import { Box, Flex } from "@chakra-ui/react";
import HeaderComponent from "./Header/HeaderComponent.tsx";
import { Outlet } from "react-router-dom";
import ContentSidebar from "./Sidebar/contentSidebar.tsx";

const LayoutComponents = () => {
  return (
    <Box className="w-full h-full overflow-x-hidden"> 
      <HeaderComponent />
      <Flex flexWrap="wrap">
        <Box flexShrink={0}>
          <ContentSidebar />
        </Box>
        <Box flex="1" minW="0">
          <Outlet />
        </Box>
      </Flex>
    </Box>
  );
};

export default LayoutComponents;
