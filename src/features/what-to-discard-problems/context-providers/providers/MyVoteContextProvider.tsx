"use client";

import { MyVoteContext } from "@/src/features/what-to-discard-problems/context-providers/contexts/MyVoteContext";
import { schemas } from "@/src/zodios/api";
import { ReactNode, useState } from "react";
import { z } from "zod";

export default function MyVotedTileContextProvider({
  children,
  initialMyVote,
}: {
  children: ReactNode;
  initialMyVote: z.infer<typeof schemas.WhatToDiscardProblemVote> | null;
}) {
  const [myVote, setMyVote] = useState<z.infer<typeof schemas.WhatToDiscardProblemVote> | null>(
    initialMyVote,
  );

  return <MyVoteContext.Provider value={{ myVote, setMyVote }}>{children}</MyVoteContext.Provider>;
}
