"use client";

import useErrorToast from "@/src/hooks/useErrorToast";
import { Button, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { z } from "zod";
import { schemas } from "@/src/zodios/api";
import { apiClient } from "@/src/lib/api/client";

export default function LoadNextPageProblemButton({
  setProblem,
  initialCursor,
}: {
  setProblem: Dispatch<SetStateAction<z.infer<typeof schemas.WhatToDiscardProblem>[]>>;
  initialCursor: z.infer<typeof schemas.CursorPagination | null>;
}) {
  const [cursor, setCursor] =
    useState<z.infer<typeof schemas.CursorPagination | null>>(initialCursor);
  const errorToast = useErrorToast();

  const [loading, setLoading] = useState(false);

  const handleLoadNextPage = async () => {
    if (!cursor?.has_next || !cursor.next || loading) return;

    setLoading(true);
    try {
      const response = await apiClient.getWhatToDiscardProblems({
        queries: {
          cursor: String(cursor.next),
          limit: String(3),
        },
      });

      setProblem(prev => [...prev, ...response.what_to_discard_problems]);
      setCursor(response.meta.cursor);
    } catch (error) {
      errorToast({
        error,
        title: "何切る問題の読み込みに失敗しました",
        description: "しばらく時間をおいてから再度お試しください。",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!cursor?.has_next) {
    return <Text textAlign="center">すべての問題を読み込みました 🎉</Text>;
  }

  return (
    <Button isLoading={loading} onClick={handleLoadNextPage}>
      さらに読み込む
    </Button>
  );
}
