import { useContext } from "react";
import { AuthStateContext } from "@/src/app/context-providers/contexts/AuthContext";

export default function isLoggedIn() {
  const { auth } = useContext(AuthStateContext);
  return Boolean(auth);
}
