import TileImage from "@/src/components/TileImage";
import VoteButton from "@/src/app/what-to-discard-problems/components/votes/VoteButton";
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
  // 手牌とツモ牌のユニークな並びを生成
  const uniqueTiles = useMemo(() => {
    const allTiles = [
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
      problem.tsumo_id,
    ].filter(Boolean);

    // ユニークな牌IDを取得
    const uniqueTileIds = Array.from(new Set(allTiles));

    // 各牌の投票結果を取得
    return uniqueTileIds.map(tileId => {
      const voteData = voteResult.find(result => result.tile_id === tileId);
      return {
        tile_id: tileId,
        count: voteData?.count || 0,
        is_voted_by_me: voteData?.is_voted_by_me || false,
      };
    });
  }, [problem, voteResult]);

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
            {uniqueTiles.map(tile => {
              const maxCount = Math.max(...uniqueTiles.map(t => t.count));
              const hasVotes = maxCount > 0;

              return (
                <Grid key={tile.tile_id} gridTemplateRows="repeat(5,minmax(0,1fr))" gap="1">
                  <VStack gridRow="span 4/ span 4" justifyContent="flex-end" gap="0">
                    {tile.count > 0 && (
                      <Text fontFamily="sans-serif" className="text-neutral">
                        {tile.count}
                      </Text>
                    )}

                    {hasVotes && tile.count > 0 && (
                      <Box
                        className={`${tile.is_voted_by_me ? "bg-sky-400" : "bg-green-400"} `}
                        borderTopRadius="sm"
                        w="6"
                        border="1px solid white"
                        borderBottom="0px"
                        shadow="sm"
                        style={{
                          height: `${Math.round((tile.count / maxCount) * 100)}%`,
                        }}
                      />
                    )}
                  </VStack>

                  <Box gridRow="span 1/span 1">
                    <VoteButton
                      problem={problem}
                      tileId={tile.tile_id}
                      myVoteTileId={myVoteTileId}
                      setMyVoteTileId={setMyVoteTileId}
                      voteResult={voteResult}
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
