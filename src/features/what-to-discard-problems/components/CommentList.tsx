"use client";

import { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import ParentCommentCard from "@/src/features/what-to-discard-problems/components/ParentCommentCard";
import { Comment, Configuration, WhatToDiscardProblemCommentApi } from "@/api-client";
import { API_BASE_URL } from "@/config/apiConfig";
import CommentForm from "@/src/features/what-to-discard-problems/components/CommentForm";
import ReplyContextProvider from "@/src/features/what-to-discard-problems/context-providers/providers/ReplyToCommentContextProvider";

export type WhatToDiscardProblemParentComment = {
  id: number;
  content: string;
  created_at: string;

  user: {
    id: number;
    name: string;
  };

  replies: {
    id: number;
    content: string;
    created_at: string;
    user: {
      id: number;
      name: string;
    };
  }[];
};

const apiClient = new WhatToDiscardProblemCommentApi(
  new Configuration({
    basePath: API_BASE_URL,
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  }),
);

export default function CommentList({ problemId }: { problemId: number }) {
  const [parentComments, setParentComments] = useState<Comment[] | null>(null);
  const [canFetch, setCanFetch] = useState(true);

  useEffect(() => {
    if (!canFetch) return;
    setCanFetch(false);

    const fetchComments = async () => {
      const response = await apiClient.getComments({ whatToDiscardProblemId: String(problemId) });

      setParentComments(response.comments);
    };

    fetchComments();
  }, [canFetch]);

  return (
    <Box minH={30}>
      <ReplyContextProvider>
        {parentComments?.length ? (
          parentComments.map((comment, index) => {
            return <ParentCommentCard comment={comment} key={index} />;
          })
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
