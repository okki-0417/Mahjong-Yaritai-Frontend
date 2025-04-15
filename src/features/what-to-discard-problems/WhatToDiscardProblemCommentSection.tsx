import { useRef } from "react";
import WhatToDiscardProblemCommentForm from "./WhatToDiscardProblemCommentForm";
import WhatToDiscardProblemCommentList from "./WhatToDiscardProblemCommentList";
import { useForm } from "react-hook-form";
import {
  whatToDiscardProblemCommentSchema,
  WhatToDiscardProblemCommentSchemaType,
} from "../../schemas/WhatToDiscardProblemCommentSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function WhatToDiscardProblemCommentSection({
  problemId,
}: {
  problemId: number;
}) {
  const CommentContentRef = useRef<HTMLTextAreaElement | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<WhatToDiscardProblemCommentSchemaType>({
    resolver: zodResolver(whatToDiscardProblemCommentSchema),
  });

  const handleReplyClick = (commentId: string) => {
    if (!CommentContentRef.current) return;

    CommentContentRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    CommentContentRef.current.focus();

    setValue("parent_comment_id", commentId);
  };

  return (
    <>
      <WhatToDiscardProblemCommentList
        problemId={problemId}
        onReply={handleReplyClick}
      />

      <WhatToDiscardProblemCommentForm
        problemId={problemId}
        CommentContentRef={CommentContentRef}
        form={{ register, handleSubmit, errors, watch }}
      />
    </>
  );
}
