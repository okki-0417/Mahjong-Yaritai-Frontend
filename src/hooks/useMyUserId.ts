import { AuthStateContext } from "@/src/app/context-providers/contexts/AuthContext";
import { useContext } from "react";

export default function useMyUserId() {
  const { myUserId } = useContext(AuthStateContext);

  return myUserId;
}
