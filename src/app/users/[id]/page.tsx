import Fallback from "@/src/components/fallbacks/Fallback";
import ProfileSection from "@/src/features/users/[id]/ProfileSection";
import { Box, Container, Divider, Text } from "@chakra-ui/react";
import { Suspense } from "react";

export type UserType = {
  name: string;
  avatar_url: string;
};

export default async function UserShow({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <Container mt="20" size="2xl">
      <Text fontSize={["2xl", "4xl"]} fontWeight="bold">
        プロフィール
      </Text>
      <Divider />

      <Box mt="8">
        <Suspense fallback={<Fallback />}>
          <ProfileSection id={id} />
        </Suspense>
      </Box>
    </Container>
  );
}
