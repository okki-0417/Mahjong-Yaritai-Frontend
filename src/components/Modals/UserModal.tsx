"use client";

import {
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
import { ExternalLinkIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { z } from "zod";
import { schemas } from "@/src/zodios/api";

export default function UserModal({
  user,
  isOpen,
  onClose,
}: {
  user: z.infer<typeof schemas.User>;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize="2xl" color="black">
            {user.name}
          </Text>
        </ModalHeader>

        <ModalCloseButton color="black" />

        <ModalBody color="black">
          <VStack>
            <Circle size="200" overflow="hidden">
              <Image
                src={user.avatar_url || "/no-image.webp"}
                w="full"
                h="full"
                objectFit="cover"
                draggable="false"
                bgColor="white"
              />
            </Circle>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Link href={`/users/${user.id}`}>
            <Button colorScheme="blue">
              <ExternalLinkIcon />
            </Button>
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
