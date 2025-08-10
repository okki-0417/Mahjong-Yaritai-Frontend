import { redirect } from "next/navigation";
import {
  Container,
  Text,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Divider,
} from "@chakra-ui/react";
import Link from "next/link";

export default async function GoogleCallbackPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string; state?: string; error?: string }>;
}) {
  const resolvedSearchParams = await searchParams;

  if (!resolvedSearchParams.code) {
    return (
      <Container mt="20" maxW="2xl">
        <Text fontSize={["2xl", "4xl"]} fontWeight="bold">
          認証エラー
        </Text>
        <Divider />

        <Alert status="error" mt="8" borderRadius="md">
          <AlertIcon />
          <AlertTitle>
            <Text color="red.500">認証コードが見つかりません</Text>
          </AlertTitle>
        </Alert>

        <Text mt="4">もう一度ログイン/登録画面からお試しください。</Text>

        <Button as={Link} href="/auth/request" colorScheme="blue" mt="4">
          ログイン/登録画面へ戻る
        </Button>
      </Container>
    );
  }

  let redirectUrl = "";

  try {
    /* eslint-disable no-process-env */
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    /* eslint-enable no-process-env */
    const response = await fetch(`${baseUrl}/api/auth/google-callback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: resolvedSearchParams.code,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "認証に失敗しました");
    }

    const data = await response.json();

    if (data.session?.is_logged_in) {
      redirectUrl = "/dashboard";
    } else {
      redirectUrl = "/users/new";
    }
  } catch (error) {
    return (
      <Container mt="20" maxW="2xl">
        <Text fontSize={["2xl", "4xl"]} fontWeight="bold">
          ログインに失敗しました
        </Text>
        <Divider />

        <Alert status="error" mt="8" borderRadius="md">
          <AlertIcon />
          <AlertTitle>
            <Text color="red.500">エラーが発生しました</Text>
          </AlertTitle>
          <AlertDescription>
            {error instanceof Error ? error.message : "不明なエラーが発生しました"}
          </AlertDescription>
        </Alert>

        <Text mt="4">しばらく時間をおいてから再度お試しください。</Text>

        <Button as={Link} href="/auth/request" colorScheme="blue" mt="4">
          ログイン/登録画面へ戻る
        </Button>
      </Container>
    );
  }

  if (redirectUrl.length) redirect(redirectUrl);
}
