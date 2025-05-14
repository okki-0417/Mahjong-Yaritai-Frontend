import { useEffect } from "react";
import { MdHowToVote } from "react-icons/md";
import { apiClient } from "../../ApiConfig";

export type MyVoteType = {
  id: number | null;
  tile_id: number | null;
};

export default function WhatToDiscardProblemVotesCount({
  problemId,
  myVote,
  setMyVote,
  votesCount,
  isVoteResultOpen,
  setIsVoteResultOpen,
}: {
  problemId: number;
  myVote: MyVoteType;
  setMyVote: React.Dispatch<React.SetStateAction<MyVoteType>>;
  votesCount: number;
  isVoteResultOpen: boolean;
  setIsVoteResultOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  useEffect(() => {
    const fetchMyVote = async () => {
      const response = await apiClient.get(
        `/what_to_discard_problems/${problemId}/votes/my_vote`,
      );

      setMyVote(response.data.my_vote);
    };

    fetchMyVote();
  }, []);

  return (
    <button
      onClick={() => {
        setIsVoteResultOpen(!isVoteResultOpen);
      }}
    >
      <div className="flex items-center gap-1">
        {isMyVoteEmpty(myVote) ? (
          <MdHowToVote color="#333" size={26} />
        ) : (
          <MdHowToVote color="#0080ff" size={26} />
        )}
        <div className="font-bold font-sans lg:text-lg">{votesCount}</div>
      </div>
    </button>
  );
}

export const isMyVoteEmpty = (myVote: MyVoteType) => {
  return Object.values(myVote).every((value) => !value);
};
