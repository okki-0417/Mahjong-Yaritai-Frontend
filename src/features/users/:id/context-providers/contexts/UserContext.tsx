"use client";

import { User } from "@/types/ApiData";
import { createContext } from "react";

type UserContext = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

export const UserContext = createContext<UserContext>({
  user: null,
  setUser: () => null,
});
