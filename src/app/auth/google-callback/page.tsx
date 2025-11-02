import GoogleVerification from "@/src/app/auth/google-callback/components/GoogleVerification";
import ErrorPage from "@/src/components/errors/ErrorPage";
import Fallback from "@/src/components/fallbacks/Fallback";
import { Suspense } from "react";

type Props = {
  searchParams: Promise<{
    code?: string;
  }>;
};

export default async function GoogleCallbackPage({ searchParams }: Props) {
  const { code } = await searchParams;

  try {
    if (!code) throw new Error("Googleからの認証コードが見つかりません。");

    return (
      <Suspense fallback={<Fallback />}>
        <GoogleVerification code={code} />
      </Suspense>
    );
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error("Google callback page error:", error);
    return <ErrorPage message={error.message || "認証に失敗しました"} />;
  }
}
