"use client";

import { FaRegComment } from "react-icons/fa";
import PopButton from "@/src/components/PopButton";
import { HStack, Text, useDisclosure } from "@chakra-ui/react";
import CommentsModal from "@/src/features/what-to-discard-problems/components/comments/CommentsModal";
import { z } from "zod";
import { schemas } from "@/src/zodios/api";
import { apiClient } from "@/src/lib/api/client";
import { Fragment, useState } from "react";

export default function ProblemCommentSection({
  problem,
}: {
  problem: z.infer<typeof schemas.WhatToDiscardProblem>;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [parentComments, setParentComments] = useState<z.infer<typeof schemas.Comment>[] | null>(
    null,
  );

  const handleOpenModal = async () => {
    const response = await apiClient.getComments({
      params: {
        what_to_discard_problem_id: String(problem.id),
      },
    });

    setParentComments(response.what_to_discard_problem_comments);
    onOpen();
  };

  return (
    <Fragment>
      <PopButton onClick={handleOpenModal}>
        <HStack>
          <FaRegComment color="#333" size={24} />
          <Text fontFamily="sans-serif" fontWeight="bold">
            {parentComments?.length || problem.comments_count}
          </Text>
        </HStack>
      </PopButton>

      <CommentsModal
        isOpen={isOpen}
        onClose={onClose}
        problemId={problem.id}
        parentComments={parentComments}
        setParentComments={setParentComments}
      />
    </Fragment>
  );
}
