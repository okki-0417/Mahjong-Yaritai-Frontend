"use client";

import { createContext, ReactNode, useState } from "react";
import { SessionType } from "../../../lib/getSession";

type AuthStateContextType = {
  auth: boolean;
  setAuth: (auth: boolean) => void;
  myUserId: number | null;
  setMyUserId: React.Dispatch<React.SetStateAction<number | null>>;
};

export const AuthStateContext = createContext<AuthStateContextType>({
  auth: false,
  setAuth: () => {},
  myUserId: null,
  setMyUserId: () => {},
});

export default function AuthStateContextInner({
  session,
  children,
}: {
  session: SessionType | null;
  children: ReactNode;
}) {
  const [auth, setAuth] = useState(!!session?.is_logged_in);
  const [myUserId, setMyUserId] = useState<number | null>(
    session?.user_id || null
  );

  console.log(`You are ${auth ? "LOGGED IN" : "NOT LOGGED IN"}`);

  return (
    <AuthStateContext.Provider value={{ auth, setAuth, myUserId, setMyUserId }}>
      {children}
    </AuthStateContext.Provider>
  );
}
