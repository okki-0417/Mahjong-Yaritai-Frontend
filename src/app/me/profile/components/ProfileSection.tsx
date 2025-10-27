import { getClient } from "@/src/lib/apollo/server";
import { CurrentUserProfileDocument } from "@/src/generated/graphql";
import { redirect } from "next/navigation";
import UserProfile from "@/src/components/UserProfile";
import ErrorPage from "@/src/components/errors/ErrorPage";

export default async function ProfileSection() {
  const client = getClient();

  try {
    const { data: sessionData } = await client.query({
      query: CurrentUserProfileDocument,
    });

    if (sessionData.currentSession.isLoggedIn == false) redirect("/auth/request");

    const { data: userData } = await client.query({
      query: CurrentUserProfileDocument,
    });

    const user = userData.currentSession.user;

    return <UserProfile user={user} isMyProfile={true} />;
  } catch (error) {
    return <ErrorPage message={error.message} />;
  }
}
