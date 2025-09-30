"use client";

import { Box, Button, Card, CardBody, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { WithdrawUserDocument, WithdrawUserMutation } from "@/src/generated/graphql";
import useErrorToast from "@/src/hooks/useErrorToast";
import useSuccessToast from "@/src/hooks/useSuccessToast";
import Link from "next/link";

type WithdrawalSummaryType = {
  what_to_discard_problems_count: number;
  comments_count: number;
  likes_count: number;
  votes_count: number;
};

export default function ClientWithdrawalSummary({ summary }: { summary: WithdrawalSummaryType }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const errorToast = useErrorToast();
  const successToast = useSuccessToast();

  const [withdrawUser] = useMutation<WithdrawUserMutation>(WithdrawUserDocument);

  const handleWithdrawal = async () => {
    const isConfirmed = confirm(
      `本当に退会しますか？\n\n以下のデータが削除されます：\n• 何切る問題: ${summary.what_to_discard_problems_count}件\n• すべてのコメント\n• プロフィール情報\n\nこの操作は取り消すことができません。`,
    );

    if (!isConfirmed) return;

    setIsSubmitting(true);

    try {
      const result = await withdrawUser({
        variables: {
          input: {},
        },
      });

      if (result.data?.withdrawUser?.errors && result.data.withdrawUser.errors.length > 0) {
        throw new Error(result.data.withdrawUser.errors.join(", "));
      }

      successToast({
        title: "退会が完了しました",
        description: "ご利用ありがとうございました。",
      });

      router.push("/");
    } catch (error) {
      errorToast({ error, title: "退会処理に失敗しました" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <VStack gap={6} align="stretch">
      <Card>
        <CardBody>
          <VStack align="start" gap={4}>
            <Text fontSize="lg" fontWeight="bold">
              退会前の確認
            </Text>
            <Text>退会すると以下のデータがすべて削除されます：</Text>
            <Box pl={4}>
              <Text>• 投稿した何切る問題: {summary.what_to_discard_problems_count}件</Text>
              <Text>• 投稿したコメント: {summary.comments_count}件</Text>
              <Text>• いいね: {summary.likes_count}件</Text>
              <Text>• 投票: {summary.votes_count}件</Text>
              <Text>• プロフィール情報</Text>
            </Box>
            <Text color="red.500" fontWeight="bold">
              ※ この操作は取り消すことができません
            </Text>
          </VStack>
        </CardBody>
      </Card>

      <Box display="flex" gap={4}>
        <Link href="/me/profile">
          <Button colorScheme="gray">キャンセル</Button>
        </Link>
        <Button
          colorScheme="red"
          onClick={handleWithdrawal}
          isLoading={isSubmitting}
          loadingText="退会処理中...">
          退会する
        </Button>
      </Box>
    </VStack>
  );
}
