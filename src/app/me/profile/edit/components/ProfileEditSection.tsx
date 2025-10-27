import ProfileEditForm from "@/src/app/me/profile/edit/components/ProfileEditForm";
import ErrorPage from "@/src/components/errors/ErrorPage";
import { CurrentUserProfileDocument } from "@/src/generated/graphql";
import { getClient } from "@/src/lib/apollo/server";
import { Button, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CiEdit } from "react-icons/ci";

export default async function ProfileEditSection() {
  const client = getClient();
  const { data: sessionData, error: sessionError } = await client.query({
    query: CurrentUserProfileDocument,
  });

  if (sessionError) return <ErrorPage message={sessionError.message} />;
  if (sessionData.currentSession.isLoggedIn == false) redirect("/auth/request");

  const { data: userData, error: userError } = await client.query({
    query: CurrentUserProfileDocument,
  });

  if (userError) return <ErrorPage message={userError.message} />;
  const user = userData.currentSession.user;

  return (
    <>
      <VStack gap="4" align="stretch">
        <Link href="/me/profile">
          <Button colorScheme="pink">
            <CiEdit size={20} />
          </Button>
        </Link>

        <ProfileEditForm user={user} />
      </VStack>
    </>
  );
}
