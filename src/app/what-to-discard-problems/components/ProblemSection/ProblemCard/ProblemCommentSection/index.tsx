"use client";

import { FaRegComment } from "react-icons/fa";
import PopButton from "@/src/components/PopButton";
import { HStack, Spinner, Text, useDisclosure, useToast } from "@chakra-ui/react";
import CommentsModal from "@/src/app/what-to-discard-problems/components/ProblemSection/ProblemCard/ProblemCommentSection/CommentsModal";
import { Comment, ParentCommentsDocument } from "@/src/generated/graphql";
import { Fragment, useState } from "react";
import { useQuery } from "@apollo/client/react";

type Props = {
  initialCommentsCount: number;
  problemId: string;
};

export default function ProblemCommentSection({ problemId, initialCommentsCount }: Props) {
  const [parentComments, setParentComments] = useState<Comment[]>([]);
  const [replyingToComment, setReplyingToComment] = useState<Comment | null>(null);

  const toast = useToast();
  const {
    isOpen: isCommentModalOpen,
    onOpen: onCommentModalOpen,
    onClose: onCommentModalClose,
  } = useDisclosure();

  const onReply = (comment: Comment) => setReplyingToComment(comment);
  const onReplyCancel = () => setReplyingToComment(null);
  const onCommentCreate = () => setReplyingToComment(null);

  const {
    data: commentsData,
    error: commentsError,
    loading: commentsLoading,
  } = useQuery(ParentCommentsDocument, {
    variables: { whatToDiscardProblemId: problemId },
  });

  const handleModalOpen = () => {
    if (commentsLoading) return;

    if (commentsError) {
      toast({
        status: "error",
        title: "コメントを取得できませんでした",
        description: commentsError.message,
      });
    } else if (commentsData?.comments) {
      setParentComments(commentsData.comments.edges.map(edge => edge.node));
      onCommentModalOpen();
    }
  };

  return (
    <Fragment>
      <PopButton onClick={handleModalOpen}>
        <HStack>
          {commentsLoading ? <Spinner size="sm" /> : <FaRegComment color="#333" size={24} />}
          <Text fontFamily="sans-serif" fontWeight="bold">
            {parentComments.length || initialCommentsCount}
          </Text>
        </HStack>
      </PopButton>

      <CommentsModal
        isOpen={isCommentModalOpen}
        onClose={onCommentModalClose}
        parentComments={parentComments}
        problemId={problemId}
        onReply={onReply}
        replyingToComment={replyingToComment}
        onReplyCancel={onReplyCancel}
        onCommentCreate={onCommentCreate}
      />
    </Fragment>
  );
}
