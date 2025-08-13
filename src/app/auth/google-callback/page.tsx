"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Container,
  Text,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Divider,
  Spinner,
  Center,
} from "@chakra-ui/react";
import Link from "next/link";
import { apiClient } from "@/src/lib/api/client";
import { AuthStateContext } from "@/src/context-providers/contexts/AuthContext";

export default function GoogleCallbackPage() {
  const router = useRouter();
  const { setMyUserId, setAuth } = useContext(AuthStateContext);
  const searchParams = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get("code");

    if (!code) {
      setError("認証コードが見つかりません");
      setIsProcessing(false);
      return;
    }

    const handleCallback = async () => {
      try {
        const response = await apiClient.createGoogleCallback({ code });
        if (response.session?.is_logged_in) {
          setMyUserId(response.session.user_id);
          setAuth(true);

          router.push("/dashboard");
        } else {
          router.push("/users/new");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "認証に失敗しました");
      } finally {
        setIsProcessing(false);
      }
    };

    handleCallback();
  }, [searchParams, router, setAuth, setMyUserId]);

  if (isProcessing) {
    return (
      <Container mt="20" maxW="2xl">
        <Center flexDirection="column">
          <Spinner size="xl" color="blue.500" thickness="4px" />
          <Text mt="4" fontSize="lg">
            認証処理中...
          </Text>
        </Center>
      </Container>
    );
  }

  if (error) {
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
          <AlertDescription>{error}</AlertDescription>
        </Alert>

        <Text mt="4">しばらく時間をおいてから再度お試しください。</Text>

        <Button as={Link} href="/auth/request" colorScheme="red" mt="4">
          ログイン/登録画面へ戻る
        </Button>
      </Container>
    );
  }

  return null;
}
