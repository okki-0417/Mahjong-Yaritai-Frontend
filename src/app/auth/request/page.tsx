import { Container, Divider, Text, VStack } from "@chakra-ui/react";
import AuthRequestContent from "@/src/app/auth/components/AuthRequestContent";
import { Suspense } from "react";
import Fallback from "@/src/components/fallbacks/Fallback";

export default function AuthRequest() {
  return (
    <Container mt="20" maxW="2xl">
      <Text fontSize={["2xl", "4xl"]} fontWeight="bold">
        認証リクエスト
      </Text>
      <Divider />

      <VStack mt="8" gap="12" w="full" align="stretch">
        <Suspense fallback={<Fallback />}>
          <AuthRequestContent />
        </Suspense>
      </VStack>
    </Container>
  );
}
