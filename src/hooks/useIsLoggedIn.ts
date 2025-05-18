"use client";

import { useContext } from "react";
import { AuthStateContext } from "../app/contexts/AuthStateContext/AuthStateContextInner";

export default function useIsLoggedIn() {
  const { auth } = useContext(AuthStateContext);
  return !!auth;
}
