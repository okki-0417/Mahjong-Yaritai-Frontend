"use client";

import { useRef, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@chakra-ui/react";
import CommentList, {
  WhatToDiscardProblemParentComment,
} from "@/src/features/what-to-discard-problems/components/CommentList";
import {
  whatToDiscardProblemCommentSchema,
  WhatToDiscardProblemCommentSchemaType,
} from "@/src/schemas/WhatToDiscardProblemCommentSchema";
import CommentForm from "@/src/features/what-to-discard-problems/components/CommentForm";

export type CommentType = {
  content: string;
  parent_comment_id?: string | undefined;
};

export default function CommentSection({ problemId }: { problemId: number }) {
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
        <CommentList
          whatToDiscardProblemComments={whatToDiscardProblemComments}
          setWhatToDiscardProblemComments={setWhatToDiscardProblemComments}
          problemId={problemId}
          handleReplyClick={handleReplyClick}
        />

        <CommentForm
          problemId={problemId}
          setWhatToDiscardProblemComments={setWhatToDiscardProblemComments}
          CommentContentRef={CommentContentRef}
          form={{ register, handleSubmit, errors, resetField }}
          // setCommentsCount={setCommentsCount}
        />
      </Box>
    </div>
  );
}
