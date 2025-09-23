"use client";

import { Button, useDisclosure } from "@chakra-ui/react";
import { apiClient } from "@/src/lib/api/client";
import { useState, useEffect } from "react";
import NotLoggedInModal from "@/src/components/Modals/NotLoggedInModal";
import useSuccessToast from "@/src/hooks/useSuccessToast";
import useErrorToast from "@/src/hooks/useErrorToast";

interface FollowButtonProps {
  userId: number;
  initialIsFollowing: boolean;
  currentUserId: number | null;
  variant?: "solid" | "outline";
  size?: "sm" | "md" | "lg";
  onFollowChange?: (isFollowing: boolean) => void;
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
  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

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
        await apiClient.deleteFollow([], { params: { user_id: String(userId) } });
        setIsFollowing(false);
        onFollowChange?.(false);
        successToast({ title: "フォローを解除しました" });
      } else {
        await apiClient.createFollow([], { params: { user_id: String(userId) } });
        setIsFollowing(true);
        onFollowChange?.(true);
        successToast({ title: "フォローしました" });
      }
    } catch (error) {
      errorToast({ error, title: "フォローの操作に失敗しました" });
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
