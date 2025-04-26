import { MdHowToVote } from "react-icons/md";
import { MyVoteType } from "./WhatToDiscardProblemCard";

export default function WhatToDiscardProblemVotesCount({
  votesCount,
  myVote,
  isVoteResultOpen,
  setIsVoteResultOpen,
}: {
  votesCount: number;
  myVote: MyVoteType | null;
  isVoteResultOpen: boolean;
  setIsVoteResultOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <button
      onClick={() => {
        setIsVoteResultOpen(!isVoteResultOpen);
      }}
    >
      <div className="flex items-center gap-1">
        {myVote && !isMyVoteEmpty(myVote) ? (
          <MdHowToVote color="#0080ff" size={26} />
        ) : (
          <MdHowToVote color="#333" size={26} />
        )}
        <div className="font-sans lg:text-lg">{votesCount}</div>
      </div>
    </button>
  );
}

export const isMyVoteEmpty = (myVote: MyVoteType | null) => {
  if (!myVote) return true;

  return Object.values(myVote).every((value) => !value);
};
