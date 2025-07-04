"use client";

import ProblemDeleteButton from "@/src/features/what-to-discard-problems/components/ProblemDeleteButton";
import UserModal from "@/src/components/Modals/UserModal";
import { SessionType } from "@/src/lib/getSession";
import { Button, Flex, HStack, Image, Text, useDisclosure } from "@chakra-ui/react";
import { z } from "zod";
import { schemas } from "@/src/zodios/api";

export default function ProblemCardHeader({
  problem,
  session,
}: {
  problem: z.infer<typeof schemas.WhatToDiscardProblem>;
  session: SessionType | null;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex justifyContent="space-between" px="3" pt="2">
      <Button onClick={onOpen} colorScheme="" p="0">
        <HStack>
          <Image
            borderRadius="full"
            objectFit="cover"
            h="8"
            src={problem.user.avatar_url || "/no-image.webp"}
          />
          <Text fontSize="md">{problem.user.name}</Text>
        </HStack>
      </Button>

      {problem.id == session?.user_id && (
        <HStack>
          <ProblemDeleteButton problemId={problem.id} />
        </HStack>
      )}

      <UserModal userId={problem.user.id} isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
}
