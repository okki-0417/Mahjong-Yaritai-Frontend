"use client";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { AuthStateContext } from "@/src/app/context-providers/contexts/AuthContext";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import useErrorToast from "@/src/hooks/useErrorToast";
import { apiClient } from "@/config/apiConfig";

type UserFormType = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export default function UserForm() {
  const router = useRouter();
  const errorToast = useErrorToast();

  const { setAuth } = useContext(AuthStateContext);

  const [passVisible, setPassVisible] = useState(false);
  const [passConfVisible, setPassConfVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormType>();

  const onSubmit: SubmitHandler<UserFormType> = async (formData: UserFormType) => {
    if (loading) {
      return;
    }
    setLoading(true);

    try {
      await apiClient.createUser({ user: formData });

      setAuth(true);
      router.push("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errorToast({
          error,
          title: "ユーザーの作成に失敗しました",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
      <FormControl isRequired isInvalid={Boolean(errors.name)}>
        <FormLabel htmlFor="name">ハンドルネーム</FormLabel>
        <Input type="text" {...register("name", { required: "必須です" })} />
        <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={Boolean(errors.password)} isRequired mt={5}>
        <FormLabel htmlFor="name">パスワード</FormLabel>
        <Input
          type={passVisible ? "text" : "password"}
          {...register("password", { required: "必須です" })}
        />

        <Flex mt={2} justifyContent="end">
          <Button
            type="button"
            size="sm"
            colorScheme="whiteAlpha"
            onClick={() => setPassVisible(!passVisible)}>
            パスワードを{passVisible && "非"}表示
          </Button>
        </Flex>
      </FormControl>

      <FormControl isInvalid={Boolean(errors.password_confirmation)} isRequired>
        <FormLabel htmlFor="name">パスワード（確認）</FormLabel>
        <Input
          type={passConfVisible ? "text" : "password"}
          {...register("password_confirmation", {
            required: "必須です",
          })}
        />
        <FormErrorMessage>{errors.password_confirmation?.message}</FormErrorMessage>
        <Flex mt={2} justifyContent="end">
          <Button
            type="button"
            size="sm"
            colorScheme="whiteAlpha"
            onClick={() => setPassConfVisible(!passConfVisible)}>
            パスワードを{passConfVisible && "非"}表示
          </Button>
        </Flex>
      </FormControl>

      <Box mt={4}>
        <input type="submit" value="ユーザー登録する" className="btn btn-main" />
      </Box>
    </form>
  );
}
