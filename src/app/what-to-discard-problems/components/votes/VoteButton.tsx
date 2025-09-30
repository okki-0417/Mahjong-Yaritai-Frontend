"use client";

import { useContext, useState } from "react";
import { Box, Skeleton, useDisclosure } from "@chakra-ui/react";
import PopButton from "@/src/components/PopButton";
import TileImage from "@/src/components/TileImage";
import NotLoggedInModal from "@/src/components/Modals/NotLoggedInModal";

import { useMutation, useQuery } from "@apollo/client/react";
import {
  CreateWhatToDiscardProblemVoteDocument,
  DeleteWhatToDiscardProblemVoteDocument,
  WhatToDiscardProblemDetailDocument,
  WhatToDiscardProblemVoteResult,
} from "@/src/generated/graphql";

// Unused types - keeping for potential future use
import useSuccessToast from "@/src/hooks/useSuccessToast";
import useErrorToast from "@/src/hooks/useErrorToast";
import { SessionContext } from "@/src/app/what-to-discard-problems/context-providers/SessionContextProvider";
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
  problem: any;
  tileId: number;
  myVoteTileId: number | null;
  setMyVoteTileId: React.Dispatch<React.SetStateAction<number | null>>;
  setVotesCount: React.Dispatch<React.SetStateAction<number>>;
  voteResult: WhatToDiscardProblemVoteResult[];
  setVoteResult: React.Dispatch<React.SetStateAction<WhatToDiscardProblemVoteResult[]>>;
}) {
  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [createVote] = useMutation(CreateWhatToDiscardProblemVoteDocument);
  const [deleteVote] = useMutation(DeleteWhatToDiscardProblemVoteDocument);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { refetch } = useQuery(WhatToDiscardProblemDetailDocument, {
    variables: { id: String(problem.id) },
    skip: true,
  });

  const { session } = useContext(SessionContext);
  const isLoggedIn = Boolean(session?.is_logged_in);

  const handleClick = async () => {
    if (!isLoggedIn) return onOpen();

    if (isSubmitting) return null;
    setIsSubmitting(true);

    try {
      if (!myVoteTileId) {
        const { data } = await createVote({
          variables: {
            whatToDiscardProblemId: String(problem.id),
            tileId: String(tileId),
          },
        });

        if (data?.createWhatToDiscardProblemVote?.vote) {
          setVotesCount(prev => prev + 1);
          setMyVoteTileId(Number(data.createWhatToDiscardProblemVote.vote.tileId));

          // GraphQLで投票結果を再取得
          const { data: refreshedData } = await refetch();
          if (refreshedData?.whatToDiscardProblem?.voteResults) {
            setVoteResult(refreshedData.whatToDiscardProblem.voteResults);
          }

          successToast({ title: "投票しました" });
        }
      } else if (myVoteTileId == tileId) {
        await deleteVote({
          variables: {
            whatToDiscardProblemId: String(problem.id),
          },
        });

        setVotesCount(prev => prev - 1);
        setMyVoteTileId(null);

        // GraphQLで投票結果を再取得
        const { data: refreshedData } = await refetch();
        if (refreshedData?.whatToDiscardProblem?.voteResults) {
          setVoteResult(refreshedData.whatToDiscardProblem.voteResults);
        }

        successToast({ title: "投票を取り消しました" });
      } else {
        await deleteVote({
          variables: {
            whatToDiscardProblemId: String(problem.id),
          },
        });

        const { data } = await createVote({
          variables: {
            whatToDiscardProblemId: String(problem.id),
            tileId: String(tileId),
          },
        });

        if (data?.createWhatToDiscardProblemVote?.vote) {
          setMyVoteTileId(Number(data.createWhatToDiscardProblemVote.vote.tileId));

          // GraphQLで投票結果を再取得
          const { data: refreshedData } = await refetch();
          if (refreshedData?.whatToDiscardProblem?.voteResults) {
            setVoteResult(refreshedData.whatToDiscardProblem.voteResults);
          }

          successToast({ title: "投票しました" });
        }
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
      .map(vote => Number(vote.tileId));
    const leastVotedTileIds = voteResult
      .filter(vote => vote.count == leastVotedCount)
      .map(vote => Number(vote.tileId));

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
