import useErrorToast from "@/src/hooks/useErrorToast";
import { schemas } from "@/src/zodios/api";
import { Button, Flex } from "@chakra-ui/react";
import { z } from "zod";
import { useLazyQuery } from "@apollo/client/react";
import { CommentRepliesDocument } from "@/src/generated/graphql";

export default function FetchRepliesButton({
  setReplies,
  comment,
}: {
  setReplies: React.Dispatch<React.SetStateAction<z.infer<typeof schemas.Comment>[]>>;
  comment: z.infer<typeof schemas.Comment>;
}) {
  const errorToast = useErrorToast();

  const [fetchReplies, { loading }] = useLazyQuery(CommentRepliesDocument);

  const handleFetchReplies = async () => {
    if (loading) return;

    try {
      const { data } = await fetchReplies({
        variables: {
          problemId: String(comment.commentable_id),
          commentId: String(comment.id),
        },
      });

      if (data?.whatToDiscardProblem?.comments) {
        // GraphQLデータをREST APIフォーマットに変換
        const restFormatReplies: z.infer<typeof schemas.Comment>[] =
          data.whatToDiscardProblem.comments.map((reply: any) => ({
            id: Number(reply.id),
            content: reply.content,
            user_id: Number(reply.user.id),
            parent_comment_id: comment.id,
            replies_count: reply.repliesCount,
            created_at: reply.createdAt,
            commentable_id: comment.commentable_id,
            commentable_type: "WhatToDiscardProblem",
            user: {
              id: Number(reply.user.id),
              name: reply.user.name,
              avatar_url: reply.user.avatarUrl || null,
            },
          }));

        setReplies(restFormatReplies);
      }
    } catch (error) {
      errorToast({ error, title: "返信の取得に失敗しました" });
    }
  };

  return (
    <Flex justifyContent="end">
      <Button
        h="fit-content"
        py="2"
        className="text-primary"
        size="xs"
        onClick={handleFetchReplies}
        isLoading={loading}>
        返信を見る
      </Button>
    </Flex>
  );
}
