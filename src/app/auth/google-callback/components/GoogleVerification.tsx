"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/src/lib/api/client";
import ErrorPage from "@/src/components/errors/ErrorPage";
import Fallback from "@/src/components/fallbacks/Fallback";

type Props = { code: string };

// サーバーコンポーネントのAPI通信ではレスポンスのSetCookieがブラウザに反映されないため、
// クライアントコンポーネントにする必要がある。
export default function GoogleVerification({ code }: Props) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (isVerified) return;

    const verifyGoogleCallback = async () => {
      try {
        const response = await apiClient.createGoogleCallback({ code });
        const session = response.session;

        if (session?.is_logged_in) {
          router.push("/dashboard");
        } else {
          router.push("/users/new");
        }
      } catch (error) {
        setErrorMessage(error.message || "認証に失敗しました");
      }
    };

    verifyGoogleCallback();
    setIsVerified(true);
  }, [code, router, isVerified]);

  if (errorMessage) {
    return <ErrorPage message={errorMessage} />;
  }

  return <Fallback />;
}
