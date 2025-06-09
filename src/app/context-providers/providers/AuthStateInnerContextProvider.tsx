"use client";

import { ReactNode, useState } from "react";
import { AuthStateContext } from "@/src/app/context-providers/contexts/AuthContext";
import { SessionType } from "@/src/lib/getSession";

export default function AuthStateContextInner({
  session,
  children,
}: {
  session: SessionType | null;
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
