import UserContextProvider from "@/src/features/users/:id/context-providers/providers/UserContextProvider";
import Profile from "@/src/features/users/:id/Profile";
import { apiPageClient } from "@/src/lib/apiClients/ApiPageClient";
import getSession from "@/src/lib/getSession";
import { User } from "@/src/types/ApiData";
import { Container, VStack } from "@chakra-ui/react";

export type UserType = {
  name: string;
  avatar_url: string;
};

export default async function UserShow({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const client = await apiPageClient();
  const { id } = await params;

  const session = await getSession();
  const isMyPage = session?.user_id == Number(id);

  try {
    const response = await client.get(`/users/${id}`);
    const user: User = response.data.user;

    return (
      <Container mt="40" maxW="xl">
        <VStack gap="3" position="relative" alignItems="center">
          <UserContextProvider initialUser={user}>
            <Profile isMyPage={isMyPage} />
          </UserContextProvider>
        </VStack>
      </Container>
    );
  } catch (error) {
    console.error(error);
  }
}
