import { redirect } from "next/navigation";
import { Box, Container, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { FaAngleRight } from "react-icons/fa";
import getSession from "@/src/lib/getSession";
import LoginForm from "@/src/features/auth/login/LoginForm";
import LinkText from "@/src/components/LinkText";

export default async function Login() {
  const session = await getSession();
  if (session?.is_logged_in) redirect("/dashboard");

  return (
    <Container mt="20">
      <VStack alignItems="stretch" gap="5">
        <Box>
          <Text as="h1" fontSize="4xl" fontWeight="bold">
            ログイン
          </Text>
          <Divider />
        </Box>

        <Box h="full">
          <LoginForm />
        </Box>

        <LinkText href="/authorization-session">
          <HStack>
            <Text>新規会員登録はこちら</Text>
            <FaAngleRight />
          </HStack>
        </LinkText>
      </VStack>
    </Container>
  );
}
