"use client";

import { IsCommentSectionOpenContext } from "@/src/features/what-to-discard-problems/context-providers/contexts/IsCommentSectionOpenContext";
import { ReactNode, useState } from "react";

export default function IsCommentSectionOpenContextProvider({ children }: { children: ReactNode }) {
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(false);

  return (
    <IsCommentSectionOpenContext.Provider value={{ isCommentSectionOpen, setIsCommentSectionOpen }}>
      {children}
    </IsCommentSectionOpenContext.Provider>
  );
}
