import { ReactNode } from "react";
import getSession from "../../../lib/getSession";
import AuthStateContextInner from "./AuthStateContextInner";

export default async function AuthStateContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();

  return (
    <AuthStateContextInner session={session}>{children}</AuthStateContextInner>
  );
}
