import ClientProfileSection from "@/src/app/me/profile/ClientProfileSection";
import createApiPageClient from "@/src/lib/api/server";

export default async function ProfileSection() {
  const apiPageClient = await createApiPageClient();

  try {
    const [profileResponse, sessionResponse] = await Promise.all([
      apiPageClient.getProfile(),
      apiPageClient.getSession(),
    ]);

    return (
      <ClientProfileSection
        initialProfile={profileResponse.profile}
        currentUserId={sessionResponse.session.user_id}
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
