import { Box, Container, Divider, Text } from "@chakra-ui/react";
import AuthVerificationSection from "@/src/features/auth/verification/AuthVerificationSecion";
import { Suspense } from "react";
import Fallback from "@/src/components/fallbacks/Fallback";

export default function AuthVerification() {
  return (
    <Container maxW="2xl" mt="20">
      <Text fontSize={["2xl", "4xl"]} fontWeight="bold">
        認証メールを送信しました
      </Text>
      <Divider />

      <Text mt="8">メール内の認証コードを入力してください</Text>

      <Box mt="4">
        <Suspense fallback={<Fallback />}>
          <AuthVerificationSection />
        </Suspense>
      </Box>
    </Container>
  );
}
