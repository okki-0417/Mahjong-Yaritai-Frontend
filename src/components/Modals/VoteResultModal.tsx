"use client";

import VoteButton from "@/src/app/what-to-discard-problems/components/votes/VoteButton";
import { WhatToDiscardProblemVoteResult } from "@/src/generated/graphql";
import {
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

type Props = {
  problemId: string;
  voteResults: WhatToDiscardProblemVoteResult[];
  isOpen: boolean;
  onClose: () => void;
  myVoteTileId: string | null;
  doraId: string;
  /* eslint-disable-next-line no-unused-vars */
  onVoteCreate: (tileId: string) => void;
  onVoteDelete: () => void;
};

export default function VoteResultModal({
  doraId,
  problemId,
  voteResults = [],
  isOpen,
  onClose,
  onVoteCreate,
  onVoteDelete,
  myVoteTileId,
}: Props) {
  const sortedVoteResults = [...voteResults].sort((a, b) => Number(b.tileId) - Number(a.tileId));

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader fontFamily="serif">投票結果</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <VStack spacing={6}>
            <Grid templateColumns="repeat(auto-fit, minmax(120px, 1fr))" gap={4} w="full">
              {sortedVoteResults.map(result => {
                const tileId = result.tileId;
                const voteCount = result.count;
                const percentage = result.percentage;

                return (
                  <VStack key={tileId} spacing={2} align="center">
                    <VStack spacing={1}>
                      <Text fontSize="sm" fontWeight="bold">
                        {voteCount}票
                      </Text>
                      <Text fontSize="xs" color="gray.400">
                        {percentage.toFixed(1)}%
                      </Text>
                    </VStack>

                    <VoteButton
                      problemId={problemId}
                      doraId={doraId}
                      tileId={result.tileId}
                      isVoted={Boolean(myVoteTileId == result.tileId)}
                      onCreate={() => onVoteCreate(result.tileId)}
                      onDelete={onVoteDelete}
                    />
                  </VStack>
                );
              })}
            </Grid>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Text fontSize="sm" color="gray.400">
            総投票数: {voteResults.reduce((sum, r) => sum + r.count, 0)}票
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
