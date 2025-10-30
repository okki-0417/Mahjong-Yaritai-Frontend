"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { useQuery } from "@apollo/client/react";
import { CurrentSessionDocument, CurrentSessionQuery, Session } from "@/src/generated/graphql";
import { ErrorLike } from "@apollo/client";

type SessionContextType = {
  session: CurrentSessionQuery["currentSession"] | null;
  loading: boolean;
  error: ErrorLike;
  triggerSessionRefetch: () => void;
};

export const SessionContext = createContext<SessionContextType | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const { data, loading, error, refetch } = useQuery(CurrentSessionDocument);
  const [session, setSession] = useState<Session | null>(data?.currentSession || null);
  const [refetchFlag, setRefetchFlag] = useState(false);

  const triggerSessionRefetch = () => setRefetchFlag(prev => !prev);

  useEffect(() => {
    const updateSession = async () => {
      const { data: newSession } = await refetch();
      setSession(newSession.currentSession);
    };
    updateSession();
  }, [refetchFlag, refetch]);

  return (
    <SessionContext.Provider value={{ session, loading, error, triggerSessionRefetch }}>
      {children}
    </SessionContext.Provider>
  );
}
