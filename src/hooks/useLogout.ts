import { useCallback, useContext, useState } from "react";
import { AuthStateContext } from "../contexts/AuthStateContextProvider";
import { apiClient } from "../ApiConfig";
import { useToast } from "@chakra-ui/react";
import useErrorToast from "./useErrorToast";
import axios from "axios";

export default function useLogout(): () => Promise<void> {
  const { auth, setAuth, setMyUserId } = useContext(AuthStateContext);
  const toast = useToast();
  const errorToast = useErrorToast();
  const [loading, setLoading] = useState(false);

  const logout = useCallback(async () => {
    if (!auth) return;
    if (loading) return;
    setLoading(true);

    const isConfirmed = confirm("ログアウトしますか？");
    if (!isConfirmed) return;

    try {
      await apiClient.delete("/session");
      setAuth(false);
      setMyUserId(null);
      toast({ title: "ログアウトしました", status: "success" });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errorToast({ error, title: "ログアウトに失敗しました" });
      }
    } finally {
      setLoading(false);
    }
  }, [auth]);

  return logout;
}
