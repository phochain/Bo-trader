import { Box, Flex, Image, Text } from "@chakra-ui/react";

interface TokenDisplayProps {
  icon: string;
  name: string;
  symbol: string;
  amount: string | number; // Nếu amount có thể là số, ta thêm kiểu number
}

const TokenDisplay: React.FC<TokenDisplayProps> = ({ icon, name, symbol, amount }) => (
  <Box className='flex-box-between' p={'16px'}>
    <Flex>
      <Image src={icon} mr={2} />
      <Box>
        <Text fontSize='sm' fontWeight={'bold'}>{name}</Text>
        <Text fontSize='sm' color='#778e9f'>{symbol}</Text>
      </Box>
    </Flex>
    <Box>
      <Text fontSize='sm' fontWeight={'bold'} textAlign='end'>{amount}</Text>
      <Text fontSize='sm' color='#778e9f' textAlign={"end"}>~${amount === '0' ? '0' : '0'}</Text>
    </Box>
  </Box>
);

export default TokenDisplay;
