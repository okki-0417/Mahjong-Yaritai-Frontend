import { schemas } from "@/src/zodios/api";
import { createContext } from "react";
import { z } from "zod";

type MyVotedTileContext = {
  myVote: z.infer<typeof schemas.WhatToDiscardProblemVote> | null;
  setMyVote: React.Dispatch<
    React.SetStateAction<z.infer<typeof schemas.WhatToDiscardProblemVote> | null>
  >;
};

export const MyVoteContext = createContext<MyVotedTileContext>({
  myVote: null,
  setMyVote: () => {},
});
