import axios from "axios";
import PopButton from "../../components/PopButton";
import TileImage from "../../components/TileImage";
import { apiClient } from "../../ApiConfig";
import { useSetToast } from "../../hooks/useSetToast";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { useSetModal } from "../../hooks/useSetModal";
import { useState } from "react";

export default function WhatToDiscardProblemVoteButton({
  problemId,
  tileId,
  setVoted,
  votedTileId,
  setVotedTileId,
}: {
  problemId: number;
  tileId: number;
  setVoted: React.Dispatch<React.SetStateAction<boolean>>;
  votedTileId: number | null;
  setVotedTileId: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const auth = useIsLoggedIn();
  const setModal = useSetModal();
  const setToast = useSetToast();

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (!auth) setModal("NotLoggedIn");
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await apiClient.post(
        `/what_to_discard_problems/${problemId}/votes`,
        {
          what_to_discard_problem_vote: {
            tile_id: tileId,
          },
        }
      );

      const vote = response.data.what_to_discard_problem_vote;
      console.log(response.data);
      setVoted(true);
      setVotedTileId(vote.tile.id);

      setToast({
        type: "success",
        message: `「${vote.tile.name}」に投票しました`,
      });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error(e.status);
        console.error(e.message);
      }
      setToast({ type: "error", message: "投票に失敗しました" });
    }
    setIsLoading(false);
  };

  return (
    <PopButton
      defaultClassName={votedTileId == tileId ? "border-3 border-blue-500" : ""}
      onClick={handleClick}
      value={
        <div className="lg:w-12 w-6">
          <TileImage tile={tileId} />
        </div>
      }
    />
  );
}
