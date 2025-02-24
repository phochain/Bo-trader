import { Button, Center, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Center h="100vh" bg="gray.900" color="white" p={4}>
      <VStack 
        spacing={6} 
        p={8} 
        bg="gray.800" 
        borderRadius="lg" 
        boxShadow="xl" 
        textAlign="center"
      >
        <Heading fontSize="4xl" color="red.400">
          Error - 404
        </Heading>
        <Text fontSize="lg">An error has occurred, to continue:</Text>
        <Text>
          * Return to our homepage. <br />
          * Send us an e-mail about this error and try later.
        </Text>
        <Link to="/">
          <Button colorScheme="red" size="lg" _hover={{ bg: "red.500" }}>
            Home Page
          </Button>
        </Link>
      </VStack>
    </Center>
  );
};

export default NotFound;
