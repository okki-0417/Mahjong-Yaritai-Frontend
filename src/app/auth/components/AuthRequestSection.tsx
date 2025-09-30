"use client";

import SocialLoginSection from "@/src/app/auth/components/SocialLoginSection";
import AuthRequestForm from "@/src/app/auth/request/AuthRequestForm";
import { useGraphQLSession } from "@/src/app/what-to-discard-problems/context-providers/GraphQLSessionProvider";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function AuthRequestSection() {
  const { session } = useGraphQLSession();

  useEffect(() => {
    if (session?.isLoggedIn) {
      redirect("/dashboard");
    }
  }, [session]);

  return (
    <>
      <SocialLoginSection />
      <AuthRequestForm />
    </>
  );
}
