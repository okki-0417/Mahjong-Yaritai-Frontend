"use client";

import {
  Box,
  Button,
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
import useMyUserId from "@/src/hooks/useMyUserId";
import Link from "next/link";

export default function UserModal({
  user,
  isOpen,
  onClose,
}: {
  user: z.infer<typeof schemas.User>;
  isOpen: boolean;
  onClose: () => void;
}) {
  const myUserId = useMyUserId();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
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

            {user.profile_text && (
              <Box w="full">
                <Text whiteSpace="pre-wrap" wordBreak="break-word">
                  {user.profile_text}
                </Text>
              </Box>
            )}
          </VStack>
        </ModalBody>

        <ModalFooter>
          {user?.id == myUserId && (
            <Link href={`/users/${user.id}`}>
              <Button>プロフィール</Button>
            </Link>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
