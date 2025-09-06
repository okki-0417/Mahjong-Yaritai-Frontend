"use client";

import { useContext, useState } from "react";
import { Box, Skeleton, useDisclosure } from "@chakra-ui/react";
import PopButton from "@/src/components/PopButton";
import TileImage from "@/src/components/TileImage";
import NotLoggedInModal from "@/src/components/Modals/NotLoggedInModal";
import { apiClient } from "@/src/lib/api/client";
import { z } from "zod";
import { schemas } from "@/src/zodios/api";
import useSuccessToast from "@/src/hooks/useSuccessToast";
import useErrorToast from "@/src/hooks/useErrorToast";
import { SessionContext } from "@/src/features/what-to-discard-problems/context-providers/SessionContextProvider";
import Image from "next/image";
import FireImage from "@/public/fire.gif";
import ColdImage from "@/public/snow.gif";

export default function VoteButton({
  problem,
  tileId,
  myVoteTileId,
  setMyVoteTileId,
  setVotesCount,
  voteResult,
  setVoteResult,
}: {
  problem: z.infer<typeof schemas.WhatToDiscardProblem>;
  tileId: number;
  myVoteTileId: number | null;
  setMyVoteTileId: React.Dispatch<React.SetStateAction<number | null>>;
  setVotesCount: React.Dispatch<React.SetStateAction<number>>;
  voteResult: z.infer<typeof schemas.WhatToDiscardProblemVoteResult>[];
  setVoteResult: React.Dispatch<
    React.SetStateAction<z.infer<typeof schemas.WhatToDiscardProblemVoteResult>[]>
  >;
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

        setVoteResult(voteResultResponse.what_to_discard_problem_vote_result);

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

        setVoteResult(response.what_to_discard_problem_vote_result);

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

        setVoteResult(voteResultResponse.what_to_discard_problem_vote_result);

        successToast({ title: "投票しました" });
      }
    } catch (error) {
      errorToast({ error, title: "投票の操作に失敗しました" });
    } finally {
      setIsSubmitting(false);
    }

    return null;
  };

  const HotColdEffect = () => {
    if (!voteResult?.length) return null;

    const mostVotedCount = Math.max(...voteResult.map(vote => vote.count));
    const leastVotedCount = Math.min(...voteResult.map(vote => vote.count));

    // エフェクトが入る牌が多くなりすぎないようにするため
    if (mostVotedCount == leastVotedCount) return null;

    const mostVotedTileIds = voteResult
      .filter(vote => vote.count == mostVotedCount)
      .map(vote => vote.tile_id);
    const leastVotedTileIds = voteResult
      .filter(vote => vote.count == leastVotedCount)
      .map(vote => vote.tile_id);

    if (mostVotedTileIds.length <= 2 && mostVotedTileIds.includes(tileId)) {
      return (
        <Box className="absolute inset-y-0 object-cover z-10 min-h-0">
          <Image
            src={FireImage}
            width={100}
            height={100}
            alt="hot-vote"
            className="h-full object-cover opacity-70 z-20"
          />
          <div className="firing-tile absolute inset-0 z-10" />
        </Box>
      );
    } else if (leastVotedTileIds.length <= 2 && leastVotedTileIds.includes(tileId)) {
      return (
        <Box className="absolute inset-y-0 object-cover z-10 min-h-0">
          <Image
            src={ColdImage}
            width={100}
            height={100}
            alt="cold-vote"
            className="h-full object-cover z-20"
          />
          <div className="frozen-tile absolute inset-0 z-10" />
        </Box>
      );
    } else return null;
  };

  const VotingFallback = () => {
    return (
      <Box position="absolute" inset="0" zIndex="5" rounded="sm">
        <Skeleton w="full" h="full" />
      </Box>
    );
  };

  return (
    <>
      <PopButton onClick={handleClick} disabled={isSubmitting} className="aspect-tile relative">
        <HotColdEffect />

        <TileImage tileId={tileId} isShiny={tileId == problem.dora_id} />
        <Box
          position="absolute"
          inset="0"
          zIndex="10"
          className={`${myVoteTileId == tileId && "selected-tile"}`}
        />
        {isSubmitting && <VotingFallback />}
      </PopButton>

      <NotLoggedInModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
