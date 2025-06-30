"use client";

import { FormControl, FormErrorMessage, NumberInput, NumberInputField } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import useErrorToast from "@/src/hooks/useErrorToast";
import MainButton from "@/src/components/MainButton";
import { apiClient } from "@/config/apiConfig";
import { z } from "zod";
import { schemas } from "@/src/zodios/api";

type AuthorizationFormType = z.infer<typeof schemas.createAuthorization_Body>;

export default function AuthorizationForm() {
  const router = useRouter();
  const errorToast = useErrorToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthorizationFormType>();

  const onSubmit: SubmitHandler<AuthorizationFormType> = async formData => {
    try {
      await apiClient.createAuthorization({
        authorization: formData,
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
      <FormControl isInvalid={Boolean(errors.token)} isRequired>
        <FormErrorMessage className="mt-4">{errors.token?.message}</FormErrorMessage>

        <NumberInput mt={4}>
          <NumberInputField {...register("token")} />
        </NumberInput>
      </FormControl>

      <MainButton className="mt-4">認証を完了する</MainButton>
    </form>
  );
}
