import { getClient } from "@/src/lib/apollo/server";
import { CurrentUserProfileDocument } from "@/src/generated/graphql";
import { redirect } from "next/navigation";
import UserProfile from "@/src/components/UserProfile";

export default async function ProfileSection() {
  const client = getClient();
  const { data: sessionData } = await client.query({
    query: CurrentUserProfileDocument,
  });

  if (sessionData.currentSession.isLoggedIn == false) redirect("/auth/request");

  const { data: userData } = await client.query({
    query: CurrentUserProfileDocument,
  });

  if (userData.currentSession.user) {
    return <UserProfile user={userData.currentSession.user} isMyProfile={true} />;
  } else {
    return <div>プロフィールの取得に失敗しました</div>;
  }
}
