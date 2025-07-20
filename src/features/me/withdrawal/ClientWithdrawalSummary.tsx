"use client";

import { Box, Button, Card, CardBody, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { AuthStateContext } from "@/src/context-providers/contexts/AuthContext";
import { apiClient } from "@/src/lib/api/client";
import { schemas } from "@/src/zodios/api";
import { z } from "zod";
import useErrorToast from "@/src/hooks/useErrorToast";
import useSuccessToast from "@/src/hooks/useSuccessToast";
import Link from "next/link";

export default function ClientWithdrawalSummary({
  summary,
}: {
  summary: z.infer<typeof schemas.WithdrawalSummary>;
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setAuth, setMyUserId } = useContext(AuthStateContext);
  const errorToast = useErrorToast();
  const successToast = useSuccessToast();

  const handleWithdrawal = async () => {
    const isConfirmed = confirm(
      `本当に退会しますか？\n\n以下のデータが削除されます：\n• 何切る問題: ${summary.what_to_discard_problems_count}件\n• すべてのコメント\n• プロフィール情報\n\nこの操作は取り消すことができません。`,
    );

    if (!isConfirmed) return;

    setIsSubmitting(true);

    try {
      await apiClient.withdrawUser([]);

      setAuth(false);
      setMyUserId(null);
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
          <VStack gap={4} align="stretch">
            <Text fontSize="xl" fontWeight="bold">
              退会に関する重要な情報
            </Text>

            <Box>
              <Text fontWeight="bold" color="red.500" mb={2}>
                ⚠️ 注意事項
              </Text>
              <VStack align="start" spacing={2}>
                <Text>• 退会すると、すべてのデータが削除されます</Text>
                <Text>• 作成した何切る問題やコメントも削除されます</Text>
                <Text>• 一度退会すると、データの復元はできません</Text>
              </VStack>
            </Box>

            <Box>
              <Text fontWeight="bold" mb={2}>
                削除される投稿数
              </Text>
              <Text fontSize="lg">何切る問題: {summary.what_to_discard_problems_count}件</Text>
            </Box>
          </VStack>
        </CardBody>
      </Card>

      <VStack gap={3}>
        <Button
          colorScheme="red"
          size="lg"
          onClick={handleWithdrawal}
          isLoading={isSubmitting}
          w="full">
          退会する
        </Button>

        <Link className="w-full block" href="/dashboard">
          <Button variant="outline" size="lg" w="full">
            キャンセル
          </Button>
        </Link>
      </VStack>
    </VStack>
  );
}
