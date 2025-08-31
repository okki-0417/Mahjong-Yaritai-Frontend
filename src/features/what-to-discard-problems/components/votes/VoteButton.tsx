"use client";

import { useContext, useState } from "react";
import { Box, useDisclosure } from "@chakra-ui/react";
import PopButton from "@/src/components/PopButton";
import TileImage from "@/src/components/TileImage";
import NotLoggedInModal from "@/src/components/Modals/NotLoggedInModal";
import { apiClient } from "@/src/lib/api/client";
import { z } from "zod";
import { schemas } from "@/src/zodios/api";
import useSuccessToast from "@/src/hooks/useSuccessToast";
import useErrorToast from "@/src/hooks/useErrorToast";
import { getUniqueObjectArrayByKey } from "@/src/lib/utils/getUniqueObjectByKey";
import { SessionContext } from "@/src/features/what-to-discard-problems/context-providers/SessionContextProvider";

export default function VoteButton({
  problem,
  tileId,
  myVoteTileId,
  setMyVoteTileId,
  setVotesCount,
  setVoteResult,
  handleDisplayVoteResult = () => null,
}: {
  problem: z.infer<typeof schemas.WhatToDiscardProblem>;
  tileId: number;
  myVoteTileId: number | null;
  setMyVoteTileId: React.Dispatch<React.SetStateAction<number | null>>;
  setVotesCount: React.Dispatch<React.SetStateAction<number>>;
  setVoteResult: React.Dispatch<
    React.SetStateAction<z.infer<typeof schemas.WhatToDiscardProblemVoteResult>[]>
  >;
  handleDisplayVoteResult?: () => void;
}) {
  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { session } = useContext(SessionContext);
  const isLoggedIn = Boolean(session?.is_logged_in);

  const handleClick = async () => {
    if (!isLoggedIn) return onOpen();

    if (isSubmitting) return null;
    setIsSubmitting(true);

    try {
      if (!myVoteTileId) {
        const response = await apiClient.createWhatToDiscardProblemMyVote(
          {
            what_to_discard_problem_my_vote: {
              tile_id: tileId,
            },
          },
          {
            params: {
              what_to_discard_problem_id: String(problem.id),
            },
          },
        );

        setVotesCount(prev => prev + 1);
        setMyVoteTileId(response.what_to_discard_problem_my_vote.tile.id);

        const voteResultResponse = await apiClient.getWhatToDiscardProblemVoteResult({
          params: {
            what_to_discard_problem_id: String(problem.id),
          },
        });

        const tileUniqueResult = getUniqueObjectArrayByKey(
          voteResultResponse.what_to_discard_problem_vote_result,
          "tile_id",
        );

        setVoteResult(tileUniqueResult);
        handleDisplayVoteResult();

        successToast({ title: "投票しました" });
      } else if (myVoteTileId == tileId) {
        await apiClient.deleteWhatToDiscardProblemMyVote([], {
          params: {
            what_to_discard_problem_id: String(problem.id),
          },
        });

        setVotesCount(prev => prev - 1);
        setMyVoteTileId(null);

        const response = await apiClient.getWhatToDiscardProblemVoteResult({
          params: {
            what_to_discard_problem_id: String(problem.id),
          },
        });

        const tileUniqueResult = getUniqueObjectArrayByKey(
          response.what_to_discard_problem_vote_result,
          "tile_id",
        );

        setVoteResult(tileUniqueResult);
        handleDisplayVoteResult();

        successToast({ title: "投票を取り消しました" });
      } else {
        await apiClient.deleteWhatToDiscardProblemMyVote([], {
          params: {
            what_to_discard_problem_id: String(problem.id),
          },
        });

        const response = await apiClient.createWhatToDiscardProblemMyVote(
          {
            what_to_discard_problem_my_vote: {
              tile_id: tileId,
            },
          },
          {
            params: {
              what_to_discard_problem_id: String(problem.id),
            },
          },
        );

        setMyVoteTileId(response.what_to_discard_problem_my_vote.tile.id);

        const voteResultResponse = await apiClient.getWhatToDiscardProblemVoteResult({
          params: {
            what_to_discard_problem_id: String(problem.id),
          },
        });

        const tileUniqueResult = getUniqueObjectArrayByKey(
          voteResultResponse.what_to_discard_problem_vote_result,
          "tile_id",
        );

        setVoteResult(tileUniqueResult);
        handleDisplayVoteResult();

        successToast({ title: "投票しました" });
      }
    } catch (error) {
      errorToast({ error, title: "投票の操作に失敗しました" });
    } finally {
      setIsSubmitting(false);
    }

    return null;
  };

  return (
    <>
      <PopButton
        onClick={handleClick}
        disabled={isSubmitting}
        className="h-full aspect-7/9 relative overflow-hidden min-h-12">
        <TileImage tileId={tileId} isShiny={tileId == problem.dora_id} />
        <Box
          position="absolute"
          inset="0"
          zIndex="10"
          className={`${myVoteTileId == tileId && "bg-blue-500/40"}`}
        />
      </PopButton>

      <NotLoggedInModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
