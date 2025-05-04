import { useRef, useState } from "react";
import WhatToDiscardProblemCommentForm from "./WhatToDiscardProblemCommentForm";
import WhatToDiscardProblemCommentList, {
  WhatToDiscardProblemParentComment,
} from "./WhatToDiscardProblemCommentList";
import { useForm } from "react-hook-form";
import {
  whatToDiscardProblemCommentSchema,
  WhatToDiscardProblemCommentSchemaType,
} from "../../schemas/WhatToDiscardProblemCommentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@chakra-ui/react";

export type CommentType = {
  content: string;
  parent_comment_id?: string | undefined;
};

export default function WhatToDiscardProblemCommentSection({
  problemId,
  setCommentsCount,
}: {
  problemId: number;
  setCommentsCount: React.Dispatch<React.SetStateAction<number>>;
}) {
  const CommentContentRef = useRef<HTMLTextAreaElement | null>(null);
  const [whatToDiscardProblemComments, setWhatToDiscardProblemComments] =
    useState<WhatToDiscardProblemParentComment[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    resetField,
    formState: { errors },
  } = useForm<WhatToDiscardProblemCommentSchemaType>({
    resolver: zodResolver(whatToDiscardProblemCommentSchema),
  });

  const handleReplyClick = (commentId: string) => {
    if (!CommentContentRef.current) return;

    CommentContentRef.current.scrollIntoView({
      block: "center",
    });
    CommentContentRef.current.focus();

    setValue("parent_comment_id", commentId);
  };

  return (
    <div>
      <Box>
        <WhatToDiscardProblemCommentList
          whatToDiscardProblemComments={whatToDiscardProblemComments}
          setWhatToDiscardProblemComments={setWhatToDiscardProblemComments}
          problemId={problemId}
          handleReplyClick={handleReplyClick}
        />

        <WhatToDiscardProblemCommentForm
          problemId={problemId}
          setWhatToDiscardProblemComments={setWhatToDiscardProblemComments}
          CommentContentRef={CommentContentRef}
          form={{ register, handleSubmit, errors, resetField }}
          setCommentsCount={setCommentsCount}
        />
      </Box>
    </div>
  );
}
