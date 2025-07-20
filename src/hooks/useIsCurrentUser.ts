import { useContext } from "react";
import { AuthStateContext } from "@/src/context-providers/contexts/AuthContext";

export default function useIsCurrentUser(userId: number) {
  const { myUserId } = useContext(AuthStateContext);

  return userId == myUserId;
}
