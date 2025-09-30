"use client";

import ProblemsPresentation from "@/src/app/what-to-discard-problems/components/ProblemsPresentation";
import ProblemsContextProvider from "@/src/app/what-to-discard-problems/context-providers/ProblemsContextProvider";
import SessionContextProvider from "@/src/app/what-to-discard-problems/context-providers/SessionContextProvider";
import { WhatToDiscardProblemsDocument, WhatToDiscardProblem } from "@/src/generated/graphql";
import { useQuery } from "@apollo/client/react";
import { Box, Spinner, Text, VStack } from "@chakra-ui/react";
import { useGraphQLSession } from "@/src/app/what-to-discard-problems/context-providers/GraphQLSessionProvider";

export default function ProblemsSectionWithGraphQL() {
  const { session: sessionData } = useGraphQLSession();
  const { data, loading, error } = useQuery(WhatToDiscardProblemsDocument, {
    variables: { limit: 3 },
  });

  if (loading) {
    return (
      <Box textAlign="center" py={16}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={16}>
        <VStack spacing={4}>
          <Text fontSize="xl" fontWeight="bold" color="red.500">
            エラーが発生しました
          </Text>
          <Text fontSize="md">
            何切る問題の読み込み中にエラーが発生しました。しばらく時間をおいてから再度お試しください。
          </Text>
          <Text>{error.message}</Text>
        </VStack>
      </Box>
    );
  }

  // GraphQLの型をWhatToDiscardProblem型に変換
  const graphqlProblems = data?.whatToDiscardProblems.edges.map(edge => edge.node) || [];
  const problems: WhatToDiscardProblem[] = graphqlProblems.map(graphqlProblem => {
    return {
      ...graphqlProblem,
      comments: [],
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
    } as unknown as WhatToDiscardProblem;
  });

  const cursor = data?.whatToDiscardProblems.pageInfo.endCursor
    ? {
        next: Number(data.whatToDiscardProblems.pageInfo.endCursor),
        has_next: data.whatToDiscardProblems.pageInfo.hasNextPage,
        hasNextPage: data.whatToDiscardProblems.pageInfo.hasNextPage,
        endCursor: data.whatToDiscardProblems.pageInfo.endCursor,
        limit: 3,
      }
    : null;

  const session = sessionData
    ? {
        is_logged_in: sessionData.isLoggedIn,
        user_id: sessionData.userId ?? undefined,
        user: sessionData.user
          ? {
              id: Number(sessionData.user.id),
              name: sessionData.user.name,
              avatar_url: sessionData.user.avatarUrl ?? undefined,
            }
          : undefined,
      }
    : null;

  return (
    <ProblemsContextProvider initialProblems={problems}>
      <SessionContextProvider session={session}>
        <ProblemsPresentation initialCursor={cursor} graphqlProblems={graphqlProblems} />
      </SessionContextProvider>
    </ProblemsContextProvider>
  );
}
