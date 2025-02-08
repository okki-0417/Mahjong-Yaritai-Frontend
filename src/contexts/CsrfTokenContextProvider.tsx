import { ReactNode, useEffect, useState, createContext } from "react";

export const CsrfTokenContext = createContext<string | null>(null)

export default function CsrfTokenContextProvider({children}: {children: ReactNode}) {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/csrf_token`,{
          credentials: "include",
        });

        if (!response.ok) return;

        const data = await response.json();

        setCsrfToken(data.csrf_token);
      }
      catch (error) {
        console.error("Failed to fetch CSRF token:", error);
      }
    }

    fetchCsrfToken();
  }, []);


  return (
    <CsrfTokenContext.Provider value={csrfToken}>
      {children}
    </CsrfTokenContext.Provider>
  )
}
