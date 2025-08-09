import createApiPageClient from "@/src/lib/api/server";
import { redirect } from "next/navigation";

export default async function GoogleCallbackPage({
  params,
}: {
  params: { code: string; state?: string; error?: string };
}) {
  try {
    const apiPageClient = await createApiPageClient();
    const response = await apiPageClient.createGoogleCallback({
      code: params.code,
    });

    if (response.session?.is_logged_in) {
      redirect("/dashboard");
    } else {
      redirect("/users/new");
    }
  } catch (error) {
    return (
      <div>
        <h1>ログインに失敗しました</h1>
        <p>エラー: {error instanceof Error ? error.message : "不明なエラー"}</p>
      </div>
    );
  }
}
