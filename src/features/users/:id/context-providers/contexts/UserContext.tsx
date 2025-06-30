"use client";

import { schemas } from "@/src/zodios/api";
import { createContext } from "react";
import { z } from "zod";

type UserContext = {
  user: z.infer<typeof schemas.User> | null;
  setUser: React.Dispatch<React.SetStateAction<z.infer<typeof schemas.User>>>;
};

export const UserContext = createContext<UserContext>({
  user: null,
  setUser: () => null,
});
