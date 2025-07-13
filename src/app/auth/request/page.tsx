import { Box, Container, Divider, Text } from "@chakra-ui/react";
import { redirect } from "next/navigation";
import getSession from "@/src/lib/getSession";
import AuthRequestForm from "@/src/features/auth/request/AuthRequestForm";

export default async function AuthRequest() {
  const session = await getSession();
  if (session?.is_logged_in) redirect("/dashboard");

  return (
    <Container mt="20" maxW="2xl">
      <Text fontSize={["2xl", "4xl"]} fontWeight="bold">
        認証リクエスト
      </Text>
      <Divider />

      <Box mt="8">
        <AuthRequestForm />
      </Box>
    </Container>
  );
}
