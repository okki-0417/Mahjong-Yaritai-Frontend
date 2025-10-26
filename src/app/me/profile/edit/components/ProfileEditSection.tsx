import ProfileEditForm from "@/src/app/me/profile/edit/components/ProfileEditForm";
import { CurrentUserProfileDocument } from "@/src/generated/graphql";
import { getClient } from "@/src/lib/apollo/server";
import { Button, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CiEdit } from "react-icons/ci";

export default async function ProfileEditSection() {
  const client = getClient();
  const { data: sessionData } = await client.query({
    query: CurrentUserProfileDocument,
  });

  if (!sessionData.currentSession.isLoggedIn) redirect("/auth/request");

  const { data: userData } = await client.query({
    query: CurrentUserProfileDocument,
  });

  if (!userData.currentSession.user) redirect("/auth/request");

  return (
    <>
      <VStack gap="4" align="stretch">
        <Link href="/me/profile">
          <Button colorScheme="pink">
            <CiEdit size={20} />
          </Button>
        </Link>

        <ProfileEditForm user={userData.currentSession.user} />
      </VStack>
    </>
  );
}
