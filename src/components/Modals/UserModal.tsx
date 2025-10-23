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
import { User, UserProfileDocument, UserProfileQuery } from "@/src/generated/graphql";

type Props = {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  isFollowing?: boolean;
  currentUserId?: string | null;
};

export default function UserModal({
  user,
  isOpen,
  onClose,
  isFollowing = false,
  currentUserId = null,
}: Props) {
  const [followState, setFollowState] = useState(isFollowing);

  const { data } = useQuery<UserProfileQuery>(UserProfileDocument, {
    variables: { userId: String(user.id) },
    skip: !isOpen,
  });

  useEffect(() => {
    if (data?.user) {
      setFollowState(isFollowing);
    }
  }, [data, isFollowing]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={{ base: "sm", md: "md" }}>
      <ModalOverlay />

      <ModalContent fontFamily="serif">
        <ModalHeader pb={2}>ユーザー情報</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <VStack spacing={4} align="center">
            <Circle size="xs" overflow="hidden" border="1px" borderColor="gray.300">
              <Image
                src={user.avatarUrl || "/no-image.webp"}
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
              {user.profileText && (
                <Text color="gray.300" fontSize="sm">
                  {user.profileText}
                </Text>
              )}
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter>
          {currentUserId && String(currentUserId) !== String(user.id) && (
            <FollowButton
              userId={user.id}
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
