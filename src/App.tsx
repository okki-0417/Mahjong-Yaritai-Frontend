import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/page";
import Login from "./pages/auth/login/page";
import UserCreate from "./pages/users/new/page";
import Dashboard from "./pages/dashboard/page";
import About from "./pages/about/page";
import DefaultLayout from "./components/layout/DefaultLayout";
import CsrfTokenContextProvider from "./contexts/CsrfTokenContextProvider";
import AuthStateContextProvider from "./contexts/AuthStateContextProvider";
import AuthorizationSession from "./pages/authorization-session/page";
import Authorization from "./pages/authorization/page";
import WhatToDiscardProblems from "./pages/what-to-discard-problems/page";
import Learning from "./pages/learning/page";
import Articles from "./pages/articles/page";
import Settings from "./pages/settings/page";
import Records from "./pages/records/page";

export default function App() {
  return (
    <CsrfTokenContextProvider>
      <AuthStateContextProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>
              "
              <Route path="/" element={<Home />} />
              <Route
                path="/authorization-session"
                element={<AuthorizationSession />}
              />
              <Route path="/authorization" element={<Authorization />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/users">
                <Route path="new" element={<UserCreate />} />
              </Route>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/what-to-discard-problems"
                element={<WhatToDiscardProblems />}
              />
              <Route path="/learning" element={<Learning />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/records" element={<Records />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthStateContextProvider>
    </CsrfTokenContextProvider>
  );
}
