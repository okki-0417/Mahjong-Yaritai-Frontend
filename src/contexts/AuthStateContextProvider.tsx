import { createContext, ReactNode, useEffect, useState } from "react";
import { apiClient } from "../ApiConfig";

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

type SessionType = {
  is_logged_in: boolean;
  user_id: number | null;
};

export default function AuthStateContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [auth, setAuth] = useState(false);
  const [myUserId, setMyUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchSessionState = async () => {
      try {
        const response = await apiClient.get(`/session`);
        const session: SessionType = response.data.session;

        session.is_logged_in ? setAuth(true) : setAuth(false);
        session.user_id && setMyUserId(session.user_id);
      } catch (error) {}
    };

    fetchSessionState();
  }, []);

  console.log(`You are ${auth ? "LOGGED IN" : "NOT LOGGED IN"}`);

  return (
    <AuthStateContext.Provider value={{ auth, setAuth, myUserId, setMyUserId }}>
      {children}
    </AuthStateContext.Provider>
  );
}
