"use client";

import {
  FormControl,
  FormErrorMessage,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { apiClient } from "@/src/lib/apiClients/ApiClients";
import { useRouter } from "next/navigation";
import useErrorToast from "@/src/hooks/useErrorToast";
import MainButton from "@/src/components/MainButton";

type AuthorizationForm = {
  token: string;
};

export default function AuthorizationForm() {
  const router = useRouter();
  const errorToast = useErrorToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthorizationForm>();

  const onSubmit: SubmitHandler<AuthorizationForm> = async (formData) => {
    try {
      await apiClient.post("/authorization", { authorization: formData });

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
      <FormControl isInvalid={!!errors.token} isRequired>
        <FormErrorMessage className="mt-4">
          {errors.token?.message}
        </FormErrorMessage>

        <NumberInput mt={4}>
          <NumberInputField {...register("token")} />
        </NumberInput>
      </FormControl>

      <MainButton className="mt-4">認証を完了する</MainButton>
    </form>
  );
}
