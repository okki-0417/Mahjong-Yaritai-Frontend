"use client";

import { FaRegComment } from "react-icons/fa";
import PopButton from "@/src/components/PopButton";
import { HStack, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import CommentsModal from "@/src/app/what-to-discard-problems/components/comments/CommentsModal";
import { WhatToDiscardProblem, Comment } from "@/src/generated/graphql";
import { Fragment, useState } from "react";
import useErrorToast from "@/src/hooks/useErrorToast";
import { useQuery } from "@apollo/client/react";
import { WhatToDiscardProblemDetailDocument } from "@/src/generated/graphql";

export default function ProblemCommentSection({ problem }: { problem: WhatToDiscardProblem }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [parentComments, setParentComments] = useState<Comment[] | null>(null);
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
        // 親コメントのみをフィルタリング
        const filteredParentComments = data.whatToDiscardProblem.comments
          .filter(comment => !(comment as any).parentCommentId)
          .map(comment => ({
            ...comment,
            replies: [],
            updatedAt: comment.createdAt,
            userId: comment.user.id,
            user: {
              ...comment.user,
              createdAt: comment.createdAt,
              updatedAt: comment.createdAt,
              followersCount: 0,
              followingCount: 0,
              isFollowing: false,
            },
          }));

        setParentComments(filteredParentComments);
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
            {parentComments?.length || problem.commentsCount}
          </Text>
        </HStack>
      </PopButton>

      <CommentsModal
        isOpen={isOpen}
        onClose={onClose}
        problemId={Number(problem.id)}
        parentComments={parentComments}
        setParentComments={setParentComments}
      />
    </Fragment>
  );
}
