"use client";

import { VotesCountContext } from "@/src/features/what-to-discard-problems/context-providers/contexts/VotesCountContext";
import { ReactNode, useState } from "react";

export default function VotesCountContextProvider({
  children,
  initialVotesCount,
}: {
  children: ReactNode;
  initialVotesCount: number;
}) {
  const [votesCount, setVotesCount] = useState(initialVotesCount);

  return (
    <VotesCountContext.Provider value={{ votesCount, setVotesCount }}>
      {children}
    </VotesCountContext.Provider>
  );
}
