"use client";

import { Button, HStack, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { IoMdLogOut } from "react-icons/io";
import { useMutation } from "@apollo/client/react";
import { LogoutUserDocument, LogoutUserMutation } from "@/src/generated/graphql";
import useGetSession from "@/src/hooks/useGetSession";
import { useForm } from "react-hook-form";

export default function LogoutSection() {
  const toast = useToast();
  const router = useRouter();
  const { refetch } = useGetSession();

  const {
    formState: { isSubmitting },
    handleSubmit,
  } = useForm();

  const [logoutUser] = useMutation<LogoutUserMutation>(LogoutUserDocument);

  const onSubmit = async () => {
    const isConfirmed = confirm("ログアウトしますか？");
    if (!isConfirmed) return;

    const { data, error } = await logoutUser();

    if (error) {
      toast({
        title: "ログアウトに失敗しました。",
        description: error.message,
        status: "error",
      });
      return;
    }

    if (data) {
      toast({
        title: "ログアウトしました。",
        status: "success",
      });

      // セッション情報を再取得
      await refetch();

      router.push("/");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Button
        type="submit"
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
    </form>
  );
}
