"use client";

import { GraphQLSessionProvider } from "@/src/app/what-to-discard-problems/context-providers/GraphQLSessionProvider";
import BookmarkedProblemsSection from "@/src/app/me/what-to-discard-problems/bookmarks/BookmarkedProblemsSection";

export default function BookmarkedProblemsContent() {
  return (
    <GraphQLSessionProvider>
      <BookmarkedProblemsSection />
    </GraphQLSessionProvider>
  );
}
