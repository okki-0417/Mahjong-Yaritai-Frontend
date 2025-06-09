"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/src/lib/apiClients/ApiClients";
import axios from "axios";
import { Box, Center, Spinner } from "@chakra-ui/react";
import ParentCommentCard from "@/src/features/what-to-discard-problems/components/ParentCommentCard";

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

export default function CommentList({
  problemId,
  handleReplyClick,
  whatToDiscardProblemComments,
  setWhatToDiscardProblemComments,
}: {
  problemId: number;
  handleReplyClick: (commentId: string) => void;
  whatToDiscardProblemComments: WhatToDiscardProblemParentComment[];
  setWhatToDiscardProblemComments: React.Dispatch<
    React.SetStateAction<WhatToDiscardProblemParentComment[]>
  >;
}) {
  const [canFetch, setCanFetch] = useState(true);

  useEffect(() => {
    if (!canFetch) {
      return;
    }
    setCanFetch(false);

    const fetchWhatToDiscardProblemsComments = async () => {
      try {
        const response = await apiClient.get(`/what_to_discard_problems/${problemId}/comments`);

        const comments = response.data.what_to_discard_problem_comments;

        setWhatToDiscardProblemComments(comments);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(error.status);
          console.error(error.message);
        }
      }
    };

    fetchWhatToDiscardProblemsComments();
  }, [canFetch, problemId, setWhatToDiscardProblemComments]);

  return (
    <Box>
      {!whatToDiscardProblemComments && (
        <Center>
          <Spinner color="black" size="xl" />
        </Center>
      )}
      {whatToDiscardProblemComments && !whatToDiscardProblemComments?.length && (
        <div className="text-center text-lg font-bold">コメントはまだありません</div>
      )}
      {whatToDiscardProblemComments?.length &&
        whatToDiscardProblemComments.map((comment, index) => {
          return (
            <ParentCommentCard handleReplyClick={handleReplyClick} comment={comment} key={index} />
          );
        })}
    </Box>
  );
}
