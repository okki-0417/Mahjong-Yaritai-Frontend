import AuthorizationForm from "@/src/features/authorization/AuthorizationForm";
import getSession from "@/src/lib/getSession";
import { Container, Text } from "@chakra-ui/react";
import { redirect } from "next/navigation";

export default async function Authorization() {
  const session = await getSession();
  if (session?.is_logged_in) redirect("/dashboard");

  return (
    <Container maxW="xl" mt="20">
      <Text as="h1" fontSize="4xl" fontWeight="bold">
        認証メールを送信しました。
      </Text>

      <Text mt={2}>メール内の認証コードを入力してください</Text>

      <AuthorizationForm />
    </Container>
  );
}
