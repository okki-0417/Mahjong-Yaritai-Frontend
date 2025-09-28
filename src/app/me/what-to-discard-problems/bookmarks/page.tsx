import { Container, VStack } from "@chakra-ui/react";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import getSession from "@/src/lib/getSession";
import BookmarkedProblemsSection from "@/src/app/me/what-to-discard-problems/bookmarks/BookmarkedProblemsSection";
import Fallback from "@/src/components/fallbacks/Fallback";

export default async function BookmarkedProblemsPage() {
  const session = await getSession();
  if (!session?.is_logged_in) redirect("/auth/request");

  return (
    <Container maxW="container.lg" py={[6, 8]}>
      <VStack spacing={[4, 8]}>
        <Suspense fallback={<Fallback />}>
          <BookmarkedProblemsSection session={session} />
        </Suspense>
      </VStack>
    </Container>
  );
}
