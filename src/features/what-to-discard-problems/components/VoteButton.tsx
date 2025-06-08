"use client";

import { apiClient } from "@/src/lib/apiClients/ApiClients";
import { useContext, useState } from "react";
import { Box, useToast } from "@chakra-ui/react";
import useIsLoggedIn from "@/src/hooks/useIsLoggedIn";
import { useSetModal } from "@/src/hooks/useSetModal";
import { ProblemVote } from "@/src/types/ApiData";
import PopButton from "@/src/components/PopButton";
import TileImage from "@/src/components/TileImage";
import { MyVoteContext } from "@/src/features/what-to-discard-problems/context-providers/contexts/MyVoteContext";
import { VotesCountContext } from "@/src/features/what-to-discard-problems/context-providers/contexts/VotesCountContext";

export default function VoteButton({
  problemId,
  tileId,
  setLoadResultFlag,
}: {
  problemId: number;
  tileId: number;
  setLoadResultFlag: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const auth = useIsLoggedIn();
  const setModal = useSetModal();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const { myVote, setMyVote } = useContext(MyVoteContext);
  const { setVotesCount } = useContext(VotesCountContext);

  const handleVote = async () => {
    if (!auth) {
      setModal("NotLoggedIn");
      return;
    }

    if (isLoading) {return;}
    setIsLoading(true);

    try {
      if (!myVote) {
        const response = await apiClient.post(
          `/what_to_discard_problems/${problemId}/votes`,
          {
            what_to_discard_problem_vote: {
              tile_id: tileId,
            },
          },
        );

        const data: ProblemVote = response.data["what_to_discard_problem/vote"];
        if (!data) {throw new Error("作成した投票が取得できませんでした");}

        setVotesCount((prev) => prev + 1);
        setMyVote(data);
        setLoadResultFlag(true);

        toast({
          title: "投票しました",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else if (tileId == myVote.tile.id) {
        await apiClient.delete(
          `/what_to_discard_problems/${problemId}/votes/${myVote.id}`,
        );

        console.log("削除");

        setVotesCount((prev) => prev - 1);
        setMyVote(null);
        setLoadResultFlag(true);

        toast({
          title: "投票を取り消しました",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        await apiClient.delete(
          `/what_to_discard_problems/${problemId}/votes/${myVote.id}`,
        );

        const response = await apiClient.post(
          `/what_to_discard_problems/${problemId}/votes`,
          {
            what_to_discard_problem_vote: {
              tile_id: tileId,
            },
          },
        );

        const data: ProblemVote = response.data["what_to_discard_problem/vote"];
        if (!data) {throw new Error("作成した投票が取得できませんでした");}

        setMyVote(data);
        setLoadResultFlag(true);

        toast({
          title: "投票しました",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(error);

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
      onClick={handleVote}
      value={
        <Box w={["6", "12"]}>
          <TileImage tile={tileId} />
        </Box>
      }
    />
  );
}
