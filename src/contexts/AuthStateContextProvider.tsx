import { createContext, ReactNode, useEffect, useState } from "react";
import { apiClient } from "../ApiConfig";

type AuthStateContext = {
  auth: boolean;
  setAuth: (auth: boolean) => void;
};

export const AuthStateContext = createContext<AuthStateContext>({
  auth: false,
  setAuth: () => {},
});

export default function AuthStateContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [auth, setAuth] = useState<boolean>(false);

  useEffect(() => {
    const isAuthenticated = async () => {
      try {
        const response = await apiClient.get(`/session/state`);

        const data = response.data;

        data.auth ? setAuth(true) : setAuth(false);
        console.log(`You are ${auth ? "LOGGED IN" : "NOT LOGGED IN"}`);
      } catch (error) {
        console.error(error);
      }
    };

    isAuthenticated();
  }, [auth]);

  return (
    <AuthStateContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthStateContext.Provider>
  );
}
