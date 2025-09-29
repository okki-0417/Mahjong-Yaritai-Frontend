"use client";

import { useQuery } from "@apollo/client/react";
import { CurrentSessionDocument } from "@/src/generated/graphql";
import { HStack, Text, Button, useDisclosure } from "@chakra-ui/react";
import { FollowingListModal } from "@/src/components/Modals/FollowingListModal";
import { FollowersListModal } from "@/src/components/Modals/FollowersListModal";

export function FollowStats() {
  const { data, loading } = useQuery(CurrentSessionDocument);
  const {
    isOpen: isFollowingOpen,
    onOpen: onFollowingOpen,
    onClose: onFollowingClose,
  } = useDisclosure();
  const {
    isOpen: isFollowersOpen,
    onOpen: onFollowersOpen,
    onClose: onFollowersClose,
  } = useDisclosure();

  if (loading || !data?.currentSession?.user) {
    return (
      <HStack spacing={6} justify="center">
        <Text color="gray.400">フォロー: --</Text>
        <Text color="gray.400">フォロワー: --</Text>
      </HStack>
    );
  }

  const user = data.currentSession.user;
  const followingCount = user.followingCount || 0;
  const followersCount = user.followersCount || 0;

  return (
    <>
      <HStack spacing={6} justify="center">
        <Button
          variant="ghost"
          p={2}
          h="auto"
          onClick={onFollowingOpen}
          _hover={{ bg: "gray.100" }}>
          <Text fontSize="sm">
            <Text as="span" fontWeight="bold" color="blue.600">
              {followingCount}
            </Text>{" "}
            フォロー
          </Text>
        </Button>

        <Button
          variant="ghost"
          p={2}
          h="auto"
          onClick={onFollowersOpen}
          _hover={{ bg: "gray.100" }}>
          <Text fontSize="sm">
            <Text as="span" fontWeight="bold" color="green.600">
              {followersCount}
            </Text>{" "}
            フォロワー
          </Text>
        </Button>
      </HStack>

      <FollowingListModal isOpen={isFollowingOpen} onClose={onFollowingClose} />
      <FollowersListModal isOpen={isFollowersOpen} onClose={onFollowersClose} />
    </>
  );
}
