"use client";

import { HStack, ListItem, Text } from "@chakra-ui/react";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useQuery } from "@apollo/client/react";
import { CurrentSessionDocument, CurrentSessionQuery } from "@/src/generated/graphql";

type SessionType = {
  isLoggedIn: boolean;
  userId?: number | null;
};

export default function ProfileOrLogin() {
  const [session, setSession] = useState<SessionType | null>(null);
  const { data } = useQuery<CurrentSessionQuery>(CurrentSessionDocument);

  const isLoggedIn = Boolean(session?.isLoggedIn);

  useEffect(() => {
    if (data?.currentSession) {
      setSession({
        isLoggedIn: data.currentSession.isLoggedIn,
        userId: data.currentSession.userId,
      });
    }
  }, [data]);

  return (
    <Fragment>
      {isLoggedIn ? (
        <ListItem>
          <Link href={`/users/${session?.userId}`} className="w-full ">
            <HStack className="py-3 px-4 rounded hover:bg-gray-400 transition-colors">
              <FaUser size={18} />
              <Text fontSize="lg">プロフィール</Text>
            </HStack>
          </Link>
        </ListItem>
      ) : (
        <ListItem>
          <Link href="/auth/request" className="w-full ">
            <HStack className="py-3 px-4 rounded hover:bg-gray-400 transition-colors">
              <FaUser size={18} />
              <Text fontSize="lg">ログイン / 新規登録</Text>
            </HStack>
          </Link>
        </ListItem>
      )}
    </Fragment>
  );
}
