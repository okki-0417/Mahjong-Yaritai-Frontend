import createApiPageClient from "@/src/lib/apiClients/ApiPageClient";
import { schemas } from "@/src/zodios/api";
import { z } from "zod";

export type SessionType = z.infer<typeof schemas.Session>;

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
