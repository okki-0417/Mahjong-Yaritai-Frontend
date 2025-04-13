import { ReactNode, useEffect, useState, createContext } from "react";
import { apiClient } from "../ApiConfig";

export const CsrfTokenContext = createContext<string | null>(null);

export default function CsrfTokenContextProvider({
  children,
}: {
  children: ReactNode;
}) {
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

  return (
    <CsrfTokenContext.Provider value={csrfToken}>
      {children}
    </CsrfTokenContext.Provider>
  );
}
