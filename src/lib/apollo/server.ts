import { ApolloClient, InMemoryCache } from "@apollo/client";
import { HttpLink } from "@apollo/client/link/http";
import { SetContextLink } from "@apollo/client/link/context";
import { headers } from "next/headers";
import { API_BASE_URL } from "@/config/apiConfig";

const httpLink = new HttpLink({
  uri: `${API_BASE_URL}/graphql` || "http://localhost:3001/graphql",
});

const authLink = new SetContextLink(async prevContext => {
  const headersList = await headers();
  const cookie = headersList.get("cookie");

  return {
    headers: {
      ...prevContext?.headers,
      ...(cookie && { cookie }),
      "Content-Type": "application/json",
    },
  };
});

export function getClient(): ApolloClient {
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    ssrMode: true,
    defaultOptions: {
      watchQuery: {
        errorPolicy: "none",
      },
      query: {
        errorPolicy: "none",
      },
    },
  });
}
