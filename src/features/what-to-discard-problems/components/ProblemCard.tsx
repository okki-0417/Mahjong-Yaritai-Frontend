"use client";

import ProblemCardHeader from "@/src/features/what-to-discard-problems/components/ProblemCardHeader";
import ProblemLikeSection from "@/src/features/what-to-discard-problems/components/likes/ProblemLikeSection";
import { schemas } from "@/src/zodios/api";
import { Box, HStack, Text, useDisclosure, VStack, Wrap } from "@chakra-ui/react";
import { z } from "zod";
import ProblemVoteSection from "@/src/features/what-to-discard-problems/components/votes/ProblemVoteSection";
import ProblemCommentSection from "@/src/features/what-to-discard-problems/components/comments/ProblemCommentSection";
import { Fragment, useContext, useState } from "react";
import VoteButton from "@/src/features/what-to-discard-problems/components/votes/VoteButton";
import VoteResultModal from "@/src/components/Modals/VoteResultModal";
import { SessionContext } from "@/src/features/what-to-discard-problems/context-providers/SessionContextProvider";
import TileImage from "@/src/components/TileImage";
import ProblemDescriptionModal from "@/src/features/what-to-discard-problems/components/ProblemDescriptionModal";

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
      <Text fontSize="sm">{new Date(problem.created_at).toLocaleString()}</Text>

      <VStack borderRadius="md" shadow="md" alignItems="stretch" gap="0" overflow="hidden">
        <Box pt="2" px={["2", "4"]} pb="6" className="bg-mj-mat">
          <ProblemCardHeader problem={problem} myUserId={myUserId} />

          <Wrap mt="2" spacingY="0" align="center">
            {problem.round && <Text fontSize={["lg", "xl"]}>{problem.round}局</Text>}
            {problem.turn && <Text fontSize={["lg", "xl"]}>{problem.turn}巡目</Text>}
            {problem.wind && <Text fontSize={["lg", "xl"]}>{problem.wind}家</Text>}
            {problem.points && <Text fontSize={["lg", "xl"]}>{problem.points}点持ち</Text>}
            <HStack gap="1">
              <Text fontSize={["md", "lg"]}>ドラ</Text>
              <Box h="8" aspectRatio="7/9">
                <TileImage tileId={problem.dora_id} hover={false} />
              </Box>
            </HStack>
            <HStack gap="1">
              <Text fontSize={["md", "lg"]}>ツモ</Text>
              <Box h="8" aspectRatio="7/9">
                <TileImage tileId={problem.tsumo_id} hover={false} />
              </Box>
            </HStack>
          </Wrap>

          <HStack gap="1px" justify="center" alignItems="flex-end" mt="2">
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
                  handleDisplayVoteResult={onVoteResultOpen}
                />
              );
            })}
          </HStack>

          {problem.description && (
            <Fragment>
              <Box
                mt="4"
                className="line-clamp-2"
                cursor="pointer"
                position="relative"
                onClick={onDescriptionOpen}>
                <Text>{problem.description}</Text>
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
