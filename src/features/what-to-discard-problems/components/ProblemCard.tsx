import TileImage from "@/src/components/TileImage";
import CloseCommentSectionButton from "@/src/features/what-to-discard-problems/components/CloseCommentSectionButton";
import CloseVoteResultButton from "@/src/features/what-to-discard-problems/components/CloseVoteResultButton";
import CommentsCount from "@/src/features/what-to-discard-problems/components/CommentsCount";
import CommentSection from "@/src/features/what-to-discard-problems/components/CommentSection";
import IsCommentSectionOpenToggleWrapper from "@/src/features/what-to-discard-problems/components/IsCommentSectionOpenToggleWrapper";
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
import { WhatToDiscardProblem } from "@/src/types/ApiData";
import { Box, Flex, Grid, GridItem, HStack, Text } from "@chakra-ui/react";

export default async function ProblemCard({ problem }: { problem: WhatToDiscardProblem }) {
  const session = await getSession();

  return (
    <Box mt={12} w="full">
      <Text fontSize="xl">{new Date(problem.createdAt).toLocaleString()}</Text>

      <Box boxShadow="base" borderRadius="md" className="bg-green-700">
        <ProblemCardHeader problem={problem} session={session} />

        <Box px="3" mt="3">
          <HStack fontSize={[18, 20]}>
            <Text>{problem.round}局</Text>

            <Text>{problem.turn}巡目</Text>

            <Text>{problem.wind}家</Text>

            <HStack h="8">
              <Text>ドラ</Text>
              <TileImage tile={problem.dora.id} hover={false} />
            </HStack>
          </HStack>

          <Grid templateColumns="repeat(4,1fr)" fontSize={[18, 20]} mt="2">
            {[
              { label: "東家", point: problem.pointEast },
              { label: "南家", point: problem.pointSouth },
              { label: "西家", point: problem.pointWest },
              { label: "北家", point: problem.pointNorth },
            ].map(obj => {
              return (
                <GridItem colSpan={[2, 1]} key={obj.label}>
                  <HStack>
                    <Text>{obj.label}</Text>
                    <Text className="font-sans font-normal">{obj.point}点</Text>
                  </HStack>
                </GridItem>
              );
            })}
          </Grid>

          <Flex flexDir={["column", "row-reverse"]} justifyContent="center" gap="3" mt="3">
            <Flex flexDir={["row", "column"]} alignItems="center">
              <Text>ツモ</Text>

              <Box w={[8, "auto"]}>
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
                    <TileImage tile={hand.id} hover={false} />
                  </Box>
                );
              })}
            </Flex>
          </Flex>
        </Box>

        <IsVoteResultOpenContextProvider>
          <IsCommentSectionOpenContextProvider>
            <VotesCountContextProvider initialVotesCount={problem.votesCount}>
              <MyVotedTileContextProvider initialMyVote={problem.myVote}>
                <VotesCountContextProvider initialVotesCount={problem.votesCount}>
                  <Box>
                    <VoteResultOpenButton />

                    <IsVoteResultOpenToggleWrapper>
                      <VoteResult problemId={problem.id} />

                      <CloseVoteResultButton />
                    </IsVoteResultOpenToggleWrapper>
                  </Box>

                  <Box
                    mt="4"
                    py="2"
                    px="4"
                    bgColor="white"
                    color="gray.700"
                    className="rounded-b-md">
                    <HStack>
                      <ProblemLikeButton problem={problem} />

                      <CommentsCount commentsCount={problem.commentsCount} />

                      <VotesCount />
                    </HStack>

                    <IsCommentSectionOpenToggleWrapper>
                      <CommentSection problemId={problem.id} />

                      <CloseCommentSectionButton />
                    </IsCommentSectionOpenToggleWrapper>
                  </Box>
                </VotesCountContextProvider>
              </MyVotedTileContextProvider>
            </VotesCountContextProvider>
          </IsCommentSectionOpenContextProvider>
        </IsVoteResultOpenContextProvider>
      </Box>
    </Box>
  );
}
