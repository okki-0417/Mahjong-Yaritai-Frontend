"use client";

import { apiClient } from "@/src/lib/api/client";
import { schemas } from "@/src/zodios/api";
import { HStack, ListItem, Text } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import z from "zod";

export default function ProfileOrLogin() {
  const [session, setSession] = useState<z.infer<typeof schemas.Session>>(null);
  const pathName = usePathname();

  const isLoggedIn = Boolean(session?.is_logged_in);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const sessionData = await apiClient.getSession();
        return setSession(sessionData);
      } catch (error) {
        return error;
      }
    };

    fetchSession();
  }, [pathName]);

  return (
    <Fragment>
      {isLoggedIn ? (
        <ListItem>
          <Link href={`/users/${session?.user_id}`} className="w-full ">
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
