import ProfileSection from "@/src/features/users/:id/ProfileSection";
import { Container } from "@chakra-ui/react";
import { Suspense } from "react";

export type UserType = {
  name: string;
  avatar_url: string;
};

export default async function UserShow({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <Container mt="20" size="2xl">
      <Suspense>
        <ProfileSection id={id} />
      </Suspense>
    </Container>
  );
}
