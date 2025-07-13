import { apiClient } from "@/src/lib/apiClients/ApiClient";
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
  const [isLoading, setIsLoading] = useState(false);
  const errorToast = useErrorToast();

  const fetchReplies = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await apiClient.getWhatToDiscardProblemCommentReplies({
        params: {
          what_to_discard_problem_id: String(comment.commentable_id),
          comment_id: String(comment.id),
        },
      });

      setReplies(response.what_to_discard_problem_comment_replies);
    } catch (error) {
      errorToast({ error, title: "返信の取得に失敗しました" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex justifyContent="end">
      <Button
        h="fit-content"
        py="2"
        className="text-primary"
        size="xs"
        onClick={fetchReplies}
        isLoading={isLoading}>
        返信を見る
      </Button>
    </Flex>
  );
}
