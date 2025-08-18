import { Box, Flex, HStack, Skeleton, SkeletonCircle, VStack } from "@chakra-ui/react";

function ProblemCardSkeleton() {
  return (
    <Box w="full">
      <Skeleton height="24px" width="150px" mb="2" />

      <Box
        boxShadow="base"
        borderTopRadius="md"
        className="bg-mj-mat"
        shadow="md"
        pt={["2", "3"]}
        px={["2", "4"]}
        pb="6">
        <VStack alignItems="stretch">
          {/* Header skeleton */}
          <HStack justify="space-between" mb="2">
            <HStack>
              <SkeletonCircle size="10" />
              <Skeleton height="20px" width="100px" />
            </HStack>
            <Skeleton height="20px" width="50px" />
          </HStack>

          {/* Round info skeleton */}
          <HStack fontSize={[18, 20]} mb="2">
            <Skeleton height="20px" width="40px" />
            <Skeleton height="20px" width="40px" />
            <Skeleton height="20px" width="60px" />
            <HStack gap="1">
              <Skeleton height="20px" width="30px" />
              <Skeleton height="40px" width="30px" />
            </HStack>
          </HStack>

          {/* Points skeleton */}
          <HStack gap="4" mb="4">
            <Skeleton height="20px" width="80px" />
            <Skeleton height="20px" width="80px" />
            <Skeleton height="20px" width="80px" />
            <Skeleton height="20px" width="80px" />
          </HStack>

          {/* Tiles skeleton */}
          <Flex
            flexDir={["column", "row-reverse"]}
            justifyContent="center"
            alignItems={["stretch", "flex-end"]}
            gap="3"
            px={[0, 4]}>
            <Flex flexDir={["row", "column"]} alignItems="center" gap={[2, 0]}>
              <Skeleton height="20px" width="30px" />
              <Skeleton height="50px" width="35px" />
            </Flex>

            <HStack gap="0" justify="center" alignItems="flex-end">
              {Array.from({ length: 13 }).map((_, index) => (
                <Skeleton key={index} height="50px" width="35px" />
              ))}
            </HStack>
          </Flex>
        </VStack>
      </Box>

      {/* Bottom action bar skeleton */}
      <HStack px={["3", "4"]} py="2" bgColor="white" className="rounded-b-md">
        <Skeleton height="24px" width="60px" />
        <Skeleton height="24px" width="80px" />
        <Skeleton height="24px" width="100px" />
      </HStack>
    </Box>
  );
}

export default function ProblemsSectionSkeleton() {
  return (
    <Box>
      <SkeletonCircle size="12" mb="8" />

      <VStack gap="16">
        {Array.from({ length: 3 }).map((_, index) => (
          <ProblemCardSkeleton key={index} />
        ))}
      </VStack>

      <Flex justify="center" mt={5}>
        <Skeleton height="40px" width="120px" borderRadius="md" />
      </Flex>
    </Box>
  );
}
