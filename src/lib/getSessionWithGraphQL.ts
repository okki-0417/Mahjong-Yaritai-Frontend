import { apolloClient } from "@/src/lib/apollo/client";
import { CurrentSessionDocument } from "@/src/generated/graphql";

export default async function getSessionWithGraphQL() {
  try {
    const { data } = await apolloClient.query({
      query: CurrentSessionDocument,
      fetchPolicy: "network-only", // キャッシュを使わず常に最新のセッション情報を取得
    });

    if (!data?.currentSession) {
      return null;
    }

    // REST APIのレスポンス形式に合わせる
    return {
      is_logged_in: data.currentSession.isLoggedIn,
      user_id: data.currentSession.userId,
      user: data.currentSession.user
        ? {
            id: data.currentSession.user.id,
            name: data.currentSession.user.name,
            avatar_url: data.currentSession.user.avatarUrl,
          }
        : null,
    };
  } catch (error) {
    console.error("GraphQL session fetch error:", error);
    return null;
  }
}
