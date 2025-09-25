"use client";

import {
  CreateWhatToDiscardProblemVoteDocument,
  DeleteWhatToDiscardProblemVoteDocument,
} from "@/src/generated/graphql";
import { useMutation } from "@apollo/client/react";
import { Box, Button, Heading, Input, Text, VStack, useToast } from "@chakra-ui/react";
import { useState } from "react";

export default function VoteTestSection() {
  const [problemId, setProblemId] = useState("1");
  const [tileId, setTileId] = useState("1");
  const toast = useToast();

  const [createVote, { loading: creating }] = useMutation(CreateWhatToDiscardProblemVoteDocument);
  const [deleteVote, { loading: deleting }] = useMutation(DeleteWhatToDiscardProblemVoteDocument);

  const handleCreateVote = async () => {
    try {
      const result = await createVote({
        variables: {
          whatToDiscardProblemId: problemId,
          tileId: tileId,
        },
      });

      if (result.data?.createWhatToDiscardProblemVote?.vote) {
        toast({
          title: "投票成功",
          description: `Vote ID: ${result.data.createWhatToDiscardProblemVote.vote.id}`,
          status: "success",
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        title: "投票失敗",
        description: error.message,
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleDeleteVote = async () => {
    try {
      const result = await deleteVote({
        variables: {
          whatToDiscardProblemId: problemId,
        },
      });

      if (result.data?.deleteWhatToDiscardProblemVote?.success) {
        toast({
          title: "投票削除成功",
          status: "success",
          duration: 3000,
        });
      } else {
        toast({
          title: "投票削除失敗",
          description: result.data?.deleteWhatToDiscardProblemVote?.errors?.join(", "),
          status: "error",
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        title: "投票削除失敗",
        description: error.message,
        status: "error",
        duration: 3000,
      });
    }
  };

  return (
    <VStack align="stretch" spacing={4}>
      <Heading size="md">投票Mutationテスト (GraphQL)</Heading>

      <Box>
        <Text fontSize="sm" mb={2}>
          問題ID:
        </Text>
        <Input value={problemId} onChange={e => setProblemId(e.target.value)} />
      </Box>

      <Box>
        <Text fontSize="sm" mb={2}>
          牌ID:
        </Text>
        <Input value={tileId} onChange={e => setTileId(e.target.value)} />
      </Box>

      <Button onClick={handleCreateVote} colorScheme="blue" isLoading={creating}>
        投票する
      </Button>

      <Button onClick={handleDeleteVote} colorScheme="red" isLoading={deleting}>
        投票を削除
      </Button>

      <Text fontSize="sm" color="gray.600">
        ※ログインが必要です
      </Text>
    </VStack>
  );
}
