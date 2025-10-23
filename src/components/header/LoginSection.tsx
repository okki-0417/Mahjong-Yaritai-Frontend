"use client";

import ButtonNeutral from "@/src/components/Buttons/ButtonNeutral";
import { HStack, ListItem, Text } from "@chakra-ui/react";
import Link from "next/link";
import { Fragment, useEffect } from "react";
import { usePathname } from "next/navigation";
import useGetSession from "@/src/hooks/useGetSession";

export default function LoginSection() {
  const { session, refetch } = useGetSession();
  const pathname = usePathname();
  const isLoggedIn = session?.isLoggedIn;

  useEffect(() => {
    refetch();
  }, [pathname, refetch]);

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
