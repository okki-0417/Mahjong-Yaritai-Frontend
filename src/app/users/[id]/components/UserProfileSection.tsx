"use client";

import { Box, VStack, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import UserProfile from "@/src/components/UserProfile";
import { UserProfileDocument } from "@/src/generated/graphql";
import { useQuery } from "@apollo/client/react";

export default function UserProfileSection({ id }: { id: string }) {
  const { data, error } = useQuery(UserProfileDocument, {
    variables: { userId: id },
  });

  if (error || !data?.user) {
    return (
      <Box textAlign="center" py={16}>
        <VStack spacing={4}>
          <Alert status="error" maxW="md" borderRadius="md">
            <AlertIcon />
            <Box>
              <AlertTitle>ユーザーが見つかりません</AlertTitle>
              <AlertDescription>
                指定されたユーザーは存在しないか、削除されています。
              </AlertDescription>
            </Box>
          </Alert>
        </VStack>
      </Box>
    );
  }

  return <UserProfile user={data.user} />;
}
