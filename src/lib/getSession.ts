import { apiPageClient } from "@/src/lib/apiClients/ApiPageClient";

export type SessionType = {
  is_logged_in: boolean;
  user_id: number | null;
};

export default async function getSession() {
  const apiClient = await apiPageClient();

  try {
    const response = await apiClient.get(`/session`);
    const session: SessionType = response.data.session;

    return session;
  } catch (error) {
    console.error(error);
    return null;
  }
}
