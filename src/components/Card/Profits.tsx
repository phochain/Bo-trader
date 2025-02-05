import { Box } from "@chakra-ui/react";
import {FC, ReactNode} from "react";

interface ProfitsProps {
  children: ReactNode;
  background?: any; // Optional string type
  backgroundColor?: string; // Optional string type
}

const Profits: FC<ProfitsProps> = ({ children, background, backgroundColor }) => {
  return (
    <Box
      className='flex-box-center'
      borderRadius='14px'
      mt='20px'
      p='18px 30px'
      background={background}
      backgroundColor={backgroundColor}
    >
      {children}
    </Box>
  );
}

export default Profits;