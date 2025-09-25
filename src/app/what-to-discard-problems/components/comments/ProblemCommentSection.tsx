"use client";

import { FaRegComment } from "react-icons/fa";
import PopButton from "@/src/components/PopButton";
import { HStack, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import CommentsModal from "@/src/app/what-to-discard-problems/components/comments/CommentsModal";
import { z } from "zod";
import { schemas } from "@/src/zodios/api";
import { Fragment, useState } from "react";
import useErrorToast from "@/src/hooks/useErrorToast";
import { useQuery } from "@apollo/client/react";
import { WhatToDiscardProblemDetailDocument } from "@/src/generated/graphql";

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

  const { refetch } = useQuery(WhatToDiscardProblemDetailDocument, {
    variables: { id: String(problem.id) },
    skip: true,
  });

  const handleOpenModal = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const { data } = await refetch();

      if (data?.whatToDiscardProblem?.comments) {
        // GraphQLデータをREST APIフォーマットに変換
        const restComments: z.infer<typeof schemas.Comment>[] =
          data.whatToDiscardProblem.comments.map((comment: any) => ({
            id: Number(comment.id),
            content: comment.content,
            user_id: Number(comment.user.id),
            parent_comment_id: comment.parentCommentId ? Number(comment.parentCommentId) : null,
            replies_count: comment.repliesCount,
            created_at: comment.createdAt,
            commentable_id: Number(problem.id),
            commentable_type: "WhatToDiscardProblem",
            user: {
              id: Number(comment.user.id),
              name: comment.user.name,
              avatar_url: comment.user.avatarUrl || null,
            },
          }));

        setParentComments(restComments);
        onOpen();
      }
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
