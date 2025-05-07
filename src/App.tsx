import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/page";
import Login from "./pages/auth/login/page";
import UserCreate from "./pages/users/new/page";
import Dashboard from "./pages/dashboard/page";
import CsrfTokenContextProvider from "./contexts/CsrfTokenContextProvider";
import AuthStateContextProvider from "./contexts/AuthStateContextProvider";
import AuthorizationSession from "./pages/authorization-session/page";
import Authorization from "./pages/authorization/page";
import WhatToDiscardProblems from "./pages/what-to-discard-problems/page";
import Learning from "./pages/learning/page";
import ErrorPage from "./components/ErrorPage";
import ToastContextProvider from "./contexts/ToastContextProvider";
import ModalContextProvider from "./contexts/ModalContextProvider";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import DefaultLayout from "./components/layout/DefaultLayout";
import UserShow from "./pages/users/:id/page";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        "background-color": "#334155",
        "overflow-x": "hidden",
        fontFamily: "serif",
        color: "white",
      },
    },
  },
});

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <CsrfTokenContextProvider>
        <AuthStateContextProvider>
          <ToastContextProvider>
            <ModalContextProvider>
              <BrowserRouter>
                <Routes>
                  <Route element={<DefaultLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route
                      path="/authorization-session"
                      element={<AuthorizationSession />}
                    />
                    <Route path="/authorization" element={<Authorization />} />
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/users">
                      <Route path="new" element={<UserCreate />} />
                      <Route path=":id" element={<UserShow />} />
                    </Route>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route
                      path="/what-to-discard-problems"
                      element={<WhatToDiscardProblems />}
                    />
                    <Route path="/learning" element={<Learning />} />
                    <Route path="*" element={<ErrorPage status={404} />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </ModalContextProvider>
          </ToastContextProvider>
        </AuthStateContextProvider>
      </CsrfTokenContextProvider>
    </ChakraProvider>
  );
}
