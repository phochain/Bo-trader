import { Box } from "@chakra-ui/react";
import { borderColors } from "../../theme";
import { ReactNode } from "react";

interface BadgeItemProps {
  children: ReactNode;
}

const BadgeItem: React.FC<BadgeItemProps> = ({ children }) => {
  return (
    <Box
      className='flex-box-between'
      backgroundColor={borderColors.white}
      p={'4px 8px'}
      borderRadius={'4px'}
      gap={4}
      me={2}
    >
      {children}
    </Box>
  );
};

export default BadgeItem;