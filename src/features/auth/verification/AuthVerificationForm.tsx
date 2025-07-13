"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import useErrorToast from "@/src/hooks/useErrorToast";
import { Button, FormControl, FormErrorMessage, FormLabel, Input, VStack } from "@chakra-ui/react";
import { apiClient } from "@/src/lib/apiClients/ApiClient";
import { z } from "zod";
import { schemas } from "@/src/zodios/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthStateContext } from "@/src/app/context-providers/contexts/AuthContext";
import { useContext } from "react";
import useSuccessToast from "@/src/hooks/useSuccessToast";

export default function AuthVerificationForm() {
  const router = useRouter();
  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  const { setAuth } = useContext(AuthStateContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof schemas.createAuthVerification_Body>>({
    resolver: zodResolver(schemas.createAuthVerification_Body),
  });

  const onSubmit: SubmitHandler<
    z.infer<typeof schemas.createAuthVerification_Body>
  > = async formData => {
    try {
      const response = await apiClient.createAuthVerification(formData);

      setAuth(true);

      if (response.auth_verification) {
        successToast({
          title: "認証が完了しました",
          description: "ダッシュボードにリダイレクトします。",
        });
        router.push("/dashboard");
      } else {
        successToast({
          title: "認証が完了しました",
          description: "新規ユーザー登録ページにリダイレクトします。",
        });
        router.push("/users/new");
      }
    } catch (error) {
      errorToast({ error, title: "認証に失敗しました" });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack align="start" spacing={4}>
        <FormControl isInvalid={Boolean(errors.auth_verification?.token)} isRequired>
          <FormLabel htmlFor="auth_verification.token">認証コード</FormLabel>

          <FormErrorMessage>{errors.auth_verification?.token?.message}</FormErrorMessage>

          <Input
            type="text"
            placeholder="認証コード（例：123456）"
            {...register("auth_verification.token")}
          />
        </FormControl>

        <Button type="submit" isLoading={isSubmitting} colorScheme="pink" size="lg">
          認証を完了する
        </Button>
      </VStack>
    </form>
  );
}
