"use client";

import { ReactNode, useState } from "react";
import { AuthStateContext } from "@/src/app/context-providers/contexts/AuthContext";
import { z } from "zod";
import { schemas } from "@/src/zodios/api";

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
