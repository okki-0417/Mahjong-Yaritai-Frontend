"use client";

import { useLazyQuery } from "@apollo/client/react";
import { FollowedUsersDocument } from "@/src/generated/graphql";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  Text,
  HStack,
  Circle,
  Image,
  Button,
  Box,
  Spinner,
  Center,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect } from "react";

interface FollowingListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FollowingListModal({ isOpen, onClose }: FollowingListModalProps) {
  const [loadFollowedUsers, { data, loading, error }] = useLazyQuery(FollowedUsersDocument, {
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
  });

  // モーダルが開いた時にクエリを実行
  useEffect(() => {
    if (isOpen) {
      loadFollowedUsers();
    }
  }, [isOpen, loadFollowedUsers]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>フォローしている人</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {loading && (
            <Center py={8}>
              <VStack spacing={3}>
                <Spinner size="lg" />
                <Text fontSize="sm" color="gray.600">
                  フォロー一覧を読み込み中...
                </Text>
              </VStack>
            </Center>
          )}

          {error && (
            <Box textAlign="center" py={8}>
              <Text color="red.500" fontSize="lg">
                フォロー一覧の取得に失敗しました
              </Text>
              <Text color="gray.600" mt={2} fontSize="sm">
                {error.message}
              </Text>
              <Button
                mt={3}
                size="sm"
                colorScheme="blue"
                variant="outline"
                onClick={() => loadFollowedUsers()}>
                再試行
              </Button>
            </Box>
          )}

          {!loading && !error && (!data?.followedUsers || data.followedUsers.length === 0) && (
            <Box textAlign="center" py={8}>
              <Text fontSize="lg" color="gray.600" mb={2}>
                まだ誰もフォローしていません
              </Text>
              <Text color="gray.500" fontSize="sm">
                何切る問題を見て、気になるユーザーをフォローしてみましょう！
              </Text>
            </Box>
          )}

          {!loading && !error && data?.followedUsers && data.followedUsers.length > 0 && (
            <VStack spacing={4} align="stretch">
              <Text fontSize="sm" color="gray.600" textAlign="center">
                {data.followedUsers.length}人をフォローしています
              </Text>
              {data.followedUsers.map(user => (
                <FollowingUserItem key={user.id} user={user} onClose={onClose} />
              ))}
            </VStack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

function FollowingUserItem({
  user,
  onClose,
}: {
  user: {
    id: string;
    name: string;
    profileText?: string | null;
    avatarUrl?: string | null;
  };
  onClose: () => void;
}) {
  return (
    <HStack spacing={4} p={3} bg="gray.50" rounded="lg">
      <Circle size="50px" overflow="hidden" flexShrink={0}>
        <Image
          src={user.avatarUrl || "/no-image.webp"}
          w="full"
          h="full"
          objectFit="cover"
          draggable="false"
          bgColor="white"
        />
      </Circle>

      <Box flex={1} minW={0}>
        <Text fontWeight="bold" noOfLines={1}>
          {user.name}
        </Text>
        {user.profileText && (
          <Text fontSize="sm" color="gray.600" noOfLines={2}>
            {user.profileText}
          </Text>
        )}
      </Box>

      <Button
        as={Link}
        href={`/users/${user.id}`}
        size="sm"
        colorScheme="blue"
        variant="outline"
        onClick={onClose}
        flexShrink={0}>
        プロフィール
      </Button>
    </HStack>
  );
}
