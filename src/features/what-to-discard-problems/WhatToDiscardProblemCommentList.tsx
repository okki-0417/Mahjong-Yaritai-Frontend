import { useEffect, useState } from "react";
import { apiClient } from "../../ApiConfig";
import WhatToDiscardProblemParentCommentCard from "./WhatToDiscardProblemParentCommentCard";
import axios from "axios";

export type WhatToDiscardProblemParentComment = {
  id: string;
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

export default function WhatToDiscardProblemCommentList({
  problemId,
}: {
  problemId: number;
}) {
  const [whatToDiscardProblemComments, setWhatToDiscardProblemComments] =
    useState<WhatToDiscardProblemParentComment[]>([]);

  useEffect(() => {
    const fetchWhatToDiscardProblemsComments = async () => {
      try {
        const response = await apiClient.get(
          `/what_to_discard_problems/${problemId}/comments`
        );

        const comments = response.data.what_to_discard_problem_comments;

        setWhatToDiscardProblemComments(comments);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(error.response?.status);
          console.error(error.message);
        }
      }
    };

    fetchWhatToDiscardProblemsComments();
  }, []);

  return (
    <div>
      {whatToDiscardProblemComments.map((comment, index) => {
        return (
          <WhatToDiscardProblemParentCommentCard
            comment={comment}
            key={index}
          />
        );
      })}
    </div>
  );
}
