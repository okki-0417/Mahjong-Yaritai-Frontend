import { Suspense } from "react";
import { Center, Container, VStack, Text } from "@chakra-ui/react";
import AuthVerificationFormGraphQL from "./AuthVerificationFormGraphQL";

export default function AuthVerificationPageGraphQL() {
  return (
    <Container maxW="md" py={12}>
      <Center>
        <VStack spacing={6}>
          <Text fontSize="2xl" fontWeight="bold">
            認証確認 (GraphQL版)
          </Text>
          <Suspense fallback={<div>Loading...</div>}>
            <AuthVerificationFormGraphQL />
          </Suspense>
        </VStack>
      </Center>
    </Container>
  );
}
