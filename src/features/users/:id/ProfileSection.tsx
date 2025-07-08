import Profile from "@/src/features/users/:id/Profile";
import createApiPageClient from "@/src/lib/apiClients/ApiPageClient";

export default async function ProfileSection({ id }: { id: string }) {
  const apiPageClient = await createApiPageClient();

  try {
    const response = await apiPageClient.getUser({
      params: {
        id,
      },
    });

    return <Profile initialUser={response.user} />;
  } catch (error) {
    console.error(error);
  }
}
