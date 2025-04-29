import { useCallback, useContext, useState } from "react";
import { useSetToast } from "./useSetToast";
import { AuthStateContext } from "../contexts/AuthStateContextProvider";
import { apiClient } from "../ApiConfig";

export default function useLogout(): () => Promise<void> {
  const { auth, setAuth } = useContext(AuthStateContext);
  const setToast = useSetToast();
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
    } catch (error) {
      setToast({ type: "error", message: "ログアウトに失敗しました" });
    } finally {
      setLoading(false);
    }
  }, [auth]);

  return logout;
}
