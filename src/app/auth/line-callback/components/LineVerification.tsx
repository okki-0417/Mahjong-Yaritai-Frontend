"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/src/lib/api/client";
import useGetSession from "@/src/hooks/useGetSession";
import ErrorPage from "@/src/components/errors/ErrorPage";
import Fallback from "@/src/components/fallbacks/Fallback";

type Props = {
  code: string;
  state: string;
};

export default function LineVerification({ code, state }: Props) {
  const router = useRouter();
  const { updateSession } = useGetSession();
  const [isVerified, setIsVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isVerified) return;

    const handleCallback = async () => {
      try {
        const response = await apiClient.createLineCallback({ code, state });
        const session = response.session;
        if (!session) throw new Error("正常に認証できませんでした。");

        await updateSession();

        if (session.is_logged_in) {
          router.push("/dashboard");
        } else {
          router.push("/users/new");
        }
      } catch (error) {
        setErrorMessage(error.message || "認証に失敗しました");
      }
    };

    handleCallback();
    setIsVerified(true);
  }, [code, state, router, isVerified, updateSession]);

  if (errorMessage) {
    return <ErrorPage message={errorMessage} />;
  }

  return <Fallback />;
}
