"use client";

import SocialLoginButton from "@/src/features/auth/components/SocialLoginButton";
import { ListItem, Text, UnorderedList, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SocialLoginSection() {
  const router = useRouter();

  /* eslint-disable no-process-env */
  const handleGoogleLogin = () => router.push(process.env.NEXT_PUBLIC_GOOGLE_LOGIN_URL);
  /* eslint-enable no-process-env */

  return (
    <VStack w="full" align="stretch" spacing="2">
      <Text fontSize="lg" fontWeight="bold" w="full">
        持っているアカウントでログイン/登録
      </Text>

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

      <UnorderedList>
        <VStack gap="2">
          <ListItem listStyleType="none">
            <SocialLoginButton
              handler={handleGoogleLogin}
              label="Googleでログイン/登録"
              iconURL="/social-login/google.png"
            />
          </ListItem>
        </VStack>
      </UnorderedList>
    </VStack>
  );
}
