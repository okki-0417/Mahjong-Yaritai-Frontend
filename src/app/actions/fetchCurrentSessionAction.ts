"use server";

import { CurrentSessionDocument } from "@/src/generated/graphql";
import { getClient } from "@/src/lib/apollo/server";

export default async function fetchCurrentSessionAction() {
  const client = getClient();
  const { data } = await client.query({ query: CurrentSessionDocument });

  return data.currentSession;
}
