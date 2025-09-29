"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import { BookmarkedWhatToDiscardProblemsDocument } from "@/src/generated/graphql";
import { VStack, Text, Button, Box } from "@chakra-ui/react";
import ProblemCard from "@/src/app/what-to-discard-problems/components/ProblemCard";
import { z } from "zod";
import { schemas } from "@/src/zodios/api";
import SessionContextProvider from "@/src/app/what-to-discard-problems/context-providers/SessionContextProvider";
import ProblemsContextProvider from "@/src/app/what-to-discard-problems/context-providers/ProblemsContextProvider";

export default function BookmarkedProblemsSection({
  session,
}: {
  session: z.infer<typeof schemas.Session> | null;
}) {
  const [problems, setProblems] = useState<z.infer<typeof schemas.WhatToDiscardProblem>[]>([]);
  const [graphqlProblems, setGraphqlProblems] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(false);

  const { data, loading, error, fetchMore } = useQuery(BookmarkedWhatToDiscardProblemsDocument, {
    variables: { limit: 10 },
  });

  useEffect(() => {
    if (!data?.bookmarkedWhatToDiscardProblems) {
      return;
    }

    const edges = data.bookmarkedWhatToDiscardProblems.edges;
    const pageInfo = data.bookmarkedWhatToDiscardProblems.pageInfo;

    // GraphQLデータをREST API形式に変換
    const convertedProblems = edges.map((edge: any) => {
      const node = edge.node;
      return {
        id: Number(node.id),
        round: node.round,
        turn: node.turn,
        wind: node.wind,
        points: node.points,
        description: node.description,
        votes_count: node.votesCount,
        comments_count: node.commentsCount,
        likes_count: node.likesCount,
        bookmarks_count: node.bookmarksCount,
        created_at: node.createdAt,
        updated_at: node.updatedAt,
        is_liked_by_me: node.isLikedByMe,
        is_bookmarked_by_me: node.isBookmarkedByMe,
        user: {
          id: Number(node.user.id),
          name: node.user.name,
          avatar_url: node.user.avatarUrl,
          is_following: node.user.isFollowing,
        },
        dora_id: Number(node.dora?.id),
        hand1_id: Number(node.hand1?.id),
        hand2_id: Number(node.hand2?.id),
        hand3_id: Number(node.hand3?.id),
        hand4_id: Number(node.hand4?.id),
        hand5_id: Number(node.hand5?.id),
        hand6_id: Number(node.hand6?.id),
        hand7_id: Number(node.hand7?.id),
        hand8_id: Number(node.hand8?.id),
        hand9_id: Number(node.hand9?.id),
        hand10_id: Number(node.hand10?.id),
        hand11_id: Number(node.hand11?.id),
        hand12_id: Number(node.hand12?.id),
        hand13_id: Number(node.hand13?.id),
        tsumo_id: Number(node.tsumo?.id),
      };
    });

    setProblems(convertedProblems);
    setGraphqlProblems(edges.map(edge => edge.node));
    setHasMore(pageInfo.hasNextPage);
  }, [data]);

  const handleLoadMore = async () => {
    if (!data?.bookmarkedWhatToDiscardProblems?.pageInfo?.endCursor) return;

    const { data: moreData } = await fetchMore({
      variables: {
        cursor: data.bookmarkedWhatToDiscardProblems.pageInfo.endCursor,
        limit: 10,
      },
    });

    if (moreData?.bookmarkedWhatToDiscardProblems) {
      const edges = moreData.bookmarkedWhatToDiscardProblems.edges;
      const pageInfo = moreData.bookmarkedWhatToDiscardProblems.pageInfo;

      const convertedProblems = edges.map((edge: any) => {
        const node = edge.node;
        return {
          id: Number(node.id),
          round: node.round,
          turn: node.turn,
          wind: node.wind,
          points: node.points,
          description: node.description,
          votes_count: node.votesCount,
          comments_count: node.commentsCount,
          likes_count: node.likesCount,
          bookmarks_count: node.bookmarksCount,
          created_at: node.createdAt,
          updated_at: node.updatedAt,
          is_liked_by_me: node.isLikedByMe,
          is_bookmarked_by_me: node.isBookmarkedByMe,
          user: {
            id: Number(node.user.id),
            name: node.user.name,
            avatar_url: node.user.avatarUrl,
            is_following: node.user.isFollowing,
          },
          dora_id: Number(node.dora?.id),
          hand1_id: Number(node.hand1?.id),
          hand2_id: Number(node.hand2?.id),
          hand3_id: Number(node.hand3?.id),
          hand4_id: Number(node.hand4?.id),
          hand5_id: Number(node.hand5?.id),
          hand6_id: Number(node.hand6?.id),
          hand7_id: Number(node.hand7?.id),
          hand8_id: Number(node.hand8?.id),
          hand9_id: Number(node.hand9?.id),
          hand10_id: Number(node.hand10?.id),
          hand11_id: Number(node.hand11?.id),
          hand12_id: Number(node.hand12?.id),
          hand13_id: Number(node.hand13?.id),
          tsumo_id: Number(node.tsumo?.id),
        };
      });

      setProblems(prev => [...prev, ...convertedProblems]);
      setGraphqlProblems(prev => [...prev, ...edges.map(edge => edge.node)]);
      setHasMore(pageInfo.hasNextPage);
    }
  };

  if (loading && problems.length === 0) {
    return <Text>読み込み中...</Text>;
  }

  if (error) {
    return <Text color="red.500">エラーが発生しました: {error.message}</Text>;
  }

  if (problems.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Text color="gray.500" fontSize="lg">
          ブックマークした問題はありません
        </Text>
        <Text color="gray.400" mt={2}>
          問題をブックマークすると、ここに表示されます
        </Text>
      </Box>
    );
  }

  return (
    <ProblemsContextProvider initialProblems={problems}>
      <SessionContextProvider session={session}>
        <VStack spacing={6} w="full">
          {problems.map((problem, index) => {
            const graphqlProblem = graphqlProblems[index];
            return (
              <ProblemCard key={problem.id} problem={problem} graphqlProblem={graphqlProblem} />
            );
          })}

          {hasMore && (
            <Button
              onClick={handleLoadMore}
              isLoading={loading}
              loadingText="読み込み中..."
              size="lg"
              variant="outline"
              colorScheme="blue">
              もっと見る
            </Button>
          )}
        </VStack>
      </SessionContextProvider>
    </ProblemsContextProvider>
  );
}
