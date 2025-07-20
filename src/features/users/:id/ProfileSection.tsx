import { Box, VStack, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import Profile from "@/src/features/users/:id/Profile";
import createApiPageClient from "@/src/lib/api/server";

export default async function ProfileSection({ id }: { id: string }) {
  const apiPageClient = await createApiPageClient();

  try {
    const response = await apiPageClient.getUser({
      params: {
        id,
      },
    });

    return <Profile initialUser={response.user} />;
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
                <br />
                しばらく時間をおいてから再度お試しください。
              </AlertDescription>
            </Box>
          </Alert>
        </VStack>
      </Box>
    );
  }
}
