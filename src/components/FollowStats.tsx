"use client";

import { useLazyQuery } from "@apollo/client/react";
import {
  FollowersDocument,
  FollowersQuery,
  FollowingDocument,
  FollowingQuery,
} from "@/src/generated/graphql";
import { HStack, Text, Button, useDisclosure, useToast } from "@chakra-ui/react";
import { FollowingListModal } from "@/src/components/Modals/FollowingListModal";
import { FollowersListModal } from "@/src/components/Modals/FollowerListModal/index";
import { useState } from "react";

type Props = {
  followingCount: number;
  followersCount: number;
};

export function FollowStats({ followingCount, followersCount }: Props) {
  const [followings, setFollowings] = useState<FollowingQuery["following"]["edges"]>([]);
  const [followers, setFollowers] = useState<FollowersQuery["followers"]["edges"]>([]);

  const {
    isOpen: isFollowingOpen,
    onOpen: onFollowingOpen,
    onClose: onFollowingClose,
  } = useDisclosure();
  const {
    isOpen: isFollowersOpen,
    onOpen: onFollowersOpen,
    onClose: onFollowersClose,
  } = useDisclosure();

  const [getFollowing, { data: followingData, loading: followingLoading, error: followingError }] =
    useLazyQuery(FollowingDocument);
  const [getFollowers, { data: followersData, loading: followersLoading, error: followersError }] =
    useLazyQuery(FollowersDocument);

  const toast = useToast();

  const handleFollowingOpen = async () => {
    await getFollowing();

    if (followingData?.following) setFollowings(followingData.following.edges);
    if (followingError) {
      toast({
        title: "フォロー一覧の取得に失敗しました",
        description: followingError.message,
        status: "error",
      });
    }
    onFollowingOpen();
  };

  const handleFollowersOpen = async () => {
    await getFollowers();

    if (followersData?.followers) setFollowers(followersData.followers.edges);
    if (followersError) {
      toast({
        title: "フォロワー一覧の取得に失敗しました",
        description: followersError.message,
        status: "error",
      });
    }
    onFollowersOpen();
  };

  return (
    <>
      <HStack spacing={6} justify="center">
        <Button onClick={handleFollowingOpen} isLoading={followingLoading}>
          <Text fontSize="sm">フォロー：{followingCount}</Text>
        </Button>

        <Button onClick={handleFollowersOpen} isLoading={followersLoading}>
          <Text fontSize="sm">フォロワー：{followersCount}</Text>
        </Button>
      </HStack>

      <FollowingListModal
        isOpen={isFollowingOpen}
        onClose={onFollowingClose}
        followings={followings}
      />

      <FollowersListModal
        isOpen={isFollowersOpen}
        onClose={onFollowersClose}
        followers={followers}
      />
    </>
  );
}
