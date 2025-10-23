"use client";

import FollowingUserItem from "@/src/components/Modals/FollowingListModal/FollowingUserItem";
import { User } from "@/src/generated/graphql";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  Text,
  Box,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  followings: User[];
};

export function FollowingListModal({ isOpen, onClose, followings }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>フォローしている人</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {followings.length == 0 && (
            <Box textAlign="center" py={8}>
              <Text fontSize="lg" color="gray.600" mb={2}>
                まだ誰もフォローしていません
              </Text>
              <Text color="gray.500" fontSize="sm">
                何切る問題を見て、気になるユーザーをフォローしてみましょう！
              </Text>
            </Box>
          )}

          {followings.length > 0 && (
            <VStack spacing={4} align="stretch">
              <Text fontSize="sm" color="gray.600" textAlign="center">
                {followings.length}人をフォローしています
              </Text>
              {followings.map((following, index) => (
                <FollowingUserItem key={index} user={following} onClose={onClose} />
              ))}
            </VStack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
