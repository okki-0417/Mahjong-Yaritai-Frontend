"use client";

import ProblemCard from "@/src/app/what-to-discard-problems/components/ProblemCard";
import ProblemsContextProvider from "@/src/app/what-to-discard-problems/context-providers/ProblemsContextProvider";
import SessionContextProvider from "@/src/app/what-to-discard-problems/context-providers/SessionContextProvider";
import {
  CurrentSessionDocument,
  WhatToDiscardProblemDocument,
  WhatToDiscardProblem,
} from "@/src/generated/graphql";
import { useQuery } from "@apollo/client/react";
import { Box, Spinner, Text } from "@chakra-ui/react";

export default function ProblemCardWithGraphQL({ problemId }: { problemId: string }) {
  const { data: sessionData } = useQuery(CurrentSessionDocument);
  const { data, loading, error } = useQuery(WhatToDiscardProblemDocument, {
    variables: { id: problemId },
  });

  if (loading) {
    return (
      <Box className="md:max-w-2xl w-screen px-1" py={8} textAlign="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="md:max-w-2xl w-screen px-1" py={8} textAlign="center">
        <Text color="red.500">問題の読み込みに失敗しました</Text>
        <Text fontSize="sm" color="gray.600">
          {error.message}
        </Text>
      </Box>
    );
  }

  if (!data?.whatToDiscardProblem) {
    return (
      <Box className="md:max-w-2xl w-screen px-1" py={8} textAlign="center">
        <Text>問題が見つかりませんでした</Text>
      </Box>
    );
  }

  // GraphQLの型をWhatToDiscardProblem型に変換
  const graphqlProblem = data.whatToDiscardProblem;
  const problem: WhatToDiscardProblem = {
    ...graphqlProblem,
    user: {
      ...graphqlProblem.user,
      createdAt: graphqlProblem.createdAt,
      followersCount: 0,
      followingCount: 0,
      isFollowing: false,
      updatedAt: graphqlProblem.createdAt,
    },
    bookmarksCount: 0,
    comments: [],
    isBookmarkedByMe: false,
    isLikedByMe: false,
    voteResults: [],
  } as unknown as WhatToDiscardProblem;

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
    <ProblemsContextProvider initialProblems={[problem]}>
      <SessionContextProvider session={session}>
        <ProblemCard problem={problem} />
      </SessionContextProvider>
    </ProblemsContextProvider>
  );
}
