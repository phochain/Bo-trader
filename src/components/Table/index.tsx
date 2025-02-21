import { Box, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { backgrounds, colors } from "../../theme";
import { useAccount } from "wagmi";

interface Header {
  label: string;
  key: string;
}

interface DataItem {
  [key: string]: any; // Adjust this type based on your actual data structure
  direction?: { text: string | number; color: string };
  result?: { text: string | number; color: string };
}

interface ConversionTableProps {
  headers: Header[];
  data: DataItem[];
}

const ConversionTable: React.FC<ConversionTableProps> = ({ headers, data }) => {
  const { address } = useAccount();

  return (
    <Box w={'100%'} overflowX={'auto'}>
      <TableContainer maxH={'300px'} overflowY={'auto'} overflowX={"auto"}>
        <Table
          size='sm'
          background={backgrounds.darkBlu}
          color={colors.white}
          border={'1px solid #142545'}
        >
          <Thead position={"sticky"} top={0} background={'#fff'}>
            <Tr>
              {headers.map((header, index) => (
                <Th
                  borderColor={'#142545'}
                  border={'1px solid #142545'}
                  p={'14px'}
                  key={index}
                >
                  <Text fontSize='sm'>{header.label}</Text>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {!address ? ( // Check if the wallet is not connected
              <Tr>
                <Td colSpan={headers.length} textAlign="center" p={'12px'}>
                  <Text>Please connect your wallet to view the contents</Text>
                </Td>
              </Tr>
            ) : data.length === 0 ? ( // Check if there is no data
              <Tr>
                <Td colSpan={headers.length} textAlign="center" p={'12px'}>
                  <Text color='gray'>No data</Text>
                </Td>
              </Tr>
            ) : (
              data.map((item, index) => (
                <Tr key={index}>
                  {headers.map((tBody, index) => (
                    <Td
                      borderColor={'#142545'}
                      border={'1px solid #142545'}
                      key={index}
                      p={'12px'}
                    >
                      <Text
                        fontSize='sm'
                        color={
                          tBody.key === 'direction'
                            ? item[tBody.key]?.color
                            : tBody.key === 'result'
                              ? item[tBody.key]?.color
                              : 'inherit'
                        }
                      >
                        {tBody.key === 'direction'
                          ? item[tBody.key]?.text
                          : tBody.key === 'result'
                            ? item[tBody.key]?.text
                            : item[tBody.key]}
                      </Text>
                    </Td>
                  ))}
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ConversionTable;