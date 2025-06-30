"use client";

import { useEffect, useState } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import ParentCommentCard from "@/src/features/what-to-discard-problems/components/ParentCommentCard";
import CommentForm from "@/src/features/what-to-discard-problems/components/CommentForm";
import ReplyContextProvider from "@/src/features/what-to-discard-problems/context-providers/providers/ReplyToCommentContextProvider";
import { schemas } from "@/src/zodios/api";
import { z } from "zod";
import { apiClient } from "@/config/apiConfig";

export default function CommentList({ problemId }: { problemId: number }) {
  const [parentComments, setParentComments] = useState<z.infer<typeof schemas.Comment>[] | null>(
    null,
  );
  const [canFetch, setCanFetch] = useState(true);

  useEffect(() => {
    if (!canFetch) return;
    setCanFetch(false);

    const fetchComments = async () => {
      const response = await apiClient.getComments({
        params: {
          what_to_discard_problem_id: String(problemId),
        },
      });

      const data = response.what_to_discard_problem_comments;

      setParentComments(data);
    };

    fetchComments();
  }, [canFetch]);

  return (
    <Box minH={30}>
      <ReplyContextProvider>
        {parentComments?.length ? (
          <VStack className="divide-y" gap="4">
            {parentComments.map((comment, index) => {
              return <ParentCommentCard comment={comment} key={index} />;
            })}
          </VStack>
        ) : (
          <Text textAlign="center" fontSize="lg" fontWeight="bold">
            コメントはまだありません
          </Text>
        )}

        <CommentForm setParentComments={setParentComments} problemId={problemId} />
      </ReplyContextProvider>
    </Box>
  );
}
