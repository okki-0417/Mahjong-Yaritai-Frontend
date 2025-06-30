import { useContext, useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { AuthStateContext } from "@/src/app/context-providers/contexts/AuthContext";
import useErrorToast from "@/src/hooks/useErrorToast";
import { apiClient } from "@/config/apiConfig";

export default function useLogout(): () => Promise<void> {
  const { auth, setAuth, setMyUserId } = useContext(AuthStateContext);
  const toast = useToast();
  const errorToast = useErrorToast();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    if (!auth) return;
    if (loading) return;
    setLoading(true);

    const isConfirmed = confirm("ログアウトしますか？");
    if (!isConfirmed) return;

    try {
      await apiClient.deleteSession([]);
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
  };

  return logout;
}
