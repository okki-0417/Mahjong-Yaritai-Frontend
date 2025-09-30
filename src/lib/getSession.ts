import { getClient } from "@/src/lib/apollo/server";
import { CurrentSessionDocument } from "@/src/generated/graphql";

export type SessionType = {
  isLoggedIn: boolean;
  userId?: number | null;
  user?: {
    id: string;
    name: string;
    email?: string | null;
    profileText?: string | null;
    avatarUrl?: string | null;
  } | null;
};

export default async function getSession(): Promise<SessionType | null> {
  const client = getClient();

  try {
    const { data } = await (client as any).query({
      query: CurrentSessionDocument,
    });

    if (!data?.currentSession) {
      return null;
    }

    return {
      isLoggedIn: data.currentSession.isLoggedIn,
      userId: data.currentSession.userId,
      user: data.currentSession.user,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return null;
  }
}
