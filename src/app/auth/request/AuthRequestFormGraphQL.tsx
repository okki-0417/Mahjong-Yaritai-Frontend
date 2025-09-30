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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useSuccessToast from "@/src/hooks/useSuccessToast";
import Link from "next/link";
import { useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";

const REQUEST_AUTH_MUTATION = gql`
  mutation RequestAuth($input: RequestAuthInput!) {
    requestAuth(input: $input) {
      success
      errors
      message
    }
  }
`;

const AuthRequestSchema = z.object({
  email: z.string().email("有効なメールアドレスを入力してください"),
});

type AuthRequestFormType = z.infer<typeof AuthRequestSchema>;

export default function AuthRequestFormGraphQL() {
  const router = useRouter();
  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  const [requestAuth, { loading }] = useMutation(REQUEST_AUTH_MUTATION);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthRequestFormType>({
    resolver: zodResolver(AuthRequestSchema),
  });

  const onSubmit: SubmitHandler<AuthRequestFormType> = async formData => {
    try {
      const result = await requestAuth({
        variables: {
          input: {
            email: formData.email,
          },
        },
      });

      const { data } = result;

      if ((data as any)?.requestAuth?.errors?.length > 0) {
        errorToast({
          title: "認証リクエストに失敗しました",
          description: (data as any).requestAuth.errors.join(", "),
        });
        return;
      }

      if ((data as any)?.requestAuth?.success) {
        successToast({
          title: "認証リクエストを送信しました",
          description:
            (data as any).requestAuth.message ||
            "確認メールを送信しました。メールを確認してください。",
        });
        router.push("/auth/verification");
      }
    } catch {
      errorToast({
        title: "通信エラー",
        description: "もう一度お試しください",
      });
    }
  };

  return (
    <Box>
      <Text fontSize="lg" fontWeight="bold" w="full">
        メールアドレスでログイン/登録 (GraphQL)
      </Text>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
        <VStack align="start" spacing={4}>
          <FormControl isInvalid={Boolean(errors.email)} isRequired>
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            <Input
              type="email"
              placeholder="test@mahjong-yaritai.com"
              autoComplete="email"
              {...register("email")}
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
          <Button type="submit" isLoading={loading} colorScheme="pink">
            確認メールを送信する
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
