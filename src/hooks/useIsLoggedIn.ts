"use client";

import { useContext } from "react";
import { AuthStateContext } from "@/src/context-providers/contexts/AuthContext";

export default function useIsLoggedIn() {
  const { auth } = useContext(AuthStateContext);
  return !!auth;
}
