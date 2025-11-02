"use client";

import useGetSession from "@/src/hooks/useGetSession";
import { Avatar } from "@chakra-ui/react";
import Link from "next/link";

export default function HeaderUserAvatar() {
  const { session } = useGetSession();
  const isLoggedIn = session?.isLoggedIn;

  return (
    <>
      {isLoggedIn && (
        <Link href="/me/profile">
          <Avatar src={session?.user?.avatarUrl} size="md" />
        </Link>
      )}
    </>
  );
}
