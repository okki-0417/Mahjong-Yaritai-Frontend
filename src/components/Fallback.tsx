import { Center, Container, Spinner, Text, VStack } from "@chakra-ui/react";

export default function Fallback() {
  return (
    <Container w="full">
      <Center>
        <VStack>
          <Spinner color="green.400" thickness="4px" emptyColor="gray.100" size="xl" />
          <Text fontSize="xl">Loading...</Text>
        </VStack>
      </Center>
    </Container>
  );
}
