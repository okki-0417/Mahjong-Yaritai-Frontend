"use client";

import UserModal from "@/src/components/Modals/UserModal";
import BookmarkButton from "@/src/components/BookmarkButton";
import { Button, Circle, HStack, Image, Text, useDisclosure } from "@chakra-ui/react";
import { WhatToDiscardProblem } from "@/src/generated/graphql";

import useGetSession from "@/src/hooks/useGetSession";
import ProblemOperationMenu from "@/src/app/what-to-discard-problems/components/ProblemSection/ProblemCard/ProblemCardHeader/ProblemOperationMenu";

type Props = {
  problem: WhatToDiscardProblem;
};

export default function ProblemCardHeader({ problem }: Props) {
  const { session } = useGetSession();

  const myUserId = session?.user?.id;
  const isMyProblem = myUserId == problem.user.id;

  const {
    isOpen: isUserModalOpen,
    onOpen: onUserModalOpen,
    onClose: onUserModalClose,
  } = useDisclosure();

  return (
    <HStack justifyContent="space-between">
      <Button onClick={onUserModalOpen} colorScheme="" p="0">
        <HStack>
          <Circle overflow="hidden" size={["7", "9"]}>
            <Image
              src={problem.user.avatarUrl || "/no-image.webp"}
              alt={problem.user.name}
              w="full"
              h="full"
              objectFit="cover"
            />
          </Circle>
          <Text fontSize="sm">{problem.user.name}</Text>
        </HStack>
      </Button>

      <HStack spacing={2}>
        {!isMyProblem && <BookmarkButton problem={problem} />}
        {isMyProblem && <ProblemOperationMenu problem={problem} isMyProblem={isMyProblem} />}
      </HStack>

      <UserModal
        user={problem.user}
        isOpen={isUserModalOpen}
        onClose={onUserModalClose}
        isFollowing={problem.user.isFollowing}
        currentUserId={myUserId}
      />
    </HStack>
  );
}
