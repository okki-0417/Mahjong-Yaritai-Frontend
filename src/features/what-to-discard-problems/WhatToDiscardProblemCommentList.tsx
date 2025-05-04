import { useEffect, useState } from "react";
import { apiClient } from "../../ApiConfig";
import WhatToDiscardProblemParentCommentCard from "./WhatToDiscardProblemParentCommentCard";
import axios from "axios";
import { Box, Center, Spinner } from "@chakra-ui/react";

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

export default function WhatToDiscardProblemCommentList({
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchWhatToDiscardProblemsComments = async () => {
      setIsLoading(true);
      try {
        const response = await apiClient.get(
          `/what_to_discard_problems/${problemId}/comments`
        );

        const comments = response.data.what_to_discard_problem_comments;

        setWhatToDiscardProblemComments(comments);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(error.status);
          console.error(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchWhatToDiscardProblemsComments();
  }, []);

  return (
    <Box>
      {isLoading ? (
        <Center>
          <Spinner color="black" size="xl" />
        </Center>
      ) : !whatToDiscardProblemComments.length ? (
        <div className="text-center text-lg font-bold">
          コメントはまだありません
        </div>
      ) : (
        whatToDiscardProblemComments.map((comment, index) => {
          return (
            <WhatToDiscardProblemParentCommentCard
              handleReplyClick={handleReplyClick}
              comment={comment}
              key={index}
            />
          );
        })
      )}
    </Box>
  );
}
