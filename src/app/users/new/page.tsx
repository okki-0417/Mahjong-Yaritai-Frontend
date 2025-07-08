import { Container, Text } from "@chakra-ui/react";
import getSession from "@/src/lib/getSession";
import { redirect } from "next/navigation";
import UserForm from "@/src/features/users/new/UserForm";

export default async function UserCreate() {
  const session = await getSession();
  if (session?.is_logged_in) redirect("/dashboard");

  return (
    <Container mt={40} size="xl">
      <Text as="h1" fontSize="4xl">
        新規ユーザー登録
      </Text>

      <UserForm />
    </Container>
  );
}
