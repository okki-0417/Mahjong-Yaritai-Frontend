"use client";

import { Comment } from "@/src/generated/graphql";
import { Button, Text, useToast } from "@chakra-ui/react";
import { useLazyQuery } from "@apollo/client/react";
import { CommentRepliesDocument } from "@/src/generated/graphql";
import { MdOutlineInsertComment } from "react-icons/md";

type Props = {
  parentComment: Comment;
  commentableType: string;
  commentableId: string;
  /* eslint-disable-next-line no-unused-vars */
  onRepliesFetched: (replies: Comment[]) => void;
};

export default function FetchRepliesButton({
  parentComment,
  commentableType,
  commentableId,
  onRepliesFetched,
}: Props) {
  const [fetchReplies, { loading }] = useLazyQuery(CommentRepliesDocument);

  const toast = useToast();

  const handleFetchReplies = async () => {
    if (loading) return;

    const result = await fetchReplies({
      variables: {
        commentableType,
        commentableId,
        parentCommentId: parentComment.id,
      },
    });

    if (result.error) {
      toast({
        status: "error",
        title: "返信を取得できませんでした",
        description: result.error.message,
      });
      return;
    }

    if (result.data?.replies) {
      onRepliesFetched(result.data.replies.edges.map(edge => edge.node));
    }
  };

  return (
    <Button
      className="text-primary"
      onClick={handleFetchReplies}
      isLoading={loading}
      size="sm"
      disabled={parentComment.repliesCount == 0}>
      <MdOutlineInsertComment />
      <Text fontSize="xs" className="text-secondary">
        {parentComment.repliesCount}件の返信
      </Text>
    </Button>
  );
}
