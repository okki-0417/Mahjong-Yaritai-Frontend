import { useContext } from "react";
import { AuthStateContext } from "../contexts/AuthStateContextProvider";

export default function useMyUserId() {
  const { myUserId } = useContext(AuthStateContext);

  return myUserId;
}
