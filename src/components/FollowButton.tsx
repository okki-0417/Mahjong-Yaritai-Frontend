"use client";

import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import { useMutation } from "@apollo/client/react";
import { CreateFollowDocument, DeleteFollowDocument } from "@/src/generated/graphql";
import { useState, useEffect } from "react";
import NotLoggedInModal from "@/src/components/Modals/NotLoggedInModal";

interface FollowButtonProps {
  userId: string;
  initialIsFollowing: boolean;
  currentUserId: string | null;
  variant?: "solid" | "outline";
  size?: "sm" | "md" | "lg";
  /* eslint-disable no-unused-vars */
  onFollowChange?: (newIsFollowing: boolean) => void;
  /* eslint-enable no-unused-vars */
}

export default function FollowButton({
  userId,
  initialIsFollowing,
  currentUserId,
  variant = "solid",
  size = "md",
  onFollowChange,
}: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [createFollow] = useMutation(CreateFollowDocument);
  const [deleteFollow] = useMutation(DeleteFollowDocument);

  const toast = useToast();

  useEffect(() => {
    setIsFollowing(initialIsFollowing);
  }, [initialIsFollowing]);

  const handleFollow = async () => {
    if (!currentUserId) {
      onOpen();
      return;
    }

    if (currentUserId === userId) {
      return;
    }

    setIsLoading(true);

    try {
      if (isFollowing) {
        await deleteFollow({
          variables: { userId: String(userId) },
        });
        setIsFollowing(false);
        onFollowChange?.(false);
        toast({ title: "フォローを解除しました", status: "success" });
      } else {
        await createFollow({
          variables: { userId: String(userId) },
        });
        setIsFollowing(true);
        onFollowChange?.(true);
        toast({ title: "フォローしました", status: "success" });
      }
    } catch (error) {
      toast({ title: "フォローの操作に失敗しました", status: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  if (currentUserId === userId) {
    return null;
  }

  return (
    <>
      <Button
        onClick={handleFollow}
        isLoading={isLoading}
        colorScheme={isFollowing ? "gray" : "teal"}
        variant={variant}
        size={size}>
        {isFollowing ? "フォロー中" : "フォロー"}
      </Button>

      <NotLoggedInModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
