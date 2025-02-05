import {Box} from "@chakra-ui/react";

const CardSecondary = ({children}: any) => {
  return (
    <Box
      background={'#02142A'}
      borderRadius={'5px'}
      border={'1px solid #142545'}
      mb={'16px'}
    >
      {children}
    </Box>
  )
}

export default CardSecondary