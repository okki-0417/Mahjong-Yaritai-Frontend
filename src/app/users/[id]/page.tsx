import UserContextProvider from "@/src/features/users/:id/context-providers/providers/UserContextProvider";
import Profile from "@/src/features/users/:id/Profile";
import { apiPageClient } from "@/src/lib/apiClients/ApiPageClient";
import getSession from "@/src/lib/getSession";
import { schemas } from "@/src/zodios/api";
import { Container, VStack } from "@chakra-ui/react";
import { Suspense } from "react";
import { z } from "zod";

export type UserType = {
  name: string;
  avatar_url: string;
};

export default async function UserShow({ params }: { params: Promise<{ id: string }> }) {
  const client = await apiPageClient();
  const { id } = await params;

  const session = await getSession();
  const isMyPage = session?.user_id == Number(id);

  try {
    const response = await client.get(`/users/${id}`);
    const user: z.infer<typeof schemas.User> = response.data.user;

    return (
      <Container mt="40" maxW="xl">
        <VStack gap="3" position="relative" alignItems="center">
          <Suspense>
            <UserContextProvider initialUser={user}>
              <Profile isMyPage={isMyPage} />
            </UserContextProvider>
          </Suspense>
        </VStack>
      </Container>
    );
  } catch (error) {
    console.error(error);
  }
}
