"use client";

import { IsVoteResultOpenContext } from "@/src/features/what-to-discard-problems/context-providers/contexts/IsVoteResultOpenContext";
import { ReactNode, useState } from "react";

export default function IsVoteResultOpenContextProvider({ children }: { children: ReactNode }) {
  const [isVoteResultOpen, setIsVoteResultOpen] = useState(false);

  return (
    <IsVoteResultOpenContext.Provider value={{ isVoteResultOpen, setIsVoteResultOpen }}>
      {children}
    </IsVoteResultOpenContext.Provider>
  );
}
