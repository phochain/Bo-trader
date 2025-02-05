import {Box, Button} from "@chakra-ui/react";
import {ReactNode} from "react";

interface BtnProps {
  children: ReactNode;
  buttonStyle?: object;
  onClick?: () => void;
  loading?: boolean;
}

const BtnYellow = ({children, buttonStyle, onClick}: BtnProps) => {
  return (
    <Box>
      <Button
        onClick={onClick}
        style={{
          borderRadius: "4px",
          color: "#fff",
          background: "linear-gradient(180deg,#fef78a,#dbb311 50%,#f3b50e)",
          fontWeight: "600",
          width: "100%",
          marginBottom: "10px",
          ...buttonStyle,
        }}
        _hover='transparent'
      >
        {children}
      </Button>
    </Box>
  )
}

export default BtnYellow