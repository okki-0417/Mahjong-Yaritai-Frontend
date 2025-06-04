import { createContext } from "react";

type AuthStateContextType = {
  auth: boolean;
  setAuth: (auth: boolean) => void;
  myUserId: number | null;
  setMyUserId: React.Dispatch<React.SetStateAction<number | null>>;
};

export const AuthStateContext = createContext<AuthStateContextType>({
  auth: false,
  setAuth: () => {},
  myUserId: null,
  setMyUserId: () => {},
});
