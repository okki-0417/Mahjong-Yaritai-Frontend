import TileImage from "@/src/components/TileImage";
import VoteButton from "@/src/app/what-to-discard-problems/components/votes/VoteButton";
import { WhatToDiscardProblem, WhatToDiscardProblemVoteResult } from "@/src/generated/graphql";
import {
  Box,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useMemo } from "react";

export default function VoteResultModal({
  voteResult,
  isOpen,
  onClose,
  problem,
  myVoteTileId,
  setMyVoteTileId,
  setVotesCount,
  setVoteResult,
}: {
  voteResult: WhatToDiscardProblemVoteResult[];
  isOpen: boolean;
  onClose: () => void;
  problem: WhatToDiscardProblem;
  myVoteTileId: number | null;
  setMyVoteTileId: React.Dispatch<React.SetStateAction<number | null>>;
  setVotesCount: React.Dispatch<React.SetStateAction<number>>;
  setVoteResult: React.Dispatch<React.SetStateAction<WhatToDiscardProblemVoteResult[]>>;
}) {
  // 手牌とツモ牌のユニークな並びを生成
  const uniqueTiles = useMemo(() => {
    const allTiles = [
      problem.hand1?.id,
      problem.hand2?.id,
      problem.hand3?.id,
      problem.hand4?.id,
      problem.hand5?.id,
      problem.hand6?.id,
      problem.hand7?.id,
      problem.hand8?.id,
      problem.hand9?.id,
      problem.hand10?.id,
      problem.hand11?.id,
      problem.hand12?.id,
      problem.hand13?.id,
      problem.tsumo?.id,
    ]
      .filter((id): id is string => id !== undefined)
      .map(id => Number(id));

    // ユニークなタイルのみを抽出
    const uniqueIds = [...new Set(allTiles)];
    return uniqueIds;
  }, [problem]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
      <ModalContent bg="gray.800" color="white" maxW="95vw">
        <ModalHeader>投票結果</ModalHeader>
        <ModalCloseButton />
        <ModalBody py={6}>
          <VStack spacing={6}>
            <Text fontSize="lg" fontWeight="bold">
              みんなの投票結果
            </Text>

            <Grid templateColumns="repeat(auto-fit, minmax(120px, 1fr))" gap={4} w="full">
              {uniqueTiles.map(tileId => {
                const result = voteResult.find(r => Number(r.tileId) === tileId);
                const voteCount = result?.count || 0;
                const percentage = result?.percentage || 0;

                return (
                  <VStack key={tileId} spacing={2} align="center">
                    <Box position="relative">
                      <TileImage tileId={tileId} />
                      {myVoteTileId === tileId && (
                        <Box
                          position="absolute"
                          top="-2px"
                          right="-2px"
                          w="20px"
                          h="20px"
                          bg="pink.500"
                          borderRadius="full"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          fontSize="xs"
                          fontWeight="bold">
                          ✓
                        </Box>
                      )}
                    </Box>

                    <VStack spacing={1}>
                      <Text fontSize="sm" fontWeight="bold">
                        {voteCount}票
                      </Text>
                      <Text fontSize="xs" color="gray.400">
                        {percentage.toFixed(1)}%
                      </Text>
                    </VStack>

                    <VoteButton
                      problem={problem}
                      tileId={tileId}
                      myVoteTileId={myVoteTileId}
                      setMyVoteTileId={setMyVoteTileId}
                      setVotesCount={setVotesCount}
                      voteResult={voteResult}
                      setVoteResult={setVoteResult}
                    />
                  </VStack>
                );
              })}
            </Grid>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Text fontSize="sm" color="gray.400">
            総投票数: {voteResult.reduce((sum, r) => sum + r.count, 0)}票
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
