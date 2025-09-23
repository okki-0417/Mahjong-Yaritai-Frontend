import ClientProfileSection from "@/src/app/me/profile/ClientProfileSection";
import createApiPageClient from "@/src/lib/api/server";

export default async function ProfileSection() {
  const apiPageClient = await createApiPageClient();

  try {
    const response = await apiPageClient.getProfile();

    return <ClientProfileSection initialProfile={response.profile} />;
  } catch {
    return (
      <div>
        <p>プロフィールの取得に失敗しました。</p>
      </div>
    );
  }
}
