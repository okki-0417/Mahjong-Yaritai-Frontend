import { Button, Circle, Container, HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

export default function SocialLoginSection() {
  /* eslint-disable no-process-env */
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const redirectUri = `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/auth/google-callback`;
  /* eslint-enable no-process-env */

  let googleAuthUrl = "";

  if (clientId) {
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: "email",
      access_type: "offline",
      prompt: "select_account",
    });

    googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

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
        {googleAuthUrl && (
          <Link href={googleAuthUrl} target="_blank">
            <Button rounded="full" bgColor="white" fontWeight="normal" py="1">
              <HStack>
                <Circle size="8">
                  <Image src="/social-login/google.png" alt="" width="160" height="160" />
                </Circle>

                <Text w="full" textAlign="center" className="text-primary">
                  Googleでログイン/登録
                </Text>
              </HStack>
            </Button>
          </Link>
        )}
      </Container>
    </VStack>
  );
}
