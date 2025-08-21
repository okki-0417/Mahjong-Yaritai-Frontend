"use client";

import useErrorToast from "@/src/hooks/useErrorToast";
import useSuccessToast from "@/src/hooks/useSuccessToast";
import { apiClient } from "@/src/lib/api/client";
import { Button } from "@chakra-ui/react";
import { useState } from "react";

export default function LogoutButton() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  const logout = async () => {
    if (isSubmitting) return;

    try {
      const isConfirmed = confirm("ログアウトしますか？");
      if (!isConfirmed) return;

      setIsSubmitting(true);
      await apiClient.deleteSession([]);
      successToast({ title: "ログアウトしました" });
    } catch (error) {
      errorToast({ error, title: "ログアウトに失敗しました" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Button onClick={logout} colorScheme="" color="gray.200">
      ログアウト
    </Button>
  );
}
