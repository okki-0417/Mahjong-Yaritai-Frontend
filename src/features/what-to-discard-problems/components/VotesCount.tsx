"use client";

import { useContext } from "react";
import { MdHowToVote } from "react-icons/md";
import { Tile } from "@/src/types/ApiData";
import { IsVoteResultOpenContext } from "@/src/features/what-to-discard-problems/context-providers/contexts/IsVoteResultOpenContext";
import { MyVoteContext } from "@/src/features/what-to-discard-problems/context-providers/contexts/MyVoteContext";
import { VotesCountContext } from "@/src/features/what-to-discard-problems/context-providers/contexts/VotesCountContext";

export type MyVoteType = Tile | null;

export default function VotesCount() {
  const { isVoteResultOpen, setIsVoteResultOpen } = useContext(
    IsVoteResultOpenContext,
  );
  const { myVote } = useContext(MyVoteContext);

  const { votesCount } = useContext(VotesCountContext);

  return (
    <button
      onClick={() => {
        setIsVoteResultOpen(!isVoteResultOpen);
      }}
    >
      <div className="flex items-center gap-1">
        {myVote ? (
          <MdHowToVote color="#0080ff" size={26} />
        ) : (
          <MdHowToVote color="#333" size={26} />
        )}
        <div className="font-bold font-sans lg:text-lg">{votesCount}</div>
      </div>
    </button>
  );
}
