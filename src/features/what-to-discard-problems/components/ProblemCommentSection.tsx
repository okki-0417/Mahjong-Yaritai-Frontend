"use client";

import { FaRegComment } from "react-icons/fa";
import PopButton from "@/src/components/PopButton";
import { HStack, Text, useDisclosure } from "@chakra-ui/react";
import CommentsModal from "@/src/features/what-to-discard-problems/components/CommentsModal";
import { z } from "zod";
import { schemas } from "@/src/zodios/api";

export default function ProblemCommentSection({
  problem,
}: {
  problem: z.infer<typeof schemas.WhatToDiscardProblem>;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <PopButton onClick={() => onOpen()}>
        <HStack>
          <FaRegComment color="#333" size={24} />
          <Text fontFamily="sans-serif" fontWeight="bold">
            {problem.comments_count}
          </Text>
        </HStack>
      </PopButton>

      <CommentsModal isOpen={isOpen} onClose={onClose} problemId={problem.id} />
    </>
  );
}
