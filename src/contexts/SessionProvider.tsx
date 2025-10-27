"use client";

import { createContext, ReactNode } from "react";
import { useQuery } from "@apollo/client/react";
import { CurrentSessionDocument, CurrentSessionQuery } from "@/src/generated/graphql";
import { ApolloClient, ErrorLike } from "@apollo/client";

type SessionContextType = {
  session: CurrentSessionQuery["currentSession"] | null;
  loading: boolean;
  error: ErrorLike;
  refetch: () => Promise<ApolloClient.QueryResult<CurrentSessionQuery>>;
};

export const SessionContext = createContext<SessionContextType | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const { data, loading, error, refetch } = useQuery(CurrentSessionDocument);

  return (
    <SessionContext.Provider value={{ session: data?.currentSession, loading, error, refetch }}>
      {children}
    </SessionContext.Provider>
  );
}
