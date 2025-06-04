"use client";

import { CommentsCountContext } from "@/src/features/what-to-discard-problems/context-providers/contexts/CommentsCountContext";
import { ReactNode, useState } from "react";

export default function CommentsCountContextProvider({
  children,
  initialCommentsCount,
}: {
  children: ReactNode;
  initialCommentsCount: number;
}) {
  const [commentsCount, setCommentsCount] = useState(initialCommentsCount);

  return (
    <CommentsCountContext.Provider value={{ commentsCount, setCommentsCount }}>
      {children}
    </CommentsCountContext.Provider>
  );
}
