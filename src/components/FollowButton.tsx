"use client";

import { Button } from "@chakra-ui/react";
import { apiClient } from "@/src/lib/api/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface FollowButtonProps {
  userId: number;
  initialIsFollowing: boolean;
  currentUserId: number | null;
  variant?: "solid" | "outline";
  size?: "sm" | "md" | "lg";
}

export default function FollowButton({
  userId,
  initialIsFollowing,
  currentUserId,
  variant = "solid",
  size = "md",
}: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleFollow = async () => {
    if (!currentUserId) {
      router.push("/auth/login");
      return;
    }

    if (currentUserId === userId) {
      return;
    }

    setIsLoading(true);

    try {
      if (isFollowing) {
        await apiClient.deleteFollow({ params: { user_id: String(userId) } });
        setIsFollowing(false);
      } else {
        await apiClient.createFollow({ params: { user_id: String(userId) } });
        setIsFollowing(true);
      }
    } catch (error) {
      console.error("Failed to toggle follow:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (currentUserId === userId) {
    return null;
  }

  return (
    <Button
      onClick={handleFollow}
      isLoading={isLoading}
      colorScheme={isFollowing ? "gray" : "teal"}
      variant={variant}
      size={size}>
      {isFollowing ? "フォロー中" : "フォロー"}
    </Button>
  );
}
