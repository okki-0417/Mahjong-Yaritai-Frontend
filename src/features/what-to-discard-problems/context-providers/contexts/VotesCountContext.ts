import { createContext } from "react";

type VotesCountContext = {
  votesCount: number;
  setVotesCount: React.Dispatch<React.SetStateAction<number>>;
};

export const VotesCountContext = createContext<VotesCountContext>({
  votesCount: 0,
  setVotesCount: () => {},
});
