import ProfileEditButton from "@/src/app/dashboard/components/DashboardSection/ProfileEditButton";
import UserDashboardMenu from "@/src/app/dashboard/components/DashboardSection/UserDashboardMenu";
import { FollowStats } from "@/src/components/FollowStats";
import { User } from "@/src/generated/graphql";
import { Avatar, Box, Center, HStack, Text, VStack } from "@chakra-ui/react";

type Props = {
  user: User;
};

export default function DashboardSection({ user }: Props) {
  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <HStack justify="end" gap="0">
          <ProfileEditButton />

          <UserDashboardMenu />
        </HStack>

        <HStack justify="space-between">
          <HStack justify="start" w="full" gap="4">
            <Center>
              <Avatar src={user?.avatarUrl || ""} size="lg" />
            </Center>
            <Text fontSize="xl" fontWeight="bold">
              {user.name}
            </Text>
          </HStack>
        </HStack>
      </Box>

      <Text fontSize="sm" noOfLines={3}>
        {user?.profileText ? user.profileText : <i>自己紹介文が未設定です。</i>}
      </Text>

      <HStack justify="start">
        <FollowStats followingCount={user.followingCount} followersCount={user.followersCount} />
      </HStack>
    </VStack>
  );
}
