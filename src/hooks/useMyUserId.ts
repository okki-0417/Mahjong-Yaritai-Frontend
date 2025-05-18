import { useContext } from "react";
import { AuthStateContext } from "../app/contexts/AuthStateContext/AuthStateContextInner";

export default function useMyUserId() {
  const { myUserId } = useContext(AuthStateContext);

  return myUserId;
}
