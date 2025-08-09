import createApiPageClient from "@/src/lib/api/server";
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

        <Text mt="4">もう一度ログイン画面からお試しください。</Text>

        <Button as={Link} href="/auth/request" colorScheme="red" mt="4">
          ログイン画面へ戻る
        </Button>
      </Container>
    );
  }

  try {
    const apiPageClient = await createApiPageClient();
    const response = await apiPageClient.createGoogleCallback({
      code: resolvedSearchParams.code,
    });

    if (response.session?.is_logged_in) {
      redirect("/dashboard");
    } else {
      redirect("/users/new");
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

        <Button as={Link} href="/auth/login" colorScheme="blue" mt="4">
          ログイン画面へ戻る
        </Button>
      </Container>
    );
  }
}
