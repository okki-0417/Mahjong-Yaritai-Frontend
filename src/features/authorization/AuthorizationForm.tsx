"use client";

import { FormControl, FormErrorMessage, NumberInput, NumberInputField } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import useErrorToast from "@/src/hooks/useErrorToast";
import MainButton from "@/src/components/MainButton";
import { apiClient } from "@/src/lib/apiClients/ApiClient";
import { z } from "zod";
import { schemas } from "@/src/zodios/api";

type AuthVerificationFormType = z.infer<typeof schemas.createAuthVerification_Body>;

export default function AuthorizationForm() {
  const router = useRouter();
  const errorToast = useErrorToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthVerificationFormType>();

  const onSubmit: SubmitHandler<AuthVerificationFormType> = async formData => {
    try {
      await apiClient.createAuthVerification({
        auth_verification: formData,
      });

      router.push("/users/new");
    } catch (error) {
      errorToast({
        error,
        title: "認証に失敗しました",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={Boolean(errors.auth_verification?.token)} isRequired>
        <FormErrorMessage className="mt-4">
          {errors.auth_verification?.token?.message}
        </FormErrorMessage>

        <NumberInput mt={4}>
          <NumberInputField {...register("auth_verification.token")} />
        </NumberInput>
      </FormControl>

      <MainButton className="mt-4">認証を完了する</MainButton>
    </form>
  );
}
