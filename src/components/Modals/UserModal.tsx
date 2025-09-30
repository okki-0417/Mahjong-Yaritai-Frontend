"use client";

import {
  Box,
  Circle,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import FollowButton from "@/src/components/FollowButton";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import { UserProfileDocument, UserProfileQuery } from "@/src/generated/graphql";

type UserType = {
  id: string | number;
  name: string;
  email?: string | null;
  profile_text?: string | null;
  avatar_url?: string | null;
  avatarUrl?: string | null;
  is_following?: boolean;
  created_at?: string;
  updated_at?: string;
};

export default function UserModal({
  user,
  isOpen,
  onClose,
  isFollowing = false,
  currentUserId = null,
}: {
  user: UserType;
  isOpen: boolean;
  onClose: () => void;
  isFollowing?: boolean;
  currentUserId?: number | null;
}) {
  const [followState, setFollowState] = useState(isFollowing);

  // eslint-disable-next-line no-unused-vars
  const { data, loading } = useQuery<UserProfileQuery>(UserProfileDocument, {
    variables: { userId: String(user.id) },
    skip: !isOpen,
  });

  useEffect(() => {
    if (data?.user) {
      // Follow state needs to be implemented in GraphQL schema
      setFollowState(isFollowing);
    }
  }, [data, isFollowing]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={{ base: "sm", md: "md" }}>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
      <ModalContent bg="gray.800" color="white">
        <ModalHeader pb={2}>ユーザー情報</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="center">
            <Circle size="80px" overflow="hidden" bg="gray.600">
              <Image
                src={user.avatar_url || "/no-image.webp"}
                alt={`${user.name}のアバター`}
                w="full"
                h="full"
                objectFit="cover"
              />
            </Circle>

            <Box textAlign="center">
              <Text fontSize="xl" fontWeight="bold" mb={2}>
                {user.name}
              </Text>
              {user.profile_text && (
                <Text color="gray.300" fontSize="sm">
                  {user.profile_text}
                </Text>
              )}
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter>
          {currentUserId && String(currentUserId) !== String(user.id) && (
            <FollowButton
              userId={typeof user.id === "string" ? Number(user.id) : user.id}
              initialIsFollowing={followState}
              currentUserId={currentUserId}
              onFollowChange={setFollowState}
            />
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
