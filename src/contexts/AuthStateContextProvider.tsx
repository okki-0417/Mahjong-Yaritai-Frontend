import { createContext, ReactNode, useEffect, useState } from "react"
import { BASEURL } from "../ApiConfig";

type AuthStateContext = {
  auth: boolean;
  setAuth: (auth: boolean) => void;
};

export const AuthStateContext = createContext<AuthStateContext>({
  auth: false,
  setAuth: () => {throw new Error("SetAuth is empty.")},
});

export default function AuthStateContextProvider({children}: {children: ReactNode}) {
  const [auth, setAuth] = useState<boolean>(false);

  useEffect(() => {
    const isAuthenticated = async () => {
      try {
        const response = await fetch(`${BASEURL}/session/state`, {
          credentials: "include",
        });

        const data = await response.json();

        if (data.auth != true) {
          setAuth(false);
          return;
        }

        setAuth(true);
        console.log(`You are ${auth ? "LOGGED IN" : "NOT LOGGED IN"}`)
      }
      catch (error) {
        console.error("Failed to fetch authentication state:", error);
      }
    };

    isAuthenticated();
  }, [auth]);

  return (
    <AuthStateContext.Provider value={{auth, setAuth}}>
      {children}
    </AuthStateContext.Provider>
  )
}
