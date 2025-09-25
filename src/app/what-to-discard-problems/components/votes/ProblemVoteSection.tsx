"use client";

import { z } from "zod";
import { schemas } from "@/src/zodios/api";
import PopButton from "@/src/components/PopButton";
import { HStack, Text } from "@chakra-ui/react";
import useErrorToast from "@/src/hooks/useErrorToast";
import { useQuery } from "@apollo/client/react";
import { WhatToDiscardProblemDetailDocument } from "@/src/generated/graphql";
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

  const { refetch } = useQuery(WhatToDiscardProblemDetailDocument, {
    variables: { id: String(problem.id) },
    skip: true,
  });

  const handleClick = async () => {
    try {
      const { data } = await refetch();

      if (data?.whatToDiscardProblem?.voteResults) {
        const voteResults = data.whatToDiscardProblem.voteResults.map((result: any) => ({
          tile_id: Number(result.tileId),
          count: result.count,
        }));

        const tileUniqueResult = Array.from(
          new Map(voteResults.map((result: any) => [result.tile_id, result])).values(),
        );

        setVoteResult(tileUniqueResult);
        handleDisplayVoteResult();
      }
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
