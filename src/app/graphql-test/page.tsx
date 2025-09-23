"use client";

import { ApolloProvider, useQuery } from "@apollo/client/react";
import { apolloClient } from "@/src/lib/apollo/client";
import { CurrentSessionDocument } from "@/src/generated/graphql";
import { Box, Heading, Text, VStack, Spinner, Alert, AlertIcon } from "@chakra-ui/react";

function SessionDisplay() {
  const { data, loading, error } = useQuery(CurrentSessionDocument);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={8}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        エラー: {error.message}
      </Alert>
    );
  }

  return (
    <VStack align="stretch" spacing={4}>
      <Heading size="md">GraphQL セッション情報</Heading>

      <Box p={4} borderWidth={1} borderRadius="md">
        <Text>
          <strong>ログイン状態:</strong>{" "}
          {data?.currentSession.isLoggedIn ? "ログイン中" : "未ログイン"}
        </Text>
        <Text>
          <strong>ユーザーID:</strong> {data?.currentSession.userId ?? "なし"}
        </Text>

        {data?.currentSession.user && (
          <Box mt={4} p={3} borderRadius="md">
            <Heading size="sm" mb={2}>
              ユーザー情報
            </Heading>
            <Text>
              <strong>ID:</strong> {data.currentSession.user.id}
            </Text>
            <Text>
              <strong>名前:</strong> {data.currentSession.user.name}
            </Text>
            {data.currentSession.user.avatarUrl && (
              <Text>
                <strong>アバターURL:</strong> {data.currentSession.user.avatarUrl}
              </Text>
            )}
          </Box>
        )}
      </Box>

      <Box p={4} borderRadius="md">
        <Heading size="sm" mb={2}>
          Raw Response
        </Heading>
        <Text as="pre" fontSize="sm" whiteSpace="pre-wrap">
          {JSON.stringify(data, null, 2)}
        </Text>
      </Box>
    </VStack>
  );
}

export default function GraphQLTestPage() {
  return (
    <ApolloProvider client={apolloClient}>
      <Box maxW="container.md" mx="auto" p={8}>
        <Heading mb={6}>GraphQL 接続テスト</Heading>
        <SessionDisplay />
      </Box>
    </ApolloProvider>
  );
}
