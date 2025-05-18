"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { apiClient } from "../../lib/apiClients/ApiClients";
import { useRouter } from "next/navigation";
import useErrorToast from "../../hooks/useErrorToast";
import axios from "axios";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import MainButton from "../../components/MainButton";

type AuthorizationSessionForm = {
  email: string;
};

export default function AuthorizationSessionForm() {
  const router = useRouter();
  const errorToast = useErrorToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthorizationSessionForm>();

  const onSubmit: SubmitHandler<AuthorizationSessionForm> = async (
    formData: AuthorizationSessionForm
  ) => {
    try {
      await apiClient.post("/authorization_session", {
        authorization_session: formData,
      });

      router.push("/authorization");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errorToast({
          error,
          title: "このメールアドレスは使用できません",
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
      <FormControl isInvalid={!!errors.email} isRequired>
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
