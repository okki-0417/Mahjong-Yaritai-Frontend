"use client";

import useErrorToast from "@/src/hooks/useErrorToast";
import { apiClient } from "@/src/lib/api/client";
import { schemas } from "@/src/zodios/api";
import { Button, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { z } from "zod";

export default function LoadNextPageProblemButton({
  setProblem,
  cursor,
  setCursor,
}: {
  setProblem: Dispatch<SetStateAction<z.infer<typeof schemas.WhatToDiscardProblem>[]>>;
  cursor: z.infer<typeof schemas.CursorPagination> | null;
  setCursor: Dispatch<SetStateAction<z.infer<typeof schemas.CursorPagination> | null>>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const errorToast = useErrorToast();

  const handleLoadNextPage = async () => {
    if (!cursor?.has_next || !cursor.next || isLoading) return;

    setIsLoading(true);
    try {
      const response = await apiClient.getWhatToDiscardProblems({
        queries: {
          limit: String(cursor.limit),
        },
      });

      setProblem(prev => [...prev, ...response.what_to_discard_problems]);
      setCursor(response.meta.cursor || null);
    } catch (error) {
      errorToast({
        error,
        title: "何切る問題の読み込みに失敗しました",
        description: "しばらく時間をおいてから再度お試しください。",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!cursor?.has_next) {
    return <Text textAlign="center">すべての問題を読み込みました 🎉</Text>;
  }

  return (
    <Button isLoading={isLoading} onClick={handleLoadNextPage}>
      さらに読み込む
    </Button>
  );
}
