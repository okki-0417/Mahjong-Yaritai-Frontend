import { Suspense } from "react";
import { Center, Container, VStack, Text } from "@chakra-ui/react";
import AuthRequestFormGraphQL from "./AuthRequestFormGraphQL";

export default function AuthRequestPageGraphQL() {
  return (
    <Container maxW="md" py={12}>
      <Center>
        <VStack spacing={6}>
          <Text fontSize="2xl" fontWeight="bold">
            認証リクエスト (GraphQL版)
          </Text>
          <Suspense fallback={<div>Loading...</div>}>
            <AuthRequestFormGraphQL />
          </Suspense>
        </VStack>
      </Center>
    </Container>
  );
}
