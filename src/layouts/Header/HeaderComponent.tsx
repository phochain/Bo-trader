import { useEffect, useState } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { backgrounds } from "../../theme";
import LeftNav from "./Element/leftNav.tsx";
import RightNav from "./Element/rightNav.tsx";
import Navigate from "./Navigate";
import { ChangeAccount } from "../../../public/assets/img/exportSvg";
import CustomCheckbox from "../../components/Checkbox";
import useGlobalApi from "../../lib/zustand/useUserStore.tsx";
import { Dropdown } from "antd";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { useTranslation } from "react-i18next";

const HeaderComponent = () => {
  const { t } = useTranslation();
  const { userInfo, getUserInfo, balance } = useGlobalApi();
  const [scrolling, setScrolling] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(balance);

  useEffect(() => {
    setCurrentBalance(balance);
  }, [balance]);

  useEffect(() => {
    getUserInfo().then();
  }, [getUserInfo]);

  // Hàm cập nhật số dư khi kết nối ví
  const updateBalance = async () => {
    try {
      const updatedBalance = userInfo;
      // console.log("Updated balance:", updatedBalance);
      if (updatedBalance && typeof updatedBalance === "object") {
        setCurrentBalance(updatedBalance.balance || 0);
        // console.log("Balance updated:", updatedBalance.balance);
      }
    } catch (error) {
      console.error("Error updating balance:", error);
    }
  };

  useEffect(() => {
    updateBalance();
  }, []);

  const handleScroll = () => {
    setScrolling(window.scrollY > 1);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const items: any = [
    {
      label: (
        <Flex
          minH="48px"
          w={"200px"}
          align={"center"}
          background={backgrounds.darkBlu}
        >
          <CustomCheckbox mr={2} size="md" colorScheme="yellow" />
          <Box mr={"auto"}>
            <Text fontSize="xs" color={"hsla(0,0%,100%,.5)"}>
              {t("Real account")}
            </Text>
            <Text fontSize="lg" color={"#fff"}>
              ${currentBalance.toLocaleString()}
            </Text>
          </Box>
          <ChangeAccount />
        </Flex>
      ),
      key: "1",
    },
  ];
  const displayedBalance = currentBalance;

  return (
    <Box
      position="sticky"
      top={0}
      left={0}
      right={0}
      backgroundColor={scrolling ? "#02142b" : "#02142b"}
      transition="background-color 0.2s"
      zIndex={1000}
    >
      <Box className="container flex-box-between" py={"11px"}>
        <LeftNav />
        <Flex gap={2} align={"center"}>
          <Dropdown menu={{ items }} trigger={["click"]}>
            <Flex
              align={"center"}
              cursor={"pointer"}
              background={backgrounds.grayDark}
              padding={"3px 10px 3px 20px"}
              borderRadius={{ base: "3px", lg: "10px" }}
            >
              <Box me={"12px"}>
                <Text fontSize={"8px"} mb={"4px"}>
                  {t("Real account")}
                </Text>
                <Heading as="h5" size="sm">
                  ${displayedBalance.toLocaleString()}
                </Heading>
              </Box>
              <IoMdArrowDropdownCircle size={25} color="#8b8d96" />
            </Flex>
          </Dropdown>
          <Navigate />
          <Box display={{ base: "block", lg: "none" }}>
            <RightNav />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default HeaderComponent;
