import {
  Box,
  Flex,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import BtnPrice from "../../../components/Button/BtnPrice.tsx";
import BtnAmountItem from "../../../components/Button/BtnAmountItem.tsx";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

interface ValueInputProps {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  inputRef: React.RefObject<HTMLInputElement>;
  currentBalance: number;
}

const ValueInput: React.FC<ValueInputProps> = ({
                                                 inputValue,
                                                 setInputValue,
                                                 currentBalance,
                                               }) => {
  const { t } = useTranslation();

  const handleIncrease = () => {
    setInputValue((prevValue) => {
      const newValue = Math.min((Number(prevValue) || 0) + 5, currentBalance);
      return newValue.toString();
    });
  };

  const handleDecrease = () => {
    setInputValue((prevValue) => {
      const newValue = Math.max((Number(prevValue) || 0) - 5, 0);
      return newValue.toString();
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^\d*\.?\d{0,2}$/;

    if (value === '' || regex.test(value)) {
      const numericValue = Number(value) || 0;
      if (numericValue >= 5) {
        setInputValue(Math.min(numericValue, currentBalance).toString());
      } else {
        setInputValue('5');
      }
    }
  };

  const handleAmountClick = (amount: number | string) => {
    if (amount === 'All') {
      setInputValue(currentBalance.toString());
    } else {
      setInputValue((prevValue) => {
        const newValue = Math.min((Number(prevValue) || 0) + Number(amount), currentBalance);
        return newValue.toString();
      });
    }
  };

  const amountButtons = useMemo(() => [5, 10, 20, 50, 100, 'All'], []);

  return (
    <Box>
      <Text fontSize="sm">{t("Value")}</Text>
      <Flex>
        <BtnPrice onClick={handleDecrease} aria-label="Decrease value">-</BtnPrice>
        <InputGroup>
          <InputLeftElement color="rgb(23, 27, 44)">
            <Text>$</Text>
          </InputLeftElement>
          <Input
            type="text"
            m="0 7px"
            p="5px 5px 5px 20px"
            borderRadius="4px"
            backgroundColor="#fff"
            color="rgb(23, 27, 44)"
            value={inputValue}
            onChange={handleInputChange}
          />
        </InputGroup>
        <BtnPrice onClick={handleIncrease} aria-label="Increase value">+</BtnPrice>
      </Flex>
      <Grid templateColumns="repeat(3, 1fr)" gap={1} mt={2}>
        {amountButtons.map((amount) => (
          <GridItem key={amount}>
            <BtnAmountItem onClick={() => handleAmountClick(amount)}>
              {amount === 'All' ? 'All' : `+${amount}`}
            </BtnAmountItem>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default ValueInput;