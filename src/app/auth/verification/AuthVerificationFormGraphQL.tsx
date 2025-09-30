"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import useErrorToast from "@/src/hooks/useErrorToast";
import { Button, FormControl, FormErrorMessage, FormLabel, Input, VStack } from "@chakra-ui/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useSuccessToast from "@/src/hooks/useSuccessToast";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";

const VERIFY_AUTH_MUTATION = gql`
  mutation VerifyAuth($input: VerifyAuthInput!) {
    verifyAuth(input: $input) {
      success
      errors
      user {
        id
        name
        email
        profileText
        avatarUrl
        createdAt
        updatedAt
      }
    }
  }
`;

const AuthVerificationSchema = z.object({
  email: z.string().email("有効なメールアドレスを入力してください"),
  token: z.string().min(6, "認証コードは6桁です").max(6, "認証コードは6桁です"),
});

type AuthVerificationFormType = z.infer<typeof AuthVerificationSchema>;

export default function AuthVerificationFormGraphQL() {
  const errorToast = useErrorToast();
  const successToast = useSuccessToast();
  const router = useRouter();

  const [verifyAuth, { loading }] = useMutation(VERIFY_AUTH_MUTATION);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthVerificationFormType>({
    resolver: zodResolver(AuthVerificationSchema),
  });

  const onSubmit: SubmitHandler<AuthVerificationFormType> = async formData => {
    try {
      const result = await verifyAuth({
        variables: {
          input: {
            email: formData.email,
            token: formData.token,
          },
        },
      });

      const { data } = result;

      if ((data as any)?.verifyAuth?.errors?.length > 0) {
        errorToast({
          title: "認証に失敗しました",
          description: (data as any).verifyAuth.errors.join(", "),
        });
        return;
      }

      if ((data as any)?.verifyAuth?.success) {
        if ((data as any).verifyAuth.user) {
          successToast({
            title: "認証が完了しました",
            description: "ダッシュボードにリダイレクトします。",
          });
          router.push("/dashboard");
        } else {
          successToast({
            title: "認証が完了しました",
            description: "新規ユーザー登録ページにリダイレクトします。",
          });
          router.push("/users/new");
        }
      }
    } catch {
      errorToast({
        title: "通信エラー",
        description: "もう一度お試しください",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

        <FormControl isInvalid={Boolean(errors.token)} isRequired>
          <FormLabel htmlFor="token">認証コード</FormLabel>
          <FormErrorMessage>{errors.token?.message}</FormErrorMessage>
          <Input type="text" placeholder="認証コード（例：123456）" {...register("token")} />
        </FormControl>

        <Button type="submit" isLoading={loading} colorScheme="pink" size="lg">
          認証を完了する
        </Button>
      </VStack>
    </form>
  );
}
