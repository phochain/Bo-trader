import { Box } from "@chakra-ui/react";
import RightContent from "./element/rightContent.tsx";
import Chart from "./element/chart.tsx";
import TransactionHistory from "../../components/TransactionHistory";

const Home = () => {
  return (
    <Box borderTop="2px solid #000">
      <Box display={{ base: "block", lg: "flex" }}>
        <Box w="100%">
          <Chart />
          <Box padding="0 10px" mt="50px" display={{ base: "none", lg: "block" }}>
            <TransactionHistory />
          </Box>
        </Box>
        <Box mt={{ base: "50px", lg: "0" }} borderLeft="2px solid #000">
          <RightContent />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;