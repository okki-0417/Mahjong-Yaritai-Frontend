import { apiClient } from "@/config/apiConfig";
import useErrorToast from "@/src/hooks/useErrorToast";
import { schemas } from "@/src/zodios/api";
import { Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { z } from "zod";

export default function FetchRepliesButton({
  setReplies,
  comment,
}: {
  setReplies: React.Dispatch<React.SetStateAction<z.infer<typeof schemas.Comment>[]>>;
  comment: z.infer<typeof schemas.Comment>;
}) {
  const [fetching, setFetching] = useState(false);

  const errorToast = useErrorToast();

  const fetchReplies = async () => {
    if (fetching) return;
    setFetching(true);

    try {
      const response = await apiClient.getWhatToDiscardProblemCommentReplies({
        params: {
          what_to_discard_problem_id: String(comment.commentable_id),
          comment_id: String(comment.id),
        },
      });

      const data = response.what_to_discard_problem_comment_replies;

      setReplies(data);
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
