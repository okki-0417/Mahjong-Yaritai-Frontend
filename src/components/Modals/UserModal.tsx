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
import { useEffect, useState } from "react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { z } from "zod";
import { schemas } from "@/src/zodios/api";
import { apiClient } from "@/config/apiConfig";

export default function UserModal({
  userId,
  isOpen,
  onClose,
}: {
  userId: number;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [loadUserFlag, setLoadUserFlag] = useState(true);
  const [user, setUser] = useState<z.infer<typeof schemas.User> | null>(null);

  useEffect(() => {
    if (!loadUserFlag) return;

    const fetchUser = async () => {
      try {
        const response = await apiClient.getUser({ params: { id: String(userId) } });

        const data = response.user;

        setUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadUserFlag(false);
      }
    };

    fetchUser();
  }, [loadUserFlag, userId]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize="2xl" color="black">
            {user?.name}
          </Text>
        </ModalHeader>

        <ModalCloseButton color="black" />

        <ModalBody color="black">
          <VStack>
            <Circle size="200" overflow="hidden">
              <Image
                src={user?.avatar_url || "/no-image.webp"}
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
          <Link href={`/users/${userId}`}>
            <Button colorScheme="blue">
              <ExternalLinkIcon />
            </Button>
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
