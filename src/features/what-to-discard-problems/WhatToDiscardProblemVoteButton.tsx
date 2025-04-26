import axios from "axios";
import PopButton from "../../components/PopButton";
import TileImage from "../../components/TileImage";
import { apiClient } from "../../ApiConfig";
import { useSetToast } from "../../hooks/useSetToast";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { useSetModal } from "../../hooks/useSetModal";
import { useState } from "react";
import { VotesType } from "./WhatToDiscardProblemVoteList";
import { MyVoteType } from "./WhatToDiscardProblemCard";
import { isMyVoteEmpty } from "./WhatToDiscardProblemVotesCount";

export default function WhatToDiscardProblemVoteButton({
  problemId,
  tileId,
  myVote,
  setMyVote,
  setVotes,
  setVotesCount,
}: {
  problemId: number;
  tileId: number;
  myVote: MyVoteType | null;
  setMyVote: React.Dispatch<React.SetStateAction<MyVoteType | null>>;
  setVotes: React.Dispatch<React.SetStateAction<VotesType | null>>;
  setVotesCount: React.Dispatch<React.SetStateAction<number>>;
}) {
  const auth = useIsLoggedIn();
  const setModal = useSetModal();
  const setToast = useSetToast();

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (!auth) {
      setModal("NotLoggedIn");
      return;
    }
    if (isLoading) return;
    setIsLoading(true);

    try {
      if (!myVote || isMyVoteEmpty(myVote)) {
        const response = await apiClient.post(
          `/what_to_discard_problems/${problemId}/votes`,
          {
            what_to_discard_problem_vote: {
              tile_id: tileId,
            },
          }
        );

        setVotes(response.data.what_to_discard_problem_votes);
        setVotesCount(response.data.what_to_discard_problem_votes.total_count);
        setMyVote(
          response.data.what_to_discard_problem_votes.current_user_vote
        );

        setToast({
          type: "success",
          message: "投票しました",
        });
      } else if (myVote.tile_id == tileId) {
        const response = await apiClient.delete(
          `/what_to_discard_problems/${problemId}/votes/${myVote.id}`
        );

        setVotes(response.data.what_to_discard_problem_votes);
        setVotesCount(response.data.what_to_discard_problem_votes.total_count);
        setMyVote(null);

        setToast({ type: "success", message: "投票を取り消しました" });
      } else {
        await apiClient.delete(
          `/what_to_discard_problems/${problemId}/votes/${myVote.id}`
        );

        const response = await apiClient.post(
          `/what_to_discard_problems/${problemId}/votes`,
          {
            what_to_discard_problem_vote: {
              tile_id: tileId,
            },
          }
        );

        setVotes(response.data.what_to_discard_problem_votes);
        setVotesCount(response.data.what_to_discard_problem_votes.total_count);
        setMyVote(
          response.data.what_to_discard_problem_votes.current_user_vote
        );

        setToast({
          type: "success",
          message: "投票しました",
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.status);
        console.error(error.message);
      } else {
        console.error(error);
      }
      setToast({ type: "error", message: "投票の投稿/削除に失敗しました" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PopButton
      defaultClassName={
        myVote?.tile_id == tileId ? "border-2 border-red-400 rounded" : ""
      }
      onClick={handleClick}
      value={
        <div className="lg:w-12 w-6">
          <TileImage tile={tileId} />
        </div>
      }
    />
  );
}
