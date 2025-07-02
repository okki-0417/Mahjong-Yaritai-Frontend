"use client";

import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import useErrorToast from "@/src/hooks/useErrorToast";
import { AuthStateContext } from "@/src/app/context-providers/contexts/AuthContext";
import { apiClient } from "@/config/apiConfig";
import { z } from "zod";
import { schemas } from "@/src/zodios/api";
import { zodResolver } from "@hookform/resolvers/zod";

type LoginFormType = z.infer<typeof schemas.createSession_Body>;

export default function LoginForm() {
  const router = useRouter();
  const [passVisible, setPassVisible] = useState(false);
  const { setAuth } = useContext(AuthStateContext);

  const errorToast = useErrorToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormType>({
    resolver: zodResolver(schemas.createSession_Body),
  });

  const onSubmit: SubmitHandler<LoginFormType> = async formData => {
    try {
      await apiClient.createSession(formData);

      setAuth(true);
      router.push("/what-to-discard-problems");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errorToast({
          error,
          title: "ログインに失敗しました",
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack alignItems="start">
        <FormControl isInvalid={Boolean(errors.email)} isRequired>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input type="email" autoComplete="email" {...register("session.email")} />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.password)} isRequired>
          <FormLabel htmlFor="password">パスワード</FormLabel>
          <Input
            type={passVisible ? "text" : "password"}
            autoComplete="password"
            {...register("session.password")}
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          <Flex justifyContent="end" mt={2}>
            <Button
              type="button"
              size="sm"
              colorScheme="whiteAlpha"
              onClick={() => setPassVisible(!passVisible)}>
              パスワードを{passVisible && "非"}表示
            </Button>
          </Flex>
        </FormControl>

        <Button type="submit" colorScheme="pink" isLoading={isSubmitting}>
          ログインする
        </Button>
      </VStack>
    </form>
  );
}
