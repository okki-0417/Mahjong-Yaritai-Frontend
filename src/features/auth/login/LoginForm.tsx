"use client";

import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { AuthStateContext } from "../../../app/contexts/AuthStateContext/AuthStateContextInner";
import useErrorToast from "../../../hooks/useErrorToast";
import { SubmitHandler, useForm } from "react-hook-form";
import { apiClient } from "../../../lib/apiClients/ApiClients";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();
  const { setAuth, setMyUserId } = useContext(AuthStateContext);
  const [passVisible, setPassVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const errorToast = useErrorToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit: SubmitHandler<LoginForm> = async (formData) => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await apiClient.post("/session", { session: formData });

      setAuth(true);
      setMyUserId(response.data.user.id);

      router.push("/what-to-discard-problems");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errorToast({
          error,
          title: "ログインに失敗しました",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
      <FormControl isInvalid={!!errors.email} isRequired>
        <FormLabel htmlFor="email">Email</FormLabel>

        <Input type="email" autoComplete="email" {...register("email")} />

        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>

      <FormControl mt={8} isInvalid={!!errors.password} isRequired>
        <FormLabel htmlFor="password">パスワード</FormLabel>

        <Input
          type={passVisible ? "text" : "password"}
          autoComplete="password"
          {...register("password")}
        />

        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>

        <Flex justifyContent="end" mt={2}>
          <Button
            type="button"
            colorScheme="whiteAlpha"
            onClick={() => setPassVisible(!passVisible)}
          >
            パスワードを{passVisible && "非"}表示
          </Button>
        </Flex>

        <Box mt={2}>
          <input type="submit" value="ログインする" className="btn btn-main" />
        </Box>
      </FormControl>
    </form>
  );
}
