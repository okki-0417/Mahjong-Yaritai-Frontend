import { Container, Skeleton, SkeletonText, SkeletonCircle, HStack } from "@chakra-ui/react";

export default function UserProfileSkeleton() {
  return (
    <Container maxW="lg" px="0" mx="0">
      <HStack justify="end">
        <Skeleton height="40px" width="48px" borderRadius="md" />
      </HStack>

      <HStack justify="center" mt="4" w="full">
        <SkeletonCircle size={["150", "200"]} />
      </HStack>

      <Skeleton height="32px" width="200px" mx="auto" mt="4" />

      <SkeletonText w="full" noOfLines={3} spacing="4" skeletonHeight="20px" mt="4" />
    </Container>
  );
}
