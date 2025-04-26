import { useContext } from "react";
import { AuthStateContext } from "../contexts/AuthStateContextProvider";

export default function useIsLoggedIn() {
  const { myUserId } = useContext(AuthStateContext);

  return myUserId;
}
