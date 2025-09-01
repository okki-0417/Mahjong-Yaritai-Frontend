"use client";

import { FaRegComment } from "react-icons/fa";
import PopButton from "@/src/components/PopButton";
import { HStack, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import CommentsModal from "@/src/features/what-to-discard-problems/components/comments/CommentsModal";
import { z } from "zod";
import { schemas } from "@/src/zodios/api";
import { apiClient } from "@/src/lib/api/client";
import { Fragment, useState } from "react";
import useErrorToast from "@/src/hooks/useErrorToast";

export default function ProblemCommentSection({
  problem,
}: {
  problem: z.infer<typeof schemas.WhatToDiscardProblem>;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [parentComments, setParentComments] = useState<z.infer<typeof schemas.Comment>[] | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const errorToast = useErrorToast();

  const handleOpenModal = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await apiClient.getComments({
        params: {
          what_to_discard_problem_id: String(problem.id),
        },
      });

      setParentComments(response.what_to_discard_problem_comments);
      onOpen();
    } catch (error) {
      errorToast({ error, title: "コメントを取得できませんでした" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <PopButton onClick={handleOpenModal}>
        <HStack>
          {isLoading ? <Spinner size="sm" /> : <FaRegComment color="#333" size={24} />}
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
