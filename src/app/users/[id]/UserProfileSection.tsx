import { Box, VStack, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import { getClient } from "@/src/lib/apollo/server";
import { UserProfileDocument, CurrentSessionDocument } from "@/src/generated/graphql";
import UserProfile from "@/src/components/UserProfile";

export default async function UserProfileSection({ id }: { id: string }) {
  const client = getClient();

  try {
    const [userResult, sessionResult] = await Promise.all([
      (client as any).query({
        query: UserProfileDocument,
        variables: { userId: id },
      }),
      (client as any).query({
        query: CurrentSessionDocument,
      }),
    ]);

    if (!userResult.data?.user) {
      throw new Error("User not found");
    }

    return (
      <UserProfile
        user={{
          id: Number(userResult.data.user.id),
          name: userResult.data.user.name,
          email: userResult.data.user.email,
          profile_text: userResult.data.user.profileText,
          avatar_url: userResult.data.user.avatarUrl,
          // This needs to be implemented in GraphQL schema
          is_following: false,
          created_at: userResult.data.user.createdAt,
          updated_at: userResult.data.user.updatedAt,
        }}
        // This needs to be implemented in GraphQL schema
        isFollowing={false}
        currentUserId={sessionResult.data?.currentSession?.userId}
      />
    );
  } catch {
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
}
