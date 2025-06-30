"use client";

import ReplyContext from "@/src/features/what-to-discard-problems/context-providers/contexts/ReplyContext";
import { schemas } from "@/src/zodios/api";
import { ReactNode, useState } from "react";
import { z } from "zod";

export default function ReplyContextProvider({ children }: { children: ReactNode }) {
  const [replyToComment, setReplyToComment] = useState(null);
  const [setRepliesFromContext, setSetRepliesFromContext] = useState<
    React.Dispatch<React.SetStateAction<z.infer<typeof schemas.Comment>[] | null>>
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
