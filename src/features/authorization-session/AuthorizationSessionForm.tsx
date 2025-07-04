"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import useErrorToast from "@/src/hooks/useErrorToast";
import axios from "axios";
import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import MainButton from "@/src/components/MainButton";
import { apiClient } from "@/config/apiConfig";
import { z } from "zod";
import { schemas } from "@/src/zodios/api";

type AuthorizationSessionFormType = z.infer<typeof schemas.createAuthorizationSession_Body>;

export default function AuthorizationSessionForm() {
  const router = useRouter();
  const errorToast = useErrorToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthorizationSessionFormType>();

  const onSubmit: SubmitHandler<AuthorizationSessionFormType> = async (
    formData: AuthorizationSessionFormType,
  ) => {
    try {
      await apiClient.createAuthorizationSession({
        authorization_session: formData,
      });

      router.push("/authorization");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);

        errorToast({
          error,
          title: "このメールアドレスは使用できません",
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
      <FormControl isInvalid={Boolean(errors.email)} isRequired>
        <FormLabel htmlFor="email">Email</FormLabel>

        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>

        <Input
          type="email"
          placeholder="test@mahjong-yaritai.com"
          autoComplete="email"
          {...register("email")}
        />
      </FormControl>

      <MainButton className="mt-4">確認メールを送信する</MainButton>
    </form>
  );
}
