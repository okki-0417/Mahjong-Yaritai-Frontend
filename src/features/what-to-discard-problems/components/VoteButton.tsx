"use client";

import { useContext, useState } from "react";
import { Box, useDisclosure, useToast } from "@chakra-ui/react";
import useIsLoggedIn from "@/src/hooks/useIsLoggedIn";
import PopButton from "@/src/components/PopButton";
import TileImage from "@/src/components/TileImage";
import { MyVoteContext } from "@/src/features/what-to-discard-problems/context-providers/contexts/MyVoteContext";
import { VotesCountContext } from "@/src/features/what-to-discard-problems/context-providers/contexts/VotesCountContext";
import NotLoggedInModal from "@/src/components/Modals/NotLoggedInModal";
import { apiClient } from "@/config/apiConfig";

export default function VoteButton({
  tileId,
  setLoadResultFlag,
}: {
  problemId: number;
  tileId: number;
  setLoadResultFlag: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const auth = useIsLoggedIn();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const { myVote, setMyVote } = useContext(MyVoteContext);
  const { setVotesCount } = useContext(VotesCountContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleVote = async () => {
    if (!auth) {
      console.log(auth);
      return onOpen();
    }

    if (isLoading) return null;
    setIsLoading(true);

    try {
      if (!myVote) {
        const response = await apiClient.createVote({
          what_to_discard_problem_vote: {
            tile_id: String(tileId),
          },
        });

        const data = response.what_to_discard_problem_vote;

        if (!data) {
          throw new Error("作成した投票が取得できませんでした");
        }

        setVotesCount(prev => prev + 1);
        setMyVote(data);
        setLoadResultFlag(true);

        toast({
          title: "投票しました",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else if (tileId == myVote.tile.id) {
        await apiClient.deleteVote([], {
          params: {
            what_to_discard_problem_id: String(myVote.id),
          },
        });

        setVotesCount(prev => prev - 1);
        setMyVote(null);
        setLoadResultFlag(true);

        toast({
          title: "投票を取り消しました",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        await apiClient.deleteVote([], {
          params: {
            what_to_discard_problem_id: String(myVote.id),
          },
        });

        const response = await apiClient.createVote({
          what_to_discard_problem_vote: {
            tile_id: String(tileId),
          },
        });

        const data = response.what_to_discard_problem_vote;

        if (!data) {
          throw new Error("作成した投票が取得できませんでした");
        }

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

    return null;
  };

  return (
    <Box content="">
      <PopButton
        onClick={handleVote}
        value={
          <Box h={["10", "16"]}>
            <TileImage tile={tileId} />
          </Box>
        }
      />

      <NotLoggedInModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
