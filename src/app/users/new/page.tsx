import { Container, Text } from "@chakra-ui/react";
import getSession from "@/src/lib/getSession";
import { redirect } from "next/navigation";
import { apiPageClient } from "@/src/lib/apiClients/ApiPageClient";
import { Authorization } from "@/src/types/ApiData";
import UserForm from "@/src/features/users/new/UserForm";

export default async function UserCreate() {
  const session = await getSession();
  if (session?.is_logged_in) {redirect("/dashboard");}

  const client = await apiPageClient();

  const response = await client.get("/authorization");
  const data: Authorization = response.data;
  if (!data.authorized) {redirect("/authorization-session");}

  return (
    <Container mt={40} size="xl">
      <Text as="h1" fontSize="4xl">
        新規ユーザー登録
      </Text>

      <UserForm />
    </Container>
  );
}
