import { Box, VStack, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import createApiPageClient from "@/src/lib/api/server";
import UserProfile from "@/src/components/UserProfile";

export default async function UserProfileSection({ id }: { id: string }) {
  const apiPageClient = await createApiPageClient();

  try {
    const [userResponse, sessionResponse] = await Promise.all([
      apiPageClient.getUser({
        params: {
          id,
        },
      }),
      apiPageClient.getSession(),
    ]);

    return (
      <UserProfile
        user={userResponse.user}
        isFollowing={userResponse.user.is_following}
        currentUserId={sessionResponse.session.user_id}
      />
    );
  } catch (error) {
    return (
      <Box textAlign="center" py={16}>
        <VStack spacing={4}>
          <Alert status="error" maxW="md" borderRadius="md">
            <AlertIcon />
            <Box>
              <AlertTitle>エラーが発生しました</AlertTitle>
              <AlertDescription>
                ユーザー情報の取得に失敗しました。
                {error.message}
              </AlertDescription>
            </Box>
          </Alert>
        </VStack>
      </Box>
    );
  }
}
