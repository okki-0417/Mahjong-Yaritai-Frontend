import { Box, Skeleton, SkeletonText, VStack } from "@chakra-ui/react";

export default function ProblemsSectionFallback() {
  return (
    <VStack gap="16" align="stretch">
      <Box>
        <Skeleton height="50px" width="50px" borderRadius="full" />
      </Box>

      {Array.from({ length: 3 }).map((_, index) => (
        <Box key={index} border="1px" borderColor="gray.200" borderRadius="md" p="6">
          <VStack gap="4" align="stretch" mb="6">
            <Skeleton height="24px" width="60%" />
            <Skeleton height="20px" width="40%" />
          </VStack>

          <VStack gap="4" align="stretch" mb="6">
            <SkeletonText noOfLines={1} spacing="4" skeletonHeight="16px" width="30%" />
            <Box display="flex" gap="1">
              {Array.from({ length: 14 }).map((__, tileIndex) => (
                <Skeleton key={tileIndex} height="48px" width="36px" borderRadius="sm" />
              ))}
            </Box>
          </VStack>

          <Box display="flex" gap="2" justifyContent="center">
            <Skeleton height="40px" width="80px" borderRadius="md" />
            <Skeleton height="40px" width="80px" borderRadius="md" />
            <Skeleton height="40px" width="80px" borderRadius="md" />
          </Box>
        </Box>
      ))}

      <Box textAlign="center">
        <Skeleton height="40px" width="120px" borderRadius="md" mx="auto" />
      </Box>
    </VStack>
  );
}
