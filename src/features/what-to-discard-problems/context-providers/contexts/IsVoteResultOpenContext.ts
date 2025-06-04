import { createContext } from "react";

type IsVoteResultOpenContext = {
  isVoteResultOpen: boolean;
  setIsVoteResultOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const IsVoteResultOpenContext = createContext<IsVoteResultOpenContext>({
  isVoteResultOpen: false,
  setIsVoteResultOpen: () => {},
});
