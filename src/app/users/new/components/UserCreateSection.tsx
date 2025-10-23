"use client";

import UserForm from "@/src/app/users/new/components/UserForm";
import useGetSession from "@/src/hooks/useGetSession";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserCreateSection() {
  const { session } = useGetSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.isLoggedIn) router.push("/dashboard");
  }, [session, router]);

  return <UserForm />;
}
