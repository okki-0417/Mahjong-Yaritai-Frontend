"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import useErrorToast from "@/src/hooks/useErrorToast";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
  Text,
  Box,
} from "@chakra-ui/react";
import { apiClient } from "@/src/lib/api/client";
import { z } from "zod";
import { schemas } from "@/src/zodios/api";
import { zodResolver } from "@hookform/resolvers/zod";
import useSuccessToast from "@/src/hooks/useSuccessToast";
import Link from "next/link";

type AuthRequestFormType = z.infer<typeof schemas.createAuthRequest_Body>;

export default function AuthRequestForm() {
  const router = useRouter();
  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof schemas.createAuthRequest_Body>>({
    resolver: zodResolver(schemas.createAuthRequest_Body),
  });

  const onSubmit: SubmitHandler<AuthRequestFormType> = async (
    formData: z.infer<typeof schemas.createAuthRequest_Body>,
  ) => {
    try {
      await apiClient.createAuthRequest(formData);

      successToast({
        title: "認証リクエストを送信しました",
        description: "確認メールを送信しました。メールを確認してください。",
      });
      router.push("/auth/verification");
    } catch (error) {
      errorToast({
        error,
        title: "認証リクエストに失敗しました",
      });
    }
  };

  return (
    <Box>
      <Text fontSize="lg" fontWeight="bold" w="full">
        メールアドレスでログイン/登録
      </Text>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
        <VStack align="start" spacing={4}>
          <FormControl isInvalid={Boolean(errors.auth_request?.email)} isRequired>
            <FormLabel htmlFor="auth_request.email">Email</FormLabel>
            <FormErrorMessage>{errors.auth_request?.email?.message}</FormErrorMessage>
            <Input
              type="email"
              placeholder="test@mahjong-yaritai.com"
              autoComplete="email"
              {...register("auth_request.email")}
            />
          </FormControl>
          <FormControl>
            <Text fontSize="sm">
              <Link href="/terms" className="text-blue-200 underline" target="_blank">
                利用規約
              </Link>
              と
              <Link href="/privacy" className="text-blue-200 underline" target="_blank">
                プライバシーポリシー
              </Link>
              に同意の上、ログイン/登録を行ってください。
            </Text>
          </FormControl>
          <Button type="submit" isLoading={isSubmitting} colorScheme="pink">
            確認メールを送信する
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
