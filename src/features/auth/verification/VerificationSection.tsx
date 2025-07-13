"use client";

import AuthVerificationForm from "@/src/components/AuthVerificationForm";
import useSuccessToast from "@/src/hooks/useSuccessToast";
import { useRouter } from "next/navigation";

export default function VerificationSection() {
  const successToast = useSuccessToast();
  const router = useRouter();

  const loggedInCallback = () => {
    successToast({
      title: "認証が完了しました",
      description: "ダッシュボードにリダイレクトします。",
    });
    router.push("/dashboard");
  };

  const verifiedCallback = () => {
    successToast({
      title: "認証が完了しました",
      description: "新規ユーザー登録ページにリダイレクトします。",
    });
    router.push("/users/new");
  };

  return (
    <AuthVerificationForm verifiedCallback={verifiedCallback} loggedInCallback={loggedInCallback} />
  );
}
