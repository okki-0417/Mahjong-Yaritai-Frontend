import TileImage from "@/src/components/TileImage";
import VoteButton from "@/src/features/what-to-discard-problems/components/votes/VoteButton";
import { schemas } from "@/src/zodios/api";
import {
  Box,
  Grid,
  HStack,
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
import { z } from "zod";

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
  voteResult: z.infer<typeof schemas.WhatToDiscardProblemVoteResult>[];
  isOpen: boolean;
  onClose: () => void;
  problem: z.infer<typeof schemas.WhatToDiscardProblem>;
  myVoteTileId: number | null;
  setMyVoteTileId: React.Dispatch<React.SetStateAction<number | null>>;
  setVotesCount: React.Dispatch<React.SetStateAction<number>>;
  setVoteResult: React.Dispatch<
    React.SetStateAction<z.infer<typeof schemas.WhatToDiscardProblemVoteResult>[]>
  >;
}) {
  return (
    <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose} isCentered size="3xl">
      <ModalOverlay />

      <ModalContent overflow="hidden">
        <ModalHeader className="bg-neutral" fontFamily="serif">
          投票結果
        </ModalHeader>

        <ModalCloseButton className="text-primary" />

        <ModalBody py="8" px={["1", "4"]} className=" bg-mj-mat" fontFamily="serif">
          <HStack w={["18", "24"]}>
            <Text as="span" className="text-neutral" fontSize={["md", "lg"]}>
              ドラ
            </Text>
            <Box w={["6", "8"]}>
              <TileImage tileId={problem.dora_id} hover={false} />
            </Box>
          </HStack>

          <HStack className="bg-mj-mat" justify="center" gap={["1px", "2"]}>
            {voteResult?.map((result, index) => {
              return (
                <Grid key={index} gridTemplateRows="repeat(5,minmax(0,1fr))" gap="1">
                  <VStack gridRow="span 4/ span 4" justifyContent="flex-end" gap="0">
                    <Text fontFamily="sans-serif" className="text-neutral">
                      {result.count}
                    </Text>

                    <Box
                      className={`${result.is_voted_by_me ? "bg-sky-400" : "bg-green-400"} `}
                      borderTopRadius="sm"
                      w="6"
                      border="1px solid white"
                      borderBottom="0px"
                      shadow="sm"
                      style={{
                        height: `${Math.round((result.count / Math.max(...voteResult.map(rslt => rslt?.count))) * 100)}%`,
                      }}
                    />
                  </VStack>

                  <Box gridRow="span 1/span 1">
                    <VoteButton
                      problem={problem}
                      tileId={result.tile_id}
                      myVoteTileId={myVoteTileId}
                      setMyVoteTileId={setMyVoteTileId}
                      setVotesCount={setVotesCount}
                      setVoteResult={setVoteResult}
                    />
                  </Box>
                </Grid>
              );
            })}
          </HStack>
        </ModalBody>

        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}
