"use client";

import { MyVoteContext } from "@/src/features/what-to-discard-problems/context-providers/contexts/MyVoteContext";
import { ProblemVote } from "@/types/ApiData";
import { ReactNode, useState } from "react";

export default function MyVotedTileContextProvider({
  children,
  initialMyVote,
}: {
  children: ReactNode;
  initialMyVote: ProblemVote | null;
}) {
  const [myVote, setMyVote] = useState<ProblemVote | null>(initialMyVote);

  return <MyVoteContext.Provider value={{ myVote, setMyVote }}>{children}</MyVoteContext.Provider>;
}
