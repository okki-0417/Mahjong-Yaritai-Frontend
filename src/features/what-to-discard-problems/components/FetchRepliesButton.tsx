import { Comment, WhatToDiscardProblemCommentReplyApi } from "@/api-client";
import { apiConfig } from "@/config/apiConfig";
import useErrorToast from "@/src/hooks/useErrorToast";
import { Button, Flex } from "@chakra-ui/react";
import { useState } from "react";

const apiClient = new WhatToDiscardProblemCommentReplyApi(apiConfig);

export default function FetchRepliesButton({
  setReplies,
  comment,
}: {
  setReplies: React.Dispatch<React.SetStateAction<Comment[]>>;
  comment: Comment;
}) {
  const [fetching, setFetching] = useState(false);

  const errorToast = useErrorToast();

  const fetchReplies = async () => {
    if (fetching) return;
    setFetching(true);

    try {
      const response = await apiClient.getReplies({
        whatToDiscardProblemId: String(comment.commentableId),
        commentId: String(comment.id),
      });

      setReplies(response.comments);
    } catch (error) {
      errorToast({
        error,
        title: "返信の取得に失敗しました",
      });
    } finally {
      setFetching(false);
    }
  };

  return (
    <Flex justifyContent="end">
      <Button
        colorScheme=""
        h="fit-content"
        py="2"
        color="#365158"
        fontSize="sm"
        _hover={{ bgColor: "gray.200" }}
        onClick={fetchReplies}>
        返信を見る
      </Button>
    </Flex>
  );
}
