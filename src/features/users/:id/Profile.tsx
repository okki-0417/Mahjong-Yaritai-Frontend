"use client";

import { Button, Circle, Image, Text, VStack } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useContext, useState } from "react";
import ProfileEditForm from "@/src/features/users/:id/ProfileEditForm";
import { UserContext } from "@/src/features/users/:id/context-providers/contexts/UserContext";

export default function Profile({ isMyPage }: { isMyPage: boolean }) {
  const { user } = useContext(UserContext);

  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <VStack gap="4">
      {isMyPage && (
        <Button
          colorScheme={isEditMode ? "pink" : "whiteAlpha"}
          position="absolute"
          right="0"
          onClick={() => setIsEditMode(!isEditMode)}>
          <EditIcon />
        </Button>
      )}

      {isEditMode ? (
        <ProfileEditForm setIsEditMode={setIsEditMode} />
      ) : (
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
