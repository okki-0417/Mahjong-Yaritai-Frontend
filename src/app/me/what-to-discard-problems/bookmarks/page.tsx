import { Container, VStack } from "@chakra-ui/react";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import getSession from "@/src/lib/getSession";
import BookmarkedProblemsSection from "@/src/app/me/what-to-discard-problems/bookmarks/BookmarkedProblemsSection";
import Fallback from "@/src/components/fallbacks/Fallback";
import BookmarkedProblemsContent from "@/src/app/me/what-to-discard-problems/bookmarks/BookmarkedProblemsContent";

export default async function BookmarkedProblemsPage() {
  const session = await getSession();
  if (!session?.isLoggedIn) redirect("/auth/request");

  return (
    <Container maxW="container.lg" py={[6, 8]}>
      <VStack spacing={[4, 8]}>
        <Suspense fallback={<Fallback />}>
          <BookmarkedProblemsContent />
        </Suspense>
      </VStack>
    </Container>
  );
}
