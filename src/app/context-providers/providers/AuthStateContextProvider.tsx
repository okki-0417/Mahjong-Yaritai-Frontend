import { ReactNode } from "react";
import getSession from "@/src/lib/getSession";
import AuthStateContextInner from "@/src/app/context-providers/providers/AuthStateInnerContextProvider";

export default async function AuthStateContextProvider({ children }: { children: ReactNode }) {
  const session = await getSession();

  return <AuthStateContextInner session={session}>{children}</AuthStateContextInner>;
}
