"use client";

import { Button } from "@chakra-ui/react";
import useLogout from "../hooks/useLogout";
import useIsLoggedIn from "../hooks/useIsLoggedIn";

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
