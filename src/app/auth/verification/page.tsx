import { Box, Container, Divider, Text } from "@chakra-ui/react";
import AuthVerificationForm from "@/src/components/AuthVerificationForm";

export default function AuthVerification() {
  return (
    <Container maxW="2xl" mt="20">
      <Text fontSize="4xl" fontWeight="bold">
        認証メールを送信しました
      </Text>
      <Divider />

      <Text mt="8">メール内の認証コードを入力してください</Text>

      <Box mt="4">
        <AuthVerificationForm />
      </Box>
    </Container>
  );
}
