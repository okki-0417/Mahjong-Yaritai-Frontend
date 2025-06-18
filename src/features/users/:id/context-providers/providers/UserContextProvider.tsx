"use client";

import { UserContext } from "@/src/features/users/:id/context-providers/contexts/UserContext";
import { User } from "@/types/ApiData";
import { ReactNode, useState } from "react";

export default function UserContextProvider({
  children,
  initialUser,
}: {
  children: ReactNode;
  initialUser: User;
}) {
  const [user, setUser] = useState<User>(initialUser);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}
