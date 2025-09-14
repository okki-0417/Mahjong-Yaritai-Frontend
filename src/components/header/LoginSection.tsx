"use client";

import ButtonNeutral from "@/src/components/Buttons/ButtonNeutral";
import { apiClient } from "@/src/lib/api/client";
import { schemas } from "@/src/zodios/api";
import { HStack, ListItem, Text } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import z from "zod";

export default function LoginSection() {
  const [session, setSession] = useState<z.infer<typeof schemas.Session>>(null);
  const pathName = usePathname();

  useEffect(() => {
    const updateSession = async () => {
      const response = await apiClient.getSession();
      setSession(response.session);
    };

    updateSession();
  }, [pathName]);

  const isLoggedIn = session?.is_logged_in;

  return (
    <Fragment>
      {isLoggedIn === false && (
        <ListItem>
          <Link href="/auth/request">
            <HStack gap="1">
              <ButtonNeutral>
                <Text>ログイン / 新規登録</Text>
              </ButtonNeutral>
            </HStack>
          </Link>
        </ListItem>
      )}
    </Fragment>
  );
}
