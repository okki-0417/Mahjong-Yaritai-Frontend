"use client";

import useErrorToast from "@/src/hooks/useErrorToast";
import { apiClient } from "@/src/lib/api/client";
import { Button, Circle, Container, HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SocialLoginSection() {
  const errorToast = useErrorToast();
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      const response = await apiClient.getGoogleLogin();

      if (!response.redirect_url) throw new Error("Googleの認証ページに遷移できません");

      router.push(response.redirect_url);
    } catch (error) {
      errorToast({
        error,
        title: "Googleでのログインに失敗しました",
      });
    }
  };

  return (
    <VStack w="full" align="center" spacing="2">
      <Text fontSize="lg" fontWeight="bold" w="full">
        持っているアカウントでログイン/登録する
      </Text>

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

      <Container maxW="xs" mt="2">
        <Button
          onClick={handleGoogleLogin}
          rounded="full"
          bgColor="white"
          fontWeight="normal"
          py="1">
          <HStack>
            <Circle size="8">
              <Image src="/social-login/google.png" alt="" width="160" height="160" />
            </Circle>

            <Text w="full" textAlign="center" className="text-primary">
              Googleでログイン/登録
            </Text>
          </HStack>
        </Button>
      </Container>
    </VStack>
  );
}
