import { useContext } from "react";
import { AuthStateContext } from "../contexts/AuthStateContextProvider";

export default function useIsLoggedIn() {
  const { auth } = useContext(AuthStateContext);
  return !!auth;
}
