"use client";

import { Button, Circle, Image, Text, VStack, Box } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useState } from "react";
import ProfileEditForm from "@/src/features/users/:id/ProfileEditForm";
import { z } from "zod";
import { schemas } from "@/src/zodios/api";
import useMyUserId from "@/src/hooks/useMyUserId";

export default function Profile({ initialUser }: { initialUser: z.infer<typeof schemas.User> }) {
  const [user, setUser] = useState<z.infer<typeof schemas.User>>(initialUser);

  const [isEditMode, setIsEditMode] = useState(false);
  const isMyProfile = useMyUserId() == user.id;

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

      {isEditMode && (
        <ProfileEditForm user={user} setUser={setUser} setIsEditMode={setIsEditMode} />
      )}

      {!isEditMode && (
        <VStack spacing={4}>
          <Circle size="200" overflow="hidden">
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
            <Text fontSize="4xl" wordBreak="break-word">
              {user?.name}
            </Text>
          </Box>

          <Box maxW="md" mx="auto">
            {user?.profile_text ? (
              <Text fontSize="lg" whiteSpace="pre-wrap" wordBreak="break-word">
                {user.profile_text}
              </Text>
            ) : (
              <Text fontSize="lg" color="gray.500" fontStyle="italic">
                自己紹介文が設定されていません
              </Text>
            )}
          </Box>
        </VStack>
      )}
    </VStack>
  );
}
