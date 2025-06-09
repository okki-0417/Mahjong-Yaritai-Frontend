"use client";

import ProblemDeleteButton from "@/src/features/what-to-discard-problems/components/ProblemDeleteButton";
import UserModal from "@/src/features/what-to-discard-problems/components/UserModal";
import { SessionType } from "@/src/lib/getSession";
import { WhatToDiscardProblem } from "@/src/types/ApiData";
import { Button, Flex, HStack, Image, Text, useDisclosure } from "@chakra-ui/react";

export default function ProblemCardHeader({
  problem,
  session,
}: {
  problem: WhatToDiscardProblem;
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

      {isOpen && <UserModal userId={problem.user.id} isOpen={isOpen} onClose={onClose} />}
    </Flex>
  );
}
