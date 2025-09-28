"use client";

import { schemas } from "@/src/zodios/api";
import { createContext } from "react";
import z from "zod";

export const SessionContext = createContext<{
  session: z.infer<typeof schemas.Session> | null;
}>({ session: null });

export default function SessionContextProvider({
  session,
  children,
}: {
  session: z.infer<typeof schemas.Session> | null;
  children: React.ReactNode;
}) {
  return <SessionContext.Provider value={{ session }}>{children}</SessionContext.Provider>;
}
