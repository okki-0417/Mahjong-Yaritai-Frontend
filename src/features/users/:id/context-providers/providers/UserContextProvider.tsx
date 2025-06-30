"use client";

import { UserContext } from "@/src/features/users/:id/context-providers/contexts/UserContext";
import { schemas } from "@/src/zodios/api";
import { ReactNode, useState } from "react";
import { z } from "zod";

export default function UserContextProvider({
  children,
  initialUser,
}: {
  children: ReactNode;
  initialUser: z.infer<typeof schemas.User>;
}) {
  const [user, setUser] = useState<z.infer<typeof schemas.User>>(initialUser);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}
