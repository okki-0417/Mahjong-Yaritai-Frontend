"use client";

import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { FaRegBookmark } from "react-icons/fa";
import { useGraphQLSession } from "@/src/app/what-to-discard-problems/context-providers/GraphQLSessionProvider";

export default function WhatToDiscardProblemsSideNavigation() {
  const { session } = useGraphQLSession();
  return (
    <Box
      p={4}
      bg="white"
      w="full"
      borderRadius="lg"
      border="1px"
      borderColor="gray.200"
      shadow="sm"
      position="sticky"
      top="20">
      <Text fontSize="lg" fontWeight="bold" mb={3} color="gray.800">
        何切る問題
      </Text>
      <VStack spacing={3} align="stretch">
        {/* ブックマークした問題 */}
        {session?.isLoggedIn ? (
          <Link href="/me/what-to-discard-problems/bookmarks">
            <HStack
              align="center"
              borderRadius="md"
              p="2"
              _hover={{
                bg: "gray.100",
                transition: "all 0.2s",
              }}
              className="text-primary"
              fontSize="sm"
              fontWeight="medium"
              gap="3">
              <FaRegBookmark size={20} />
              <Text>ブックマークした問題</Text>
            </HStack>
          </Link>
        ) : (
          <HStack borderRadius="md" color="gray.400" fontSize="sm" gap="3">
            <FaRegBookmark size={20} />
            <Text fontSize="xs">ログインしてブックマーク機能を利用</Text>
          </HStack>
        )}

        {/* 将来的に他のセクションを追加予定（人気の問題、最新の問題など） */}
      </VStack>
    </Box>
  );
}
