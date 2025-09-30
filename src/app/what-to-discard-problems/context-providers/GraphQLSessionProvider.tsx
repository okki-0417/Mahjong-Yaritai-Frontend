"use client";

import { createContext, useContext, ReactNode } from "react";
import { useQuery } from "@apollo/client/react";
import { CurrentSessionDocument, CurrentSessionQuery } from "@/src/generated/graphql";

interface SessionContextValue {
  session: CurrentSessionQuery["currentSession"] | null | undefined;
  loading: boolean;
  error: any;
}

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

export function GraphQLSessionProvider({ children }: { children: ReactNode }) {
  const { data, loading, error } = useQuery(CurrentSessionDocument);

  return (
    <SessionContext.Provider value={{ session: data?.currentSession, loading, error }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useGraphQLSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useGraphQLSession must be used within a GraphQLSessionProvider");
  }
  return context;
}
