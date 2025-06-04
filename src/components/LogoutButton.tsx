"use client";

import useIsLoggedIn from "@/src/hooks/useIsLoggedIn";
import useLogout from "@/src/hooks/useLogout";
import { Button } from "@chakra-ui/react";

export default function LogoutButton() {
  const logout = useLogout();
  const auth = useIsLoggedIn();

  return (
    <>
      {auth && (
        <Button onClick={logout} colorScheme="" color="gray.200">
          ログアウト
        </Button>
      )}
    </>
  );
}
