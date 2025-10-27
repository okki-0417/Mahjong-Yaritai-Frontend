import { getClient } from "@/src/lib/apollo/server";
import { CurrentUserProfileDocument } from "@/src/generated/graphql";
import { redirect } from "next/navigation";
import UserProfile from "@/src/components/UserProfile";
import ErrorPage from "@/src/components/errors/ErrorPage";

export default async function ProfileSection() {
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

  return <UserProfile user={user} isMyProfile={true} />;
}
