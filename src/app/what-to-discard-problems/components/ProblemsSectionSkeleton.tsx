import { Box, Flex, Skeleton, SkeletonCircle, VStack } from "@chakra-ui/react";
import ProblemCardSkeleton from "@/src/components/fallbacks/ProblemCardSkeleton";

export default function ProblemsSectionSkeleton() {
  return (
    <Box>
      {/* Floating add button skeleton */}
      <SkeletonCircle size="20" className="fixed bottom-4 right-4 z-40 shadow-lg shadow-gray-700" />

      <VStack gap={["8", "16"]}>
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
