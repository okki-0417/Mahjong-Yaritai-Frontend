import { useEffect, useState } from "react";
import { apiClient } from "../../ApiConfig";
import WhatToDiscardProblemParentCommentCard from "./WhatToDiscardProblemParentCommentCard";
import WhatToDiscardProblemCommentForm from "./WhatToDiscardProblemCommentForm";

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
        console.error(error);
      }
    };

    fetchWhatToDiscardProblemsComments();
  }, []);

  return (
    <div>
      {!whatToDiscardProblemComments.length ? (
        <div className="text-center text-lg font-bold">
          コメントはまだありません
        </div>
      ) : (
        whatToDiscardProblemComments.map((comment, index) => {
          return (
            <WhatToDiscardProblemParentCommentCard
              comment={comment}
              key={index}
            />
          );
        })
      )}

      <WhatToDiscardProblemCommentForm problemId={problemId} />
    </div>
  );
}
