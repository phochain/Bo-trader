import HeaderGreetings from "./Element/headerGreetings.tsx";
import {Box} from "@chakra-ui/react";
import MainBanner from "./Element/main-banner.tsx";
import Introduce from "./Element/introduce.tsx";
import TradeFaster from "./Element/trade-faster.tsx";
import Security from "./Element/security.tsx";
import TradeNow from "./Element/trade-now.tsx";

const Greetings = () => {
  const components = [
    MainBanner,
    Introduce,
    TradeFaster,
    Security,
    TradeNow
  ];
  return (
    <Box>
      <HeaderGreetings />
      <Box>
        {components.map((Component, index) => (
          <Component key={index} />
        ))}
      </Box>
    </Box>
  )
}

export default Greetings