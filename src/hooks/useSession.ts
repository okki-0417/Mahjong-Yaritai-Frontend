import { useQuery } from "@apollo/client/react";
import { CurrentSessionDocument } from "@/src/generated/graphql";

export function useSession() {
  const { data, loading, error, refetch } = useQuery(CurrentSessionDocument, {
    fetchPolicy: "cache-and-network", // キャッシュを使いつつネットワークからも更新
  });

  return {
    session: data?.currentSession
      ? {
          is_logged_in: data.currentSession.isLoggedIn,
          user_id: data.currentSession.userId,
          user: data.currentSession.user
            ? {
                id: Number(data.currentSession.user.id),
                name: data.currentSession.user.name,
                avatar_url: data.currentSession.user.avatarUrl || null,
              }
            : null,
        }
      : null,
    loading,
    error,
    refetch,
  };
}
