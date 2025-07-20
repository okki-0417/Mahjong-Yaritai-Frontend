"use client";

import ProblemDeleteButton from "@/src/features/what-to-discard-problems/components/ProblemDeleteButton";
import UserModal from "@/src/components/Modals/UserModal";
import { Button, Circle, HStack, Image, Text, useDisclosure } from "@chakra-ui/react";
import { z } from "zod";
import { schemas } from "@/src/zodios/api";
import useMyUserId from "@/src/hooks/useMyUserId";

export default function ProblemCardHeader({
  problem,
}: {
  problem: z.infer<typeof schemas.WhatToDiscardProblem>;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const myUserId = useMyUserId();

  return (
    <HStack justifyContent="space-between">
      <Button onClick={onOpen} colorScheme="" p="0">
        <HStack>
          <Circle overflow="hidden" size={["8", "10"]}>
            <Image
              borderRadius="full"
              objectFit="cover"
              h="full"
              src={problem.user.avatar_url || "/no-image.webp"}
            />
          </Circle>
          <Text fontSize="md">{problem.user.name}</Text>
        </HStack>
      </Button>

      {problem.user.id == myUserId && (
        <HStack>
          <ProblemDeleteButton problemId={problem.id} />
        </HStack>
      )}

      <UserModal user={problem.user} isOpen={isOpen} onClose={onClose} />
    </HStack>
  );
}
