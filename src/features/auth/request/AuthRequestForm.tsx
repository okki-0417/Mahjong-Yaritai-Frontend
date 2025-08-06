"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useErrorToast from "@/src/hooks/useErrorToast";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
  Checkbox,
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
  const [agreeToTerms, setAgreeToTerms] = useState(false);

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
    if (!agreeToTerms) {
      errorToast({
        title: "利用規約への同意が必要です",
        description: "利用規約とプライバシーポリシーに同意してください。",
      });
      return;
    }

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
        メールアドレスで認証リクエストを送信する
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
              本サービスは
              <Link href="/terms" className="text-blue-200 underline" target="_blank">
                利用規約
              </Link>
              と
              <Link href="/privacy" className="text-blue-200 underline" target="_blank">
                プライバシーポリシー
              </Link>
              を遵守してメールアドレス等を保管・利用いたします。
            </Text>
            <Checkbox
              mt="2"
              isChecked={agreeToTerms}
              onChange={e => setAgreeToTerms(e.target.checked)}>
              <Text fontSize="sm">利用規約とプライバシーポリシーに同意する</Text>
            </Checkbox>
          </FormControl>
          <Button
            type="submit"
            isLoading={isSubmitting}
            colorScheme="pink"
            isDisabled={!agreeToTerms}>
            確認メールを送信する
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
