import { Container } from "@chakra-ui/react";
import { Suspense } from "react";
import Fallback from "@/src/components/fallbacks/Fallback";
import BookmarkedProblemsSection from "@/src/app/me/what-to-discard-problems/bookmarks/components/BookmarkedProblemsSection";

export const dynamic = "force-dynamic";

export default function BookmarkedProblemsPage() {
  return (
    <Container maxW="container.lg" py={[6, 8]}>
      <Suspense fallback={<Fallback />}>
        <BookmarkedProblemsSection />
      </Suspense>
    </Container>
  );
}
