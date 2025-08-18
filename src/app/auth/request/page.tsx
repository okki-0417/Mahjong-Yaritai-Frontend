import { Container, Divider, Text, VStack } from "@chakra-ui/react";
import AuthRequestSection from "@/src/features/auth/components/AuthRequestSection";
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
          <AuthRequestSection />
        </Suspense>
      </VStack>
    </Container>
  );
}
