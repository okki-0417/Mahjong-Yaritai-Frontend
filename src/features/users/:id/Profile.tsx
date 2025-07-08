"use client";

import { Button, Circle, Image, Text, VStack } from "@chakra-ui/react";
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
    <VStack gap="4">
      {isMyProfile && (
        <Button
          colorScheme={isEditMode ? "pink" : "whiteAlpha"}
          position="absolute"
          right="0"
          onClick={() => setIsEditMode(!isEditMode)}>
          <EditIcon />
        </Button>
      )}

      {isEditMode && (
        <ProfileEditForm user={user} setUser={setUser} setIsEditMode={setIsEditMode} />
      )}

      {!isEditMode && (
        <VStack>
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

          <Text fontSize="4xl" textAlign="center">
            {user?.name}
          </Text>
        </VStack>
      )}
    </VStack>
  );
}
