import ClientProfileSection from "@/src/app/me/profile/ClientProfileSection";
import { getClient } from "@/src/lib/apollo/server";
import { CurrentUserProfileDocument } from "@/src/generated/graphql";

export default async function ProfileSection() {
  const client = getClient();

  try {
    const { data } = await (client as any).query({
      query: CurrentUserProfileDocument,
    });

    if (!data?.currentSession?.user) {
      throw new Error("User not found");
    }

    return (
      <ClientProfileSection
        initialProfile={{
          id: Number(data.currentSession.user.id),
          name: data.currentSession.user.name,
          email: data.currentSession.user.email,
          profile_text: data.currentSession.user.profileText,
          avatar_url: data.currentSession.user.avatarUrl,
          created_at: data.currentSession.user.createdAt,
          updated_at: data.currentSession.user.updatedAt,
        }}
        currentUserId={data.currentSession.userId}
      />
    );
  } catch {
    return (
      <div>
        <p>プロフィールの取得に失敗しました。</p>
      </div>
    );
  }
}
