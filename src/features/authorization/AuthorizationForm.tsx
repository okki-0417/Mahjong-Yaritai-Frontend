"use client";

import {
  FormControl,
  FormErrorMessage,
  NumberInput,
  NumberInputField,
  useToast,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { apiClient } from "../../lib/apiClients/ApiClients";
import MainButton from "../../components/MainButton";
import { useRouter } from "next/navigation";

type AuthorizationForm = {
  token: string;
};

export default function AuthorizationForm() {
  const router = useRouter();
  const toast = useToast();

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
      toast({
        title: "認証に失敗しました",
        status: "error",
        duration: 3000,
        isClosable: true,
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
