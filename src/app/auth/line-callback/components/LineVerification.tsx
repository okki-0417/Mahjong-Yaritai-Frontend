"use client";

import { useEffect, useState } from "react";
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
import useGetSession from "@/src/hooks/useGetSession";

export default function LineVerification() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { updateSession } = useGetSession();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (!code) {
      setError("認証コードが見つかりません");
      setIsProcessing(false);
      return;
    } else if (!state) {
      setError("不正なリクエストです");
      setIsProcessing(false);
      return;
    }

    const handleCallback = async () => {
      try {
        const response = await apiClient.createLineCallback({ code, state });

        await updateSession();

        if (response.session?.is_logged_in) {
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
  }, [searchParams, router, updateSession]);

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
