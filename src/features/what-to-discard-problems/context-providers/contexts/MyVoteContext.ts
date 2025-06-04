import { ProblemVote } from "@/src/types/ApiData";
import { createContext } from "react";

type MyVotedTileContext = {
  myVote: ProblemVote | null;
  setMyVote: React.Dispatch<React.SetStateAction<ProblemVote | null>>;
};

export const MyVoteContext = createContext<MyVotedTileContext>({
  myVote: null,
  setMyVote: () => {},
});
