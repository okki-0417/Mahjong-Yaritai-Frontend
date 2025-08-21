import { Box, VStack, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import Profile from "@/src/features/users/[id]/Profile";
import createApiPageClient from "@/src/lib/api/server";

export default async function ProfileSection({ id }: { id: string }) {
  const apiPageClient = await createApiPageClient();

  try {
    const user_response = await apiPageClient.getUser({ params: { id } });
    const session_response = await apiPageClient.getSession();

    return (
      <Profile
        user={user_response.user}
        isMyProfile={session_response.user_id == user_response.user.id}
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
