"use client";

import ProblemsPresentation from "@/src/app/what-to-discard-problems/components/ProblemsPresentation";
import ProblemsContextProvider from "@/src/app/what-to-discard-problems/context-providers/ProblemsContextProvider";
import SessionContextProvider from "@/src/app/what-to-discard-problems/context-providers/SessionContextProvider";
import { CurrentSessionDocument, WhatToDiscardProblemsDocument } from "@/src/generated/graphql";
import { adaptGraphQLProblemListNodeToREST } from "@/src/lib/graphql/adapters";
import { useQuery } from "@apollo/client/react";
import { Box, Spinner, Text, VStack } from "@chakra-ui/react";

export default function ProblemsSectionWithGraphQL() {
  const { data: sessionData } = useQuery(CurrentSessionDocument);
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

  const problems =
    data?.whatToDiscardProblems.edges.map(edge => adaptGraphQLProblemListNodeToREST(edge.node)) ||
    [];

  // GraphQLの生データも保持
  const graphqlProblems = data?.whatToDiscardProblems.edges.map(edge => edge.node) || [];

  const cursor = data?.whatToDiscardProblems.pageInfo.endCursor
    ? {
        next: Number(data.whatToDiscardProblems.pageInfo.endCursor),
        has_next: data.whatToDiscardProblems.pageInfo.hasNextPage,
        limit: 3,
      }
    : null;

  const session = sessionData?.currentSession
    ? {
        is_logged_in: sessionData.currentSession.isLoggedIn,
        user_id: sessionData.currentSession.userId ?? undefined,
        user: sessionData.currentSession.user
          ? {
              id: Number(sessionData.currentSession.user.id),
              name: sessionData.currentSession.user.name,
              avatar_url: sessionData.currentSession.user.avatarUrl ?? undefined,
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
