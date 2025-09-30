"use client";

import ProblemCardHeader from "@/src/app/what-to-discard-problems/components/ProblemCardHeader";
import ProblemLikeSection from "@/src/app/what-to-discard-problems/components/likes/ProblemLikeSection";
import { WhatToDiscardProblem, WhatToDiscardProblemVoteResult } from "@/src/generated/graphql";
import { Box, HStack, Text, useDisclosure, VStack, Wrap } from "@chakra-ui/react";
import ProblemVoteSection from "@/src/app/what-to-discard-problems/components/votes/ProblemVoteSection";
import ProblemCommentSection from "@/src/app/what-to-discard-problems/components/comments/ProblemCommentSection";
import { Fragment, useContext, useEffect, useState } from "react";
import VoteButton from "@/src/app/what-to-discard-problems/components/votes/VoteButton";
import VoteResultModal from "@/src/components/Modals/VoteResultModal";
import { SessionContext } from "@/src/app/what-to-discard-problems/context-providers/SessionContextProvider";
import TileImage from "@/src/components/TileImage";
import ProblemDescriptionModal from "@/src/app/what-to-discard-problems/components/ProblemDescriptionModal";

// Define compatibility types - unused, keeping for potential future use

export default function ProblemCard({
  problem,
  graphqlProblem,
}: {
  problem: WhatToDiscardProblem;
  // GraphQLのWhatToDiscardProblem型
  graphqlProblem?: any;
}) {
  const [myVoteTileId, setMyVoteTileId] = useState<number>(null);
  const [votesCount, setVotesCount] = useState<number>(problem.votesCount || 0);
  const [voteResult, setVoteResult] = useState<WhatToDiscardProblemVoteResult[]>([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarksCount, setBookmarksCount] = useState(0);

  useEffect(() => {
    // GraphQLデータがない場合は何もしない
    if (!graphqlProblem) {
      return;
    }

    // GraphQLデータから投票情報を取得
    if (graphqlProblem.myVote?.tileId) {
      setMyVoteTileId(Number(graphqlProblem.myVote.tileId));
    } else {
      setMyVoteTileId(null);
    }

    // 投票結果をREST APIフォーマットに変換
    if (graphqlProblem.voteResults) {
      const currentVoteTileId = graphqlProblem.myVote?.tileId
        ? Number(graphqlProblem.myVote.tileId)
        : null;
      const restVoteResults = graphqlProblem.voteResults.map((result: any) => ({
        tile_id: Number(result.tileId),
        count: result.count,
        is_voted_by_me: currentVoteTileId === Number(result.tileId),
      }));
      setVoteResult(restVoteResults);
    }

    // 投票数更新
    setVotesCount(graphqlProblem.votesCount);

    // ブックマーク情報更新
    if (graphqlProblem.isBookmarkedByMe !== undefined) {
      setIsBookmarked(graphqlProblem.isBookmarkedByMe);
    }
    if (graphqlProblem.bookmarksCount !== undefined) {
      setBookmarksCount(graphqlProblem.bookmarksCount);
    }
  }, [graphqlProblem]);

  const { session } = useContext(SessionContext);
  const myUserId = session?.user_id;

  const {
    isOpen: isVoteResultOpen,
    onOpen: onVoteResultOpen,
    onClose: onVoteResultClose,
  } = useDisclosure();

  const {
    isOpen: isDescriptionOpen,
    onOpen: onDescriptionOpen,
    onClose: onDescriptionClose,
  } = useDisclosure();

  return (
    <Box className="md:max-w-2xl w-screen px-1">
      <Text fontSize="sm">{new Date(problem.createdAt).toLocaleString()}</Text>

      <VStack borderRadius="md" shadow="md" alignItems="stretch" gap="0" overflow="hidden">
        <Box pt="2" px={["2", "4"]} pb="3" className="bg-mj-mat">
          <ProblemCardHeader
            problem={problem}
            myUserId={myUserId}
            isBookmarked={isBookmarked}
            bookmarksCount={bookmarksCount}
            onBookmarkUpdate={(newIsBookmarked, newBookmarksCount) => {
              setIsBookmarked(newIsBookmarked);
              setBookmarksCount(newBookmarksCount);
            }}
          />

          <Wrap mt="2" spacingY="0" align="center">
            {problem.round && <Text fontSize={["lg", "xl"]}>{problem.round}局</Text>}
            {problem.turn && <Text fontSize={["lg", "xl"]}>{problem.turn}巡目</Text>}
            {problem.wind && <Text fontSize={["lg", "xl"]}>{problem.wind}家</Text>}
            {problem.points && <Text fontSize={["lg", "xl"]}>{problem.points}点持ち</Text>}
            <HStack gap="1">
              <Text fontSize={["md", "lg"]}>ドラ</Text>
              <Box h="8" aspectRatio="7/9">
                <TileImage tileId={Number(problem.dora?.id)} hover={false} />
              </Box>
            </HStack>

            <Box display={["block", "none"]}>
              <HStack gap="1">
                <Text fontSize={["md", "lg"]}>ツモ</Text>
                <HStack w="6">
                  <VoteButton
                    problem={problem}
                    tileId={Number(problem.tsumo?.id)}
                    myVoteTileId={myVoteTileId}
                    setMyVoteTileId={setMyVoteTileId}
                    setVotesCount={setVotesCount}
                    voteResult={voteResult}
                    setVoteResult={setVoteResult}
                  />
                </HStack>
              </HStack>
            </Box>
          </Wrap>

          <HStack gap="2" mt={["2", "0"]} align="flex-end">
            <HStack gap="1px">
              {[
                Number(problem.hand1?.id),
                Number(problem.hand2?.id),
                Number(problem.hand3?.id),
                Number(problem.hand4?.id),
                Number(problem.hand5?.id),
                Number(problem.hand6?.id),
                Number(problem.hand7?.id),
                Number(problem.hand8?.id),
                Number(problem.hand9?.id),
                Number(problem.hand10?.id),
                Number(problem.hand11?.id),
                Number(problem.hand12?.id),
                Number(problem.hand13?.id),
              ].map((hand_id, index) => {
                return (
                  <VoteButton
                    key={index}
                    problem={problem}
                    tileId={hand_id}
                    myVoteTileId={myVoteTileId}
                    setMyVoteTileId={setMyVoteTileId}
                    setVotesCount={setVotesCount}
                    voteResult={voteResult}
                    setVoteResult={setVoteResult}
                  />
                );
              })}
            </HStack>

            <Box display={["none", "block"]}>
              <VStack gap="0" align="center">
                <Text fontSize={["sm", "md"]}>ツモ</Text>
                <VoteButton
                  problem={problem}
                  tileId={Number(problem.tsumo?.id)}
                  myVoteTileId={myVoteTileId}
                  setMyVoteTileId={setMyVoteTileId}
                  setVotesCount={setVotesCount}
                  voteResult={voteResult}
                  setVoteResult={setVoteResult}
                />
              </VStack>
            </Box>
          </HStack>

          {problem.description && (
            <Fragment>
              <Box
                mt="4"
                className="line-clamp-2"
                cursor="pointer"
                position="relative"
                onClick={onDescriptionOpen}>
                <Text fontSize={["sm", "md"]}>{problem.description}</Text>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-mj-mat z-10" />
              </Box>

              <ProblemDescriptionModal
                description={problem.description}
                isOpen={isDescriptionOpen}
                onClose={onDescriptionClose}
              />
            </Fragment>
          )}
        </Box>

        <HStack
          px={["2", "4"]}
          py={["1", "2"]}
          color="gray.700"
          className="rounded-b-md bg-neutral">
          <ProblemLikeSection problem={problem} />

          <ProblemCommentSection problem={problem} />

          <ProblemVoteSection
            problem={problem}
            isVoted={Boolean(myVoteTileId)}
            votesCount={votesCount}
            setVoteResult={setVoteResult}
            handleDisplayVoteResult={onVoteResultOpen}
          />

          <VoteResultModal
            isOpen={isVoteResultOpen}
            onClose={onVoteResultClose}
            problem={problem}
            myVoteTileId={myVoteTileId}
            setMyVoteTileId={setMyVoteTileId}
            setVotesCount={setVotesCount}
            voteResult={voteResult}
            setVoteResult={setVoteResult}
          />
        </HStack>
      </VStack>
    </Box>
  );
}
