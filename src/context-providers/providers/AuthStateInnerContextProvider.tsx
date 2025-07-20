"use client";

import { ReactNode, useState } from "react";
import { z } from "zod";
import { schemas } from "@/src/zodios/api";
import { AuthStateContext } from "@/src/context-providers/contexts/AuthContext";

export default function AuthStateContextInner({
  session,
  children,
}: {
  session: z.infer<typeof schemas.Session> | null;
  children: ReactNode;
}) {
  const [auth, setAuth] = useState(Boolean(session?.is_logged_in));
  const [myUserId, setMyUserId] = useState<number | null>(session?.user_id || null);

  console.log(`You are ${auth ? "LOGGED IN" : "NOT LOGGED IN"}`);

  return (
    <AuthStateContext.Provider value={{ auth, setAuth, myUserId, setMyUserId }}>
      {children}
    </AuthStateContext.Provider>
  );
}
