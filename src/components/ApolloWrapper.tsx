"use client";

import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "@/src/lib/apollo/client";

export default function ApolloWrapper({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
