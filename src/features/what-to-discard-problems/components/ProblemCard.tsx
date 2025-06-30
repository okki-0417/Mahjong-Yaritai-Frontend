import TileImage from "@/src/components/TileImage";
import CommentsCount from "@/src/features/what-to-discard-problems/components/CommentsCount";
import IsVoteResultOpenToggleWrapper from "@/src/features/what-to-discard-problems/components/IsVoteResultOpenToggleWrapper";
import ProblemCardHeader from "@/src/features/what-to-discard-problems/components/ProblemCardHeader";
import ProblemLikeButton from "@/src/features/what-to-discard-problems/components/ProblemLikeButton";
import VoteResult from "@/src/features/what-to-discard-problems/components/VoteResult";
import VoteResultOpenButton from "@/src/features/what-to-discard-problems/components/VoteResultOpenButton";
import VotesCount from "@/src/features/what-to-discard-problems/components/VotesCount";
import IsCommentSectionOpenContextProvider from "@/src/features/what-to-discard-problems/context-providers/providers/IsCommentSectionOpenContextProvider";
import IsVoteResultOpenContextProvider from "@/src/features/what-to-discard-problems/context-providers/providers/IsVoteResultOpenContextProvider";
import MyVotedTileContextProvider from "@/src/features/what-to-discard-problems/context-providers/providers/MyVoteContextProvider";
import VotesCountContextProvider from "@/src/features/what-to-discard-problems/context-providers/providers/VotesCountContextProvider";
import getSession from "@/src/lib/getSession";
import { schemas } from "@/src/zodios/api";
import { Box, Flex, HStack, Text, Wrap } from "@chakra-ui/react";
import { z } from "zod";

export default async function ProblemCard({
  problem,
}: {
  problem: z.infer<typeof schemas.WhatToDiscardProblem>;
}) {
  const session = await getSession();

  return (
    <Box mt={12} w="full">
      <Text fontSize="xl">{new Date(problem.created_at).toLocaleString()}</Text>

      <Box boxShadow="base" borderRadius="md" className="bg-mj-mat" shadow="md">
        <ProblemCardHeader problem={problem} session={session} />

        <Box px="3" mt="3">
          <HStack fontSize={[18, 20]}>
            <Text>{problem.round}局</Text>
            <Text>{problem.wind}家</Text>
            <Text>{problem.turn}巡目</Text>

            <HStack gap="1">
              <Text>ドラ</Text>
              <Box h="8">
                <TileImage tile={problem.dora.id} hover={false} />
              </Box>
            </HStack>
          </HStack>

          <Wrap fontSize={[18, 20]} mt="2" gap="4">
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

          <Flex flexDir={["column", "row-reverse"]} justifyContent="center" gap="3" mt="3">
            <Flex flexDir={["row", "column"]} alignItems="center" gap={[2, 0]}>
              <Text>ツモ</Text>

              <Box w={[6, "auto"]}>
                <TileImage tile={problem.tsumo.id} hover={false} />
              </Box>
            </Flex>

            <Flex justifyContent="center" alignItems="flex-end">
              {[
                problem.hand1,
                problem.hand2,
                problem.hand3,
                problem.hand4,
                problem.hand5,
                problem.hand6,
                problem.hand7,
                problem.hand8,
                problem.hand9,
                problem.hand10,
                problem.hand11,
                problem.hand12,
                problem.hand13,
              ].map((hand, index) => {
                return (
                  <Box key={index}>
                    <TileImage tile={hand.id} hover={false} className="shadow-lg" />
                  </Box>
                );
              })}
            </Flex>
          </Flex>
        </Box>

        <IsVoteResultOpenContextProvider>
          <IsCommentSectionOpenContextProvider>
            <VotesCountContextProvider initialVotesCount={problem.votes_count}>
              <MyVotedTileContextProvider initialMyVote={null}>
                <Box>
                  <Box mt="6">
                    <VoteResultOpenButton />
                  </Box>

                  <IsVoteResultOpenToggleWrapper>
                    <VoteResult problemId={problem.id} />
                  </IsVoteResultOpenToggleWrapper>
                </Box>

                <Box mt="4" py="2" px="4" bgColor="white" color="gray.700" className="rounded-b-md">
                  <HStack>
                    <ProblemLikeButton problem={problem} />

                    <CommentsCount commentsCount={problem.comments_count} problemId={problem.id} />

                    <VotesCount />
                  </HStack>
                </Box>
              </MyVotedTileContextProvider>
            </VotesCountContextProvider>
          </IsCommentSectionOpenContextProvider>
        </IsVoteResultOpenContextProvider>
      </Box>
    </Box>
  );
}
