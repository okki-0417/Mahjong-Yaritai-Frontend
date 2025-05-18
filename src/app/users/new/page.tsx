import { Container, Text } from "@chakra-ui/react";
import getSession from "../../../lib/getSession";
import { redirect } from "next/navigation";
import UserForm from "../../../features/users/new/UserForm";
import { apiPageClient } from "../../../lib/apiClients/ApiPageClient";
import { Authorization } from "../../../types/ApiData";

export default async function UserCreate() {
  const session = await getSession();
  if (session?.is_logged_in) redirect("dashboard");

  const client = await apiPageClient();

  const response = await client.get("/authorization");
  const data: Authorization = response.data;
  if (!data.authorized) redirect("/authorization-session");

  return (
    <Container mt={40} size="xl">
      <Text as="h1" fontSize="4xl">
        新規ユーザー登録
      </Text>

      <UserForm />
    </Container>
  );
}
