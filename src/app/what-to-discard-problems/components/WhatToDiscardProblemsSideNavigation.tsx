import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { FaRegBookmark } from "react-icons/fa";

type Props = {
  isLoggedIn: boolean;
};

export default function WhatToDiscardProblemsSideNavigation({ isLoggedIn }: Props) {
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
        {isLoggedIn ? (
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
      </VStack>
    </Box>
  );
}
