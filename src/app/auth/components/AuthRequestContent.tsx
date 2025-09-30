"use client";

import { GraphQLSessionProvider } from "@/src/app/what-to-discard-problems/context-providers/GraphQLSessionProvider";
import AuthRequestSection from "@/src/app/auth/components/AuthRequestSection";

export default function AuthRequestContent() {
  return (
    <GraphQLSessionProvider>
      <AuthRequestSection />
    </GraphQLSessionProvider>
  );
}
