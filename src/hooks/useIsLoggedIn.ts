"use client";

import { useContext } from "react";
import { AuthStateContext } from "@/src/app/context-providers/contexts/AuthContext";

export default function useIsLoggedIn() {
  const { auth } = useContext(AuthStateContext);
  return !!auth;
}
