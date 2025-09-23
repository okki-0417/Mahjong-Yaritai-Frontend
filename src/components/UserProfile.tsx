import { schemas } from "@/src/zodios/api";
import { Box, Circle, Image, Text, VStack } from "@chakra-ui/react";
import { z } from "zod";
import FollowButton from "@/src/components/FollowButton";

export default function UserProfile({
  user,
  isFollowing = false,
  currentUserId = null,
}: {
  user: z.infer<typeof schemas.User>;
  isFollowing?: boolean;
  currentUserId?: number | null;
}) {
  return (
    <VStack gap="4" align="stretch">
      <VStack spacing={4}>
        <Circle size={["150", "200"]} overflow="hidden">
          <Image
            src={user?.avatar_url || "/no-image.webp"}
            w="full"
            h="full"
            objectFit="cover"
            draggable="false"
            bgColor="white"
          />
        </Circle>

        <Box textAlign="center" maxW="md" mx="auto">
          <Text fontSize={["2xl", "4xl"]} wordBreak="break-word">
            {user?.name}
          </Text>
        </Box>

        <FollowButton
          userId={user.id}
          initialIsFollowing={isFollowing}
          currentUserId={currentUserId}
          size="lg"
        />

        <Box>
          {user?.profile_text ? (
            <Text fontSize={["md", "lg"]} whiteSpace="pre-wrap" wordBreak="break-word">
              {user.profile_text}
            </Text>
          ) : (
            <Text fontSize={["md", "lg"]} color="gray.500" fontStyle="italic">
              自己紹介文が設定されていません
            </Text>
          )}
        </Box>
      </VStack>
    </VStack>
  );
}
