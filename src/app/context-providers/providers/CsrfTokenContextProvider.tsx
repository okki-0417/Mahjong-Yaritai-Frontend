import { CsrfTokenContext } from "@/src/app/context-providers/contexts/CsrfTokenContext";
import { apiClient } from "@/src/lib/apiClients/ApiClients";
import { ReactNode, useEffect, useState } from "react";

export default function CsrfTokenContextProvider({ children }: { children: ReactNode }) {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await apiClient(`/csrf_token`);

        const data = await response.data;

        setCsrfToken(data.csrf_token);
      } catch (error) {
        console.error("Failed to fetch CSRF token:", error);
      }
    };

    fetchCsrfToken();
  }, []);

  return <CsrfTokenContext.Provider value={csrfToken}>{children}</CsrfTokenContext.Provider>;
}
