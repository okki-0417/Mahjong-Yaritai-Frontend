"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import useErrorToast from "@/src/hooks/useErrorToast";
import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import MainButton from "@/src/components/MainButton";
import { apiClient } from "@/src/lib/apiClients/ApiClient";
import { z } from "zod";
import { schemas } from "@/src/zodios/api";

type AuthRequestFormType = z.infer<typeof schemas.createAuthRequest_Body>;

export default function AuthRequestForm() {
  const router = useRouter();
  const errorToast = useErrorToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthRequestFormType>();

  const onSubmit: SubmitHandler<AuthRequestFormType> = async (formData: AuthRequestFormType) => {
    try {
      await apiClient.createAuthRequest({
        auth_request: formData,
      });

      router.push("/auth/verification");
    } catch (error) {
      errorToast({
        error,
        title: "このメールアドレスは使用できません",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
      <FormControl isInvalid={Boolean(errors.auth_request?.email)} isRequired>
        <FormLabel htmlFor="email">Email</FormLabel>

        <FormErrorMessage>{errors.auth_request?.email?.message}</FormErrorMessage>

        <Input
          type="email"
          placeholder="test@mahjong-yaritai.com"
          autoComplete="email"
          {...register("auth_request.email")}
        />
      </FormControl>

      <MainButton className="mt-4">確認メールを送信する</MainButton>
    </form>
  );
}
