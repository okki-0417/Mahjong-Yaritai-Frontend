"use client";

import { Button, Circle, Image, Text, VStack, Box } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useState } from "react";
import ProfileEditForm from "@/src/features/users/[id]/ProfileEditForm";
import { z } from "zod";
import { schemas } from "@/src/zodios/api";

export default function Profile({
  user,
  isMyProfile,
}: {
  user: z.infer<typeof schemas.User>;
  isMyProfile: boolean;
}) {
  const [userInfo, setUserInfo] = useState<z.infer<typeof schemas.User>>(user);
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <VStack gap="4" align="stretch">
      {isMyProfile && (
        <Box textAlign="right">
          <Button
            colorScheme={isEditMode ? "pink" : "whiteAlpha"}
            onClick={() => setIsEditMode(!isEditMode)}>
            <EditIcon />
          </Button>
        </Box>
      )}

      {isEditMode ? (
        <ProfileEditForm user={userInfo} setUser={setUserInfo} setIsEditMode={setIsEditMode} />
      ) : (
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
      )}
    </VStack>
  );
}
