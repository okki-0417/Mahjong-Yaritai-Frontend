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
import { z } from "zod";
import { schemas } from "@/src/zodios/api";
import FollowButton from "@/src/components/FollowButton";
import { useState, useEffect } from "react";
import { apiClient } from "@/src/lib/api/client";

export default function UserModal({
  user,
  isOpen,
  onClose,
  isFollowing = false,
  currentUserId = null,
}: {
  user: z.infer<typeof schemas.User>;
  isOpen: boolean;
  onClose: () => void;
  isFollowing?: boolean;
  currentUserId?: number | null;
}) {
  const [followState, setFollowState] = useState(isFollowing);

  useEffect(() => {
    const fetchFollowState = async () => {
      if (!isOpen) return;

      try {
        const response = await apiClient.getUser({
          params: { id: String(user.id) },
        });
        setFollowState(response.user.is_following);
      } catch {
        // Failed to fetch follow state
        setFollowState(isFollowing);
      }
    };

    fetchFollowState();
  }, [isOpen, user.id, isFollowing]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      scrollBehavior="inside"
      size={["xs", "2xl"]}>
      <ModalOverlay />
      <ModalContent fontFamily="serif" className="text-primary">
        <ModalHeader>
          <Text fontSize="2xl" color="black">
            {user.name}
          </Text>
        </ModalHeader>

        <ModalCloseButton color="black" />

        <ModalBody color="black">
          <VStack spacing="6">
            <Circle size="200" overflow="hidden" border="1px solid">
              <Image
                src={user.avatar_url || "/no-image.webp"}
                w="full"
                h="full"
                objectFit="cover"
                draggable="false"
                bgColor="white"
              />
            </Circle>

            <FollowButton
              userId={user.id}
              initialIsFollowing={followState}
              currentUserId={currentUserId}
              size="md"
              onFollowChange={setFollowState}
            />

            {user.profile_text && (
              <Box w="full">
                <Text whiteSpace="pre-wrap" wordBreak="break-word">
                  {user.profile_text}
                </Text>
              </Box>
            )}
          </VStack>
        </ModalBody>

        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}
