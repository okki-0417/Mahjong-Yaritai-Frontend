"use client";

import useErrorToast from "@/src/hooks/useErrorToast";
import { Button, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { WhatToDiscardProblem } from "@/src/generated/graphql";
import { useLazyQuery } from "@apollo/client/react";
import { WhatToDiscardProblemsDocument } from "@/src/generated/graphql";

export default function LoadNextPageProblemButton({
  setProblem,
  initialCursor,
}: {
  setProblem: Dispatch<SetStateAction<WhatToDiscardProblem[]>>;
  initialCursor: { hasNextPage: boolean; endCursor?: string | null } | null;
}) {
  const [cursor, setCursor] = useState<{ hasNextPage: boolean; endCursor?: string | null } | null>(
    initialCursor,
  );
  const errorToast = useErrorToast();

  const [getMoreProblems, { loading }] = useLazyQuery(WhatToDiscardProblemsDocument);

  const handleLoadNextPage = async () => {
    if (!cursor?.hasNextPage || !cursor.endCursor || loading) return;

    try {
      const { data } = await getMoreProblems({
        variables: {
          cursor: cursor.endCursor,
          limit: 3,
        },
      });

      if (data?.whatToDiscardProblems) {
        const newProblems = data.whatToDiscardProblems.edges.map(edge => {
          const graphqlProblem = edge.node;
          // GraphQL レスポンスを完全な WhatToDiscardProblem 型に変換
          return {
            ...graphqlProblem,
            // 不足しているフィールドを補完
            comments: [],
            updatedAt: graphqlProblem.createdAt,
            user: {
              ...graphqlProblem.user,
              createdAt: graphqlProblem.createdAt,
              followersCount: 0,
              followingCount: 0,
              isFollowing: false,
              updatedAt: graphqlProblem.createdAt,
            },
            myVote: graphqlProblem.myVote
              ? {
                  ...graphqlProblem.myVote,
                  createdAt: graphqlProblem.createdAt,
                  updatedAt: graphqlProblem.createdAt,
                  userId: "unknown",
                  whatToDiscardProblemId: graphqlProblem.id,
                  tile: {
                    id: graphqlProblem.myVote.tileId,
                    suit: "unknown",
                    ordinalNumberInSuit: 0,
                    __typename: "Tile" as const,
                  },
                }
              : null,
            dora: graphqlProblem.doraId
              ? {
                  id: graphqlProblem.doraId.id,
                  suit: "unknown",
                  ordinalNumberInSuit: 0,
                  __typename: "Tile" as const,
                }
              : null,
            hand1: graphqlProblem.hand1Id
              ? {
                  id: graphqlProblem.hand1Id.id,
                  suit: "unknown",
                  ordinalNumberInSuit: 0,
                  __typename: "Tile" as const,
                }
              : null,
            hand2: graphqlProblem.hand2Id
              ? {
                  id: graphqlProblem.hand2Id.id,
                  suit: "unknown",
                  ordinalNumberInSuit: 0,
                  __typename: "Tile" as const,
                }
              : null,
            hand3: graphqlProblem.hand3Id
              ? {
                  id: graphqlProblem.hand3Id.id,
                  suit: "unknown",
                  ordinalNumberInSuit: 0,
                  __typename: "Tile" as const,
                }
              : null,
            hand4: graphqlProblem.hand4Id
              ? {
                  id: graphqlProblem.hand4Id.id,
                  suit: "unknown",
                  ordinalNumberInSuit: 0,
                  __typename: "Tile" as const,
                }
              : null,
            hand5: graphqlProblem.hand5Id
              ? {
                  id: graphqlProblem.hand5Id.id,
                  suit: "unknown",
                  ordinalNumberInSuit: 0,
                  __typename: "Tile" as const,
                }
              : null,
            hand6: graphqlProblem.hand6Id
              ? {
                  id: graphqlProblem.hand6Id.id,
                  suit: "unknown",
                  ordinalNumberInSuit: 0,
                  __typename: "Tile" as const,
                }
              : null,
            hand7: graphqlProblem.hand7Id
              ? {
                  id: graphqlProblem.hand7Id.id,
                  suit: "unknown",
                  ordinalNumberInSuit: 0,
                  __typename: "Tile" as const,
                }
              : null,
            hand8: graphqlProblem.hand8Id
              ? {
                  id: graphqlProblem.hand8Id.id,
                  suit: "unknown",
                  ordinalNumberInSuit: 0,
                  __typename: "Tile" as const,
                }
              : null,
            hand9: graphqlProblem.hand9Id
              ? {
                  id: graphqlProblem.hand9Id.id,
                  suit: "unknown",
                  ordinalNumberInSuit: 0,
                  __typename: "Tile" as const,
                }
              : null,
            hand10: graphqlProblem.hand10Id
              ? {
                  id: graphqlProblem.hand10Id.id,
                  suit: "unknown",
                  ordinalNumberInSuit: 0,
                  __typename: "Tile" as const,
                }
              : null,
            hand11: graphqlProblem.hand11Id
              ? {
                  id: graphqlProblem.hand11Id.id,
                  suit: "unknown",
                  ordinalNumberInSuit: 0,
                  __typename: "Tile" as const,
                }
              : null,
            hand12: graphqlProblem.hand12Id
              ? {
                  id: graphqlProblem.hand12Id.id,
                  suit: "unknown",
                  ordinalNumberInSuit: 0,
                  __typename: "Tile" as const,
                }
              : null,
            hand13: graphqlProblem.hand13Id
              ? {
                  id: graphqlProblem.hand13Id.id,
                  suit: "unknown",
                  ordinalNumberInSuit: 0,
                  __typename: "Tile" as const,
                }
              : null,
            tsumo: graphqlProblem.tsumoId
              ? {
                  id: graphqlProblem.tsumoId.id,
                  suit: "unknown",
                  ordinalNumberInSuit: 0,
                  __typename: "Tile" as const,
                }
              : null,
            bookmarksCount: 0,
            isBookmarkedByMe: false,
            isLikedByMe: false,
            voteResults: [],
          } as unknown as WhatToDiscardProblem;
        });
        setProblem(prev => [...prev, ...newProblems]);
        setCursor(data.whatToDiscardProblems.pageInfo);
      }
    } catch (error) {
      errorToast({
        error,
        title: "何切る問題の読み込みに失敗しました",
        description: "しばらく時間をおいてから再度お試しください。",
      });
    }
  };

  if (!cursor?.hasNextPage) {
    return <Text textAlign="center">すべての問題を読み込みました 🎉</Text>;
  }

  return (
    <Button isLoading={loading} onClick={handleLoadNextPage}>
      さらに読み込む
    </Button>
  );
}
