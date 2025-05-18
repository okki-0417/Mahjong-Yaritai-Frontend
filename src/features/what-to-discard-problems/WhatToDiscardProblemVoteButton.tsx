import PopButton from "../../components/PopButton";
import TileImage from "../../components/TileImage";
import { apiClient } from "../../lib/apiClients/ApiClients";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { useSetModal } from "../../hooks/useSetModal";
import { useState } from "react";
import { VotesType } from "./WhatToDiscardProblemVoteList";
import { isMyVoteEmpty, MyVoteType } from "./WhatToDiscardProblemVotesCount";
import { Box, useToast } from "@chakra-ui/react";

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
  myVote: MyVoteType;
  setMyVote: React.Dispatch<React.SetStateAction<MyVoteType>>;
  setVotes: React.Dispatch<React.SetStateAction<VotesType | null>>;
  setVotesCount: React.Dispatch<React.SetStateAction<number>>;
}) {
  const auth = useIsLoggedIn();
  const setModal = useSetModal();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (!auth) {
      setModal("NotLoggedIn");
      return;
    }
    if (isLoading) return;
    setIsLoading(true);

    try {
      if (isMyVoteEmpty(myVote)) {
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

        toast({
          title: "投票しました",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else if (myVote.tile_id == tileId) {
        const response = await apiClient.delete(
          `/what_to_discard_problems/${problemId}/votes/${myVote.id}`
        );

        setVotes(response.data.what_to_discard_problem_votes);
        setVotesCount(response.data.what_to_discard_problem_votes.total_count);
        setMyVote({ id: null, tile_id: null });

        toast({
          title: "投票を取り消しました",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
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

        toast({
          title: "投票しました",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "投票の操作に失敗しました",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PopButton
      onClick={handleClick}
      value={
        <Box w={["6", "12"]}>
          <TileImage tile={tileId} />
        </Box>
      }
    />
  );
}
