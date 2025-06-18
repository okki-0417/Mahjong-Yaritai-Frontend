"use client";

import { Comment } from "@/api-client";
import ReplyContext from "@/src/features/what-to-discard-problems/context-providers/contexts/ReplyContext";
import { ReactNode, useState } from "react";

export default function ReplyContextProvider({ children }: { children: ReactNode }) {
  const [replyToComment, setReplyToComment] = useState(null);
  const [setRepliesFromContext, setSetRepliesFromContext] = useState<
    React.Dispatch<React.SetStateAction<Comment[] | null>>
  >(() => null);

  return (
    <ReplyContext.Provider
      value={{
        replyToComment,
        setReplyToComment,
        setRepliesFromContext,
        setSetRepliesFromContext,
      }}>
      {children}
    </ReplyContext.Provider>
  );
}
