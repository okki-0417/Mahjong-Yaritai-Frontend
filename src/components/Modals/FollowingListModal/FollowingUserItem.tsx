import { User, UserProfileQuery } from "@/src/generated/graphql";
import { Box, Button, Circle, HStack, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  user: User;
  onClose: () => void;
};

export default function FollowingUserItem({ user, onClose }: Props) {
  return (
    <HStack spacing={4} p={3} bg="gray.50" rounded="lg">
      <Circle size="50px" overflow="hidden" flexShrink={0} position="relative">
        <Image
          src={user.avatarUrl || "/no-image.webp"}
          alt={user.name}
          fill
          style={{ objectFit: "cover" }}
        />
      </Circle>

      <Box flex={1} minW={0}>
        <Text fontWeight="bold" noOfLines={1}>
          {user.name}
        </Text>
        {user.profileText && (
          <Text fontSize="sm" color="gray.600" noOfLines={2}>
            {user.profileText}
          </Text>
        )}
      </Box>

      <Link href={`/users/${user.id}`}>
        <Button size="sm" colorScheme="blue" variant="outline" onClick={onClose} flexShrink={0}>
          プロフィール
        </Button>
      </Link>
    </HStack>
  );
}
