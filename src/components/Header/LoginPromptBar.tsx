"use client";

import { Box, HStack, Text, CloseButton, Button } from "@chakra-ui/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import useGetSession from "@/src/hooks/useGetSession";

const STORAGE_KEY = "loginPromptDismissed";

export default function LoginPromptBar() {
  const { session } = useGetSession();
  const pathname = usePathname();
  const [isDismissed, setIsDismissed] = useState(true);

  useEffect(() => {
    // クライアントサイドでのみsessionStorageを確認
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    setIsDismissed(dismissed === "true");
  }, []);

  const isLoggedIn = session?.isLoggedIn;
  const isAuthPage = pathname?.startsWith("/auth");

  if (isLoggedIn !== false || isDismissed || isAuthPage) {
    return null;
  }

  const handleDismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, "true");
    setIsDismissed(true);
  };

  return (
    <Box w="full" py="1" px="4" bg="secondary.300" borderBottom="1px" borderColor="gray.200">
      <HStack justifyContent="center" position="relative">
        <Text fontSize="sm" color="white">
          <Button as={Link} href="/auth/request" colorScheme="pink" size="sm" mr="2">
            ログイン / 新規登録
          </Button>
          して、投票やコメントに参加しよう！
        </Text>
        <CloseButton
          size="sm"
          color="white"
          position="absolute"
          right="0"
          onClick={handleDismiss}
          aria-label="閉じる"
        />
      </HStack>
    </Box>
  );
}
