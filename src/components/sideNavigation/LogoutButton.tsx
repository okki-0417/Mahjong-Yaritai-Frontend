"use client";

import useErrorToast from "@/src/hooks/useErrorToast";
import useSuccessToast from "@/src/hooks/useSuccessToast";
import { apiClient } from "@/src/lib/api/client";
import { Button, HStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoMdLogOut } from "react-icons/io";

export default function LogoutSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  const router = useRouter();

  const handleLogout = async () => {
    if (isSubmitting) return;

    const isConfirmed = confirm("ログアウトしますか？");
    if (!isConfirmed) return;

    try {
      setIsSubmitting(true);
      await apiClient.deleteSession([]);
      successToast({ title: "ログアウトしました" });
      router.push("/");
    } catch (error) {
      errorToast({ error, title: "ログアウトに失敗しました" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      w="full"
      variant="ghost"
      color="red.500"
      _hover={{ bg: "red.50" }}
      py={3}
      px={4}
      justifyContent="flex-start">
      <HStack>
        <IoMdLogOut size={18} />
        <Text fontSize="lg">ログアウト</Text>
      </HStack>
    </Button>
  );
}
