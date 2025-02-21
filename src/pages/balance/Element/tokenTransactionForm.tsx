import {useEffect, useState} from "react";
import {Box, Button, Flex, Image, Input, InputGroup, InputRightElement, Text} from "@chakra-ui/react";
import Select from 'react-select';
import {LIST_TOKEN_CONTRACT_DATA} from "../../../constant";
import useGlobalApi from "../../../lib/zustand/useUserStore.tsx";
import {useTranslation} from "react-i18next";

interface TokenTransactionFormProps {
  isLoading: boolean;
  type: 'deposit' | 'withdraw';
  onSubmit: () => Promise<void>;
  setAmount: (amount: any) => void;
  amount: any;
  tokenWalletBalance: number;
  handleSetMax: () => void;
  selectedAsset: string; // Add this line
  setSelectedAsset: (asset: string) => void; // Also ensure this is included
}

const TokenTransactionForm: React.FC<TokenTransactionFormProps> = ({
                                                                     type,
                                                                     onSubmit,
                                                                     setAmount,
                                                                     amount,
                                                                     handleSetMax,
                                                                     tokenWalletBalance,
                                                                     isLoading,
                                                                   }) => {
  const {balance} = useGlobalApi(); // Typecasting if needed
  const {t} = useTranslation();

  const options = LIST_TOKEN_CONTRACT_DATA.map(token => ({
    value: token.symbol,
    label: (
      <Flex alignItems="center">
        <Image src={token.icon} alt={token.name} w="20px" h="20px" mr="10px"/>
        <span>{token.name} ({token.symbol})</span>
      </Flex>
    ),
    token: token
  }));

  const defaultUSDOption = options.find(option => option.value === "MSG");
  const [selectedOption, setSelectedOption] = useState(options[0]);

  useEffect(() => {
    if (defaultUSDOption && defaultUSDOption.value !== selectedOption.value) {
      setSelectedOption(defaultUSDOption);
    }
  }, [defaultUSDOption, selectedOption]);
  

  const handleChange = (option: any) => {
    setSelectedOption(option);
  };

  const items = [
    {
      label: t('Assets'),
      type: "select",
      content: (
        <Select
          value={selectedOption}
          onChange={handleChange}
          options={options}
          placeholder="Select a token"
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: '#172a45',
              borderColor: '#2D3748',
              color: 'white',
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: '#172a45',
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? '#2D3748' : '#172a45',
              color: 'white',
            }),
            singleValue: (base) => ({
              ...base,
              color: 'white',
            }),
            input: (base) => ({
              ...base,
              color: 'white',
            }),
          }}
        />
      ),
    },
    {
      label: t('Quantity'),
      type: "input",
      content: (
        <InputGroup size='md'>
          <Input
            type={"number"}
            pr='4.5rem'
            placeholder={`Value ${selectedOption?.value || 'token'}`}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleSetMax} _hover='transparent'>{t('All')}</Button>
          </InputRightElement>
        </InputGroup>
      ),
    },
    {
      label: t('Total balance'),
      type: "text",
      value: `${balance} MSG`,
    },
  ];

  if (type === 'deposit') {
    items.splice(2, 0, {
      label: t('Available'),
      type: "text",
      value: `${tokenWalletBalance} ${selectedOption?.value || 'token'}`,
    });
  } 

  const renderItem = (item: { type: string; label: string; content?: JSX.Element; value?: string }, index: number) => {
    switch (item.type) {
      case "select":
      case "input":
        return (
          <Box key={index} mb='24px'>
            <Text fontSize='xs' mb={1}>{item.label}</Text>
            {item.content}
          </Box>
        );
      case "text":
        return (
          <Flex key={index} justifyContent="space-between" alignItems="center" mb='24px'>
            <Text fontSize='xs'>{item.label}</Text>
            <Text fontSize='lg' fontWeight={700}>{item.value}</Text>
          </Flex>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {items.map(renderItem)}
      <Flex gap={4} justifyContent="end">
        <Button colorScheme='green' onClick={onSubmit} isLoading={isLoading} _hover='transparent'>
          {type === 'deposit' ? t('Confirm deposit') : t('Confirm withdraw')}
        </Button>
      </Flex>
    </>
  );
}

export default TokenTransactionForm;