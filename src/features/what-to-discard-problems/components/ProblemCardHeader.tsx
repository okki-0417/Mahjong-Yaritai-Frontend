"use client";

import ProblemDeleteButton from "@/src/features/what-to-discard-problems/components/ProblemDeleteButton";
import UserModal from "@/src/components/Modals/UserModal";
import { Button, Circle, HStack, Image, Text, useDisclosure } from "@chakra-ui/react";
import { z } from "zod";
import { schemas } from "@/src/zodios/api";

export default function ProblemCardHeader({
  problem,
  myUserId,
}: {
  problem: z.infer<typeof schemas.WhatToDiscardProblem>;
  myUserId: number | null;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isMyProblem = problem.user.id === myUserId;

  return (
    <HStack justifyContent="space-between">
      <Button onClick={onOpen} colorScheme="" p="0">
        <HStack>
          <Circle overflow="hidden" size={["8", "9"]}>
            <Image
              src={problem.user.avatar_url || "/no-image.webp"}
              alt={problem.user.name}
              w="full"
              h="full"
              objectFit="cover"
            />
          </Circle>
          <Text fontSize="md">{problem.user.name}</Text>
        </HStack>
      </Button>

      {isMyProblem && (
        <HStack>
          <ProblemDeleteButton problemId={problem.id} />
        </HStack>
      )}

      <UserModal user={problem.user} isOpen={isOpen} onClose={onClose} />
    </HStack>
  );
}
