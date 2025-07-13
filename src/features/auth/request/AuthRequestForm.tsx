"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import useErrorToast from "@/src/hooks/useErrorToast";
import { Button, FormControl, FormErrorMessage, FormLabel, Input, VStack } from "@chakra-ui/react";
import { apiClient } from "@/src/lib/apiClients/ApiClient";
import { z } from "zod";
import { schemas } from "@/src/zodios/api";
import { zodResolver } from "@hookform/resolvers/zod";
import useSuccessToast from "@/src/hooks/useSuccessToast";

type AuthRequestFormType = z.infer<typeof schemas.createAuthRequest_Body>;

export default function AuthRequestForm() {
  const router = useRouter();
  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof schemas.createAuthRequest_Body>>({
    resolver: zodResolver(schemas.createAuthRequest_Body),
  });

  const onSubmit: SubmitHandler<AuthRequestFormType> = async (
    formData: z.infer<typeof schemas.createAuthRequest_Body>,
  ) => {
    try {
      await apiClient.createAuthRequest(formData);

      successToast({
        title: "認証リクエストを送信しました",
        description: "確認メールを送信しました。メールを確認してください。",
      });
      router.push("/auth/verification");
    } catch (error) {
      errorToast({
        error,
        title: "認証リクエストに失敗しました",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack align="start" spacing={4}>
        <FormControl isInvalid={Boolean(errors.auth_request?.email)} isRequired>
          <FormLabel htmlFor="auth_request.email">Email</FormLabel>

          <FormErrorMessage>{errors.auth_request?.email?.message}</FormErrorMessage>

          <Input
            type="email"
            placeholder="test@mahjong-yaritai.com"
            autoComplete="email"
            {...register("auth_request.email")}
          />
        </FormControl>

        <Button type="submit" isLoading={isSubmitting} colorScheme="pink">
          確認メールを送信する
        </Button>
      </VStack>
    </form>
  );
}
