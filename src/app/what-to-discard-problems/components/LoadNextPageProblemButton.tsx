"use client";

import useErrorToast from "@/src/hooks/useErrorToast";
import { Button, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { z } from "zod";
import { schemas } from "@/src/zodios/api";
import { useLazyQuery } from "@apollo/client/react";
import { WhatToDiscardProblemsDocument } from "@/src/generated/graphql";

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

  const [loadProblems, { loading }] = useLazyQuery(WhatToDiscardProblemsDocument);

  const handleLoadNextPage = async () => {
    if (!cursor?.has_next || !cursor.next || loading) return;

    try {
      const { data } = await loadProblems({
        variables: {
          cursor: String(cursor.next),
          limit: 3,
        },
      });

      if (data?.whatToDiscardProblems?.edges) {
        // GraphQLデータをREST APIフォーマットに変換
        const graphqlProblems = data.whatToDiscardProblems.edges.map(edge => {
          const problem = edge.node;
          return {
            id: Number(problem.id),
            round: problem.round || null,
            turn: problem.turn || null,
            wind: problem.wind || null,
            points: problem.points ? Number(problem.points) : null,
            description: problem.description || null,
            votes_count: problem.votesCount,
            comments_count: problem.commentsCount,
            likes_count: problem.likesCount,
            created_at: problem.createdAt,
            updated_at: problem.updatedAt,
            user_id: Number(problem.user.id),
            dora_id: Number(problem.doraId.id),
            hand1_id: Number(problem.hand1Id.id),
            hand2_id: Number(problem.hand2Id.id),
            hand3_id: Number(problem.hand3Id.id),
            hand4_id: Number(problem.hand4Id.id),
            hand5_id: Number(problem.hand5Id.id),
            hand6_id: Number(problem.hand6Id.id),
            hand7_id: Number(problem.hand7Id.id),
            hand8_id: Number(problem.hand8Id.id),
            hand9_id: Number(problem.hand9Id.id),
            hand10_id: Number(problem.hand10Id.id),
            hand11_id: Number(problem.hand11Id.id),
            hand12_id: Number(problem.hand12Id.id),
            hand13_id: Number(problem.hand13Id.id),
            tsumo_id: Number(problem.tsumoId.id),
            user: {
              id: Number(problem.user.id),
              name: problem.user.name,
              avatar_url: problem.user.avatarUrl || null,
            },
          } as z.infer<typeof schemas.WhatToDiscardProblem>;
        });

        setProblem(prev => [...prev, ...graphqlProblems]);

        // GraphQLのページネーション情報を変換
        setCursor({
          has_next: data.whatToDiscardProblems.pageInfo.hasNextPage,
          next: data.whatToDiscardProblems.pageInfo.endCursor
            ? Number(data.whatToDiscardProblems.pageInfo.endCursor)
            : null,
        });
      }
    } catch (error) {
      errorToast({
        error,
        title: "何切る問題の読み込みに失敗しました",
        description: "しばらく時間をおいてから再度お試しください。",
      });
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
