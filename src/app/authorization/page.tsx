import { Container, Text } from "@chakra-ui/react";
import getSession from "../../lib/getSession";
import { redirect } from "next/navigation";
import AuthorizationForm from "../../features/authorization/AuthorizationForm";

export default async function Authorization() {
  // const session = await getSession();
  // if (session?.is_logged_in) redirect("/dashboard");

  return (
    <Container maxW="xl" mt={40}>
      <Text fontSize="2xl">認証メールを送信しました。</Text>

      <Text mt={2}>メール内の認証コードを入力してください</Text>

      <AuthorizationForm />
    </Container>
  );
}
