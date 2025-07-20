"use client";

import TileImage from "@/src/components/TileImage";
import ProblemCardHeader from "@/src/features/what-to-discard-problems/components/ProblemCardHeader";
import ProblemLikeSection from "@/src/features/what-to-discard-problems/components/likes/ProblemLikeSection";
import { schemas } from "@/src/zodios/api";
import { Box, Flex, HStack, Text, useDisclosure, VStack, Wrap } from "@chakra-ui/react";
import { z } from "zod";
import ProblemVoteSection from "@/src/features/what-to-discard-problems/components/votes/ProblemVoteSection";
import ProblemCommentSection from "@/src/features/what-to-discard-problems/components/comments/ProblemCommentSection";
import { useState } from "react";
import VoteButton from "@/src/features/what-to-discard-problems/components/votes/VoteButton";
import VoteResultModal from "@/src/components/Modals/VoteResultModal";

export default function ProblemCard({
  problem,
}: {
  problem: z.infer<typeof schemas.WhatToDiscardProblem>;
}) {
  const [myVoteTileId, setMyVoteTileId] = useState(problem.my_vote_tile_id);
  const [votesCount, setVotesCount] = useState(problem.votes_count);
  const [voteResult, setVoteResult] = useState<
    z.infer<typeof schemas.WhatToDiscardProblemVoteResult>[]
  >([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Text fontSize="xl">{new Date(problem.created_at).toLocaleString()}</Text>

      <Box
        boxShadow="base"
        borderTopRadius="md"
        className="bg-mj-mat"
        shadow="md"
        pt="3"
        px="4"
        pb="6">
        <VStack alignItems="stretch">
          <ProblemCardHeader problem={problem} />

          <HStack fontSize={[18, 20]}>
            <Text>{problem.round}局</Text>
            <Text>{problem.wind}家</Text>
            <Text>{problem.turn}巡目</Text>
            <HStack gap="1">
              <Text>ドラ</Text>
              <Box h="8">
                <TileImage tile={problem.dora_id} hover={false} />
              </Box>
            </HStack>
          </HStack>

          <Wrap fontSize={[18, 20]} gap="4">
            {[
              { label: "東家", point: problem.point_east },
              { label: "南家", point: problem.point_south },
              { label: "西家", point: problem.point_west },
              { label: "北家", point: problem.point_north },
            ].map(obj => {
              return (
                <HStack key={obj.label} w="fit-content">
                  <Text>{obj.label}</Text>
                  <Text className="font-sans font-normal">{obj.point}点</Text>
                </HStack>
              );
            })}
          </Wrap>

          <Flex
            flexDir={["column", "row-reverse"]}
            justifyContent="center"
            alignItems={["start", "flex-end"]}
            gap="3"
            px={[0, 4]}>
            <Flex flexDir={["row", "column"]} alignItems="center" h="full" gap={[2, 0]}>
              <Text>ツモ</Text>
              <VoteButton
                problem={problem}
                tileId={problem.tsumo_id}
                myVoteTileId={myVoteTileId}
                setMyVoteTileId={setMyVoteTileId}
                setVotesCount={setVotesCount}
                setVoteResult={setVoteResult}
                handleDisplayVoteResult={onOpen}
              />
            </Flex>

            <HStack gap="0" alignItems="flex-end">
              {[
                problem.hand1_id,
                problem.hand2_id,
                problem.hand3_id,
                problem.hand4_id,
                problem.hand5_id,
                problem.hand6_id,
                problem.hand7_id,
                problem.hand8_id,
                problem.hand9_id,
                problem.hand10_id,
                problem.hand11_id,
                problem.hand12_id,
                problem.hand13_id,
              ].map((hand_id, index) => {
                return (
                  <VoteButton
                    key={index}
                    problem={problem}
                    tileId={hand_id}
                    myVoteTileId={myVoteTileId}
                    setMyVoteTileId={setMyVoteTileId}
                    setVotesCount={setVotesCount}
                    setVoteResult={setVoteResult}
                    handleDisplayVoteResult={onOpen}
                  />
                );
              })}
            </HStack>
          </Flex>
        </VStack>
      </Box>

      <HStack px="4" py="2" bgColor="white" color="gray.700" className="rounded-b-md">
        <ProblemLikeSection problem={problem} />

        <ProblemCommentSection problem={problem} />

        <ProblemVoteSection
          problem={problem}
          isVoted={Boolean(myVoteTileId)}
          votesCount={votesCount}
          setVoteResult={setVoteResult}
          handleDisplayVoteResult={onOpen}
        />

        <VoteResultModal
          isOpen={isOpen}
          onClose={onClose}
          problem={problem}
          myVoteTileId={myVoteTileId}
          setMyVoteTileId={setMyVoteTileId}
          setVotesCount={setVotesCount}
          voteResult={voteResult}
          setVoteResult={setVoteResult}
        />
      </HStack>
    </Box>
  );
}
