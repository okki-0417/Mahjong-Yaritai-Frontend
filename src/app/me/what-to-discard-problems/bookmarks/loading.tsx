import { Container, VStack } from "@chakra-ui/react";
import ProblemCardSkeleton from "@/src/components/fallbacks/ProblemCardSkeleton";

export default function Loading() {
  return (
    <Container maxW="container.lg" py={[6, 8]}>
      <VStack spacing={[8, 16]}>
        {Array.from({ length: 3 }).map((_, index) => (
          <ProblemCardSkeleton key={index} />
        ))}
      </VStack>
    </Container>
  );
}
