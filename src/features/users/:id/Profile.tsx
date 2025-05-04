import { Circle, Image, Text, VStack } from "@chakra-ui/react";
import { UserType } from "../../../pages/users/:id/page";

export default function Profile({ user }: { user: UserType | null }) {
  return (
    <VStack gap="4">
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

      <Text fontSize="4xl">{user?.name}</Text>
    </VStack>
  );
}
