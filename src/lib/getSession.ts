import createApiPageClient from "@/src/lib/api/server";
import { schemas } from "@/src/zodios/api";
import { z } from "zod";

export type SessionType = z.infer<typeof schemas.Session>;

// GraphQL移行中のため、一時的にREST APIを維持
export default async function getSession() {
  const apiPageClient = await createApiPageClient();

  try {
    const response = await apiPageClient.getSession();

    return response.session;
  } catch (error) {
    console.error(error);
    return null;
  }
}
