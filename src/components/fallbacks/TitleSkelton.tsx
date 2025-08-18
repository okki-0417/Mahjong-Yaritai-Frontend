import { Container, Divider, Skeleton } from "@chakra-ui/react";

export default function TitleSkeleton() {
  return (
    <Container mt="20" maxW="4xl">
      <Skeleton height={["32px", "48px"]} width={["120px", "180px"]} mb="2" />
      <Divider />
    </Container>
  );
}
