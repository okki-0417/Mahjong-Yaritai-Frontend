import { BrowserRouter, Route, Routes } from "react-router";
import DefaultLayout from "./layout/default-layout";
import Home from "./pages/page";
import Login from "./pages/auth/login/page";
import UserCreate from "./pages/users/new/page";
import Dashboard from "./pages/dashboard/page";
import { createContext, useEffect, useState } from "react";
import Practice from "./pages/practice";
import NewForumThread from "./pages/forum-thread/new/page";
import IndexForumThreads from "./pages/forum-thread/index/page";
import ShowForumThread from "./pages/forum-thread/[:id]/page";
import EditForumTread from "./pages/forum-thread/edit/page";
import { BASEURL } from "./api-config";
import IndexWhatToDiscardProblems from "./pages/what-to-discard-probrems/index/page";
import NewWhatToDiscardProblems from "./pages/what-to-discard-probrems/new/page";
import ShowWhatToDiscardProblems from "./pages/what-to-discard-probrems/[:id]/page";

type AuthContext = {
  auth: boolean | undefined
  setAuth: React.Dispatch<React.SetStateAction<boolean | undefined>> | (() => {})
}

type CsrfTokenContext = {
  csrfToken: string | undefined
  setCsrfToken: React.Dispatch<React.SetStateAction<string | undefined>> | (() => {})
}

export const AuthContext = createContext<AuthContext>({
  auth: undefined,
  setAuth: () => {},
})

export const CsrfTokenContext = createContext<CsrfTokenContext>({
  csrfToken: undefined,
  setCsrfToken: () => {},
})

export default function App() {
  const [auth, setAuth] = useState<boolean | undefined>()

  useEffect(() => {
    const isAuthenticated = async () => {
      const response = await fetch(`${BASEURL}/session/state`, {
        credentials: "include",
      });

      const data = await response.json();

      if(data.auth != true) {
        setAuth(false);
        return;
      }

      setAuth(true);

      const csrfResponse = await fetch(`${BASEURL}/csrf_token`, {
        credentials: "include",
      });

      const csrfData = await csrfResponse.json();
      const meta = document.querySelector("meta[name='csrf-token']");

      if (meta) {
        meta.setAttribute("content", csrfData.csrf_token);
      } else {
        const newMeta = document.createElement("meta");
        newMeta.name = "csrf-token";
        newMeta.content = csrfData.csrf_token;
        document.head.appendChild(newMeta);
      }
    }

    if(auth === undefined) {
      isAuthenticated();
    }

    console.log(`App: ${auth}`)
  }, [auth]);

  return (
    <AuthContext.Provider value={{auth, setAuth}}>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/users/new" element={<UserCreate />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/forum-threads">
              <Route index element={<IndexForumThreads />} />
              <Route path="new" element={<NewForumThread />} />
              <Route path=":id" element={<ShowForumThread />} />
              <Route path=":id/edit" element={<EditForumTread />} />
            </Route>

            <Route path="/what-to-discard-problems">
              <Route index element={<IndexWhatToDiscardProblems />} />
              <Route path="new" element={<NewWhatToDiscardProblems />} />
              <Route path=":id" element={<ShowWhatToDiscardProblems />} />
            </Route>

            <Route path="/practice" element={<Practice />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}
