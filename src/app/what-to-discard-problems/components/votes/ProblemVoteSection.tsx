"use client";

import { z } from "zod";
import { schemas } from "@/src/zodios/api";
import PopButton from "@/src/components/PopButton";
import { HStack, Text } from "@chakra-ui/react";
import { apiClient } from "@/src/lib/api/client";
import useErrorToast from "@/src/hooks/useErrorToast";
import Image from "next/image";
import VoteIconDefault from "@/public/vote-icon-default.webp";
import VoteIconBlue from "@/public/vote-icon-blue.webp";

export type MyVoteType = z.infer<typeof schemas.Tile> | null;

export default function ProblemVoteSection({
  isVoted,
  votesCount,
  setVoteResult,
  problem,
  handleDisplayVoteResult,
}: {
  isVoted: boolean;
  votesCount: number;
  setVoteResult: React.Dispatch<
    React.SetStateAction<z.infer<typeof schemas.WhatToDiscardProblemVoteResult>[]>
  >;
  problem: z.infer<typeof schemas.WhatToDiscardProblem>;
  handleDisplayVoteResult: () => void;
}) {
  const errorToast = useErrorToast();

  const handleClick = async () => {
    try {
      const response = await apiClient.getWhatToDiscardProblemVoteResult({
        params: {
          what_to_discard_problem_id: String(problem.id),
        },
      });

      const tileUniqueResult = Array.from(
        new Map(
          response.what_to_discard_problem_vote_result.map(result => [result.tile_id, result]),
        ).values(),
      );

      setVoteResult(tileUniqueResult);
      handleDisplayVoteResult();
    } catch (error) {
      errorToast({ title: "投票の取得に失敗しました", error });
    }
  };

  return (
    <PopButton onClick={handleClick}>
      <HStack gap="2px">
        {isVoted ? (
          <Image src={VoteIconBlue} alt="投票結果を見る" width={30} height={30} />
        ) : (
          <Image src={VoteIconDefault} alt="投票結果を見る" width={30} height={30} />
        )}
        <Text fontFamily="sans-serif" fontWeight="bold">
          {votesCount}
        </Text>
      </HStack>
    </PopButton>
  );
}
