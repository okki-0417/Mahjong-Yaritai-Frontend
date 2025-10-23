"use client";

import useErrorToast from "@/src/hooks/useErrorToast";
import useSuccessToast from "@/src/hooks/useSuccessToast";
import { Button, HStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoMdLogOut } from "react-icons/io";
import { useMutation } from "@apollo/client/react";
import { LogoutUserDocument, LogoutUserMutation } from "@/src/generated/graphql";
import useGetSession from "@/src/hooks/useGetSession";

export default function LogoutSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  const router = useRouter();
  const { refetch } = useGetSession();

  const [logoutUser] = useMutation<LogoutUserMutation>(LogoutUserDocument);

  const handleLogout = async () => {
    if (isSubmitting) return;

    const isConfirmed = confirm("ログアウトしますか？");
    if (!isConfirmed) return;

    try {
      setIsSubmitting(true);
      const result = await logoutUser({
        variables: {
          input: {},
        },
      });

      if (result.data?.logout?.errors && result.data.logout.errors.length > 0) {
        throw new Error(result.data.logout.errors.join(", "));
      }

      // セッション情報を再取得
      await refetch();

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
      py={3}
      px={4}
      borderRadius="md"
      color="red.500"
      variant="ghost"
      _hover={{ bg: "red.50" }}
      isLoading={isSubmitting}
      leftIcon={<IoMdLogOut />}
      justifyContent="start"
      transition="background-color 0.2s">
      <HStack w="full" justify="start">
        <Text fontSize="lg">ログアウト</Text>
      </HStack>
    </Button>
  );
}
