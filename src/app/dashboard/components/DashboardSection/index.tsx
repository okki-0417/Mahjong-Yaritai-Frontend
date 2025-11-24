import ProfileEditButton from "@/src/app/dashboard/components/DashboardSection/ProfileEditButton";
import UserDashboardMenu from "@/src/app/dashboard/components/DashboardSection/UserDashboardMenu";
import { FollowStats } from "@/src/components/FollowStats";
import { User } from "@/src/generated/graphql";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Center,
  HStack,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";

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

      <VStack spacing={4} align="stretch" mt="8">
        <LinkBox>
          <Button
            as={Card}
            variant="link"
            w="full"
            bg="secondary.300"
            _hover={{ bg: "secondary.100" }}
            color="neutral.50">
            <CardBody w="full" textAlign="left">
              <LinkOverlay as={Link} href="/me/what-to-discard-problems/voted">
                投票した何切る問題
              </LinkOverlay>
            </CardBody>
          </Button>
        </LinkBox>
      </VStack>
    </VStack>
  );
}
