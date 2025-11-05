"use client";

import { useLazyQuery } from "@apollo/client/react";
import { FollowersDocument, FollowingDocument, User } from "@/src/generated/graphql";
import { HStack, Text, Button, useDisclosure, useToast } from "@chakra-ui/react";
import { FollowingListModal } from "@/src/components/Modals/FollowingListModal";
import { FollowersListModal } from "@/src/components/Modals/FollowerListModal/index";
import { useState } from "react";

type Props = {
  followingCount: number;
  followersCount: number;
};

type Followings = User[];
type Followers = User[];

export function FollowStats({ followingCount, followersCount }: Props) {
  const [followings, setFollowings] = useState<Followings>([]);
  const [followers, setFollowers] = useState<Followers>([]);

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

  const [getFollowing, { loading: followingLoading }] = useLazyQuery(FollowingDocument);
  const [getFollowers, { loading: followersLoading }] = useLazyQuery(FollowersDocument);

  const toast = useToast();

  const handleFollowingOpen = async () => {
    const { data, error } = await getFollowing();

    if (error) {
      toast({
        title: "フォロー一覧の取得に失敗しました",
        description: error.message,
        status: "error",
      });
      return;
    }

    if (data) {
      const followingsData = data.followings.edges.map(edge => edge.node);
      setFollowings(followingsData);
    }

    onFollowingOpen();
  };

  const handleFollowersOpen = async () => {
    const { data, error } = await getFollowers();

    if (error) {
      toast({
        title: "フォロワー一覧の取得に失敗しました",
        description: error.message,
        status: "error",
      });
      return;
    }

    if (data) {
      const followersData = data.followers.edges.map(edge => edge.node);
      setFollowers(followersData);
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
