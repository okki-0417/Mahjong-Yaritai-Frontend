"use client";

import FollowerUserItem from "@/src/components/Modals/FollowerListModal/FollowerUserItem";
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
  followers: User[];
};

export function FollowersListModal({ isOpen, onClose, followers }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>フォロワー</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {followers.length == 0 && (
            <Box textAlign="center" py={8}>
              <Text fontSize="lg" color="gray.600" mb={2}>
                まだフォロワーがいません
              </Text>
              <Text color="gray.500" fontSize="sm">
                何切る問題を投稿して、フォロワーを増やしましょう！
              </Text>
            </Box>
          )}

          {followers.length > 0 && (
            <VStack spacing={4} align="stretch">
              <Text fontSize="sm" color="gray.600" textAlign="center">
                {followers.length}人のフォロワー
              </Text>
              {followers.map((follower, index) => (
                <FollowerUserItem key={index} user={follower} onClose={onClose} />
              ))}
            </VStack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
