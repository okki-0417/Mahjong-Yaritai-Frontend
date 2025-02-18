import { useEffect, useState } from "react";
import { BASEURL } from "../../ApiConfig";
import WhatToDiscardProblemParentCommentCard from "./WhatToDiscardProblemParentCommentCard";

export type WhatToDiscardProblemParentComment = {
  id: string;
  content: string;
  created_at: string;

  user: {
    id: number;
    name: string;
  }

  replies: {
    id: number;
    content: string;
    created_at: string;
    user: {
      id: number;
      name: string;
    }
  }[]
};

export default function WhatToDiscardProblemCommentList({problemId}: {problemId: number}) {
  const [whatToDiscardProblemComments, setWhatToDiscardProblemComments] = useState<WhatToDiscardProblemParentComment[]>([]);

  useEffect(() => {
    const fetchWhatToDiscardProblemsComments = async () => {
      try {
        const response = await fetch(`${BASEURL}/what_to_discard_problems/${problemId}/comments`);
        const data = await response.json();

        setWhatToDiscardProblemComments(data.what_to_discard_problem_comments);
      }
      catch (error) {
        console.error(error);
      }
    }

    fetchWhatToDiscardProblemsComments();
  }, [])

  return (
    <div>
      {whatToDiscardProblemComments.map((comment, index) => {
        return (
          <WhatToDiscardProblemParentCommentCard comment={comment} key={index} />
        )
      })}
    </div>
  )
}
