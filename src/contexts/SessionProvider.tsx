"use client";

import { createContext, ReactNode, useState } from "react";
import { useQuery } from "@apollo/client/react";
import { CurrentSessionDocument, CurrentSessionQuery, Session } from "@/src/generated/graphql";
import { ErrorLike } from "@apollo/client";

type SessionContextType = {
  session: CurrentSessionQuery["currentSession"] | null;
  loading: boolean;
  error: ErrorLike;
  updateSession: () => Promise<void>;
};

export const SessionContext = createContext<SessionContextType | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const { data, loading, error, refetch } = useQuery(CurrentSessionDocument);
  const [session, setSession] = useState<Session | null>(data?.currentSession || null);

  const updateSession = async () => {
    const refetchData = await refetch();
    setSession(refetchData.data.currentSession);
  };

  return (
    <SessionContext.Provider value={{ session, loading, error, updateSession }}>
      {children}
    </SessionContext.Provider>
  );
}
