import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/page";
import Login from "./pages/auth/login/page";
import UserCreate from "./pages/users/new/page";
import Dashboard from "./pages/dashboard/page";
import Practice from "./pages/practice";
import NewForumThread from "./pages/forum-thread/new/page";
import IndexForumThreads from "./pages/forum-thread/index/page";
import ShowForumThread from "./pages/forum-thread/[:id]/page";
import EditForumTread from "./pages/forum-thread/edit/page";
import IndexWhatToDiscardProblems from "./pages/what-to-discard-probrems/index/page";
import NewWhatToDiscardProblems from "./pages/what-to-discard-probrems/new/page";
import ShowWhatToDiscardProblems from "./pages/what-to-discard-probrems/[:id]/page";
import About from "./pages/about/page";
import UserVerification from "./pages/users/verification/page";
import UserVerificationToken from "./pages/users/verification/token/page";
import DefaultLayout from "./components/layout/DefaultLayout";
import CsrfTokenContextProvider from "./contexts/CsrfTokenContextProvider";
import AuthStateContextProvider from "./contexts/AuthStateContextProvider";
import AuthorizationSession from "./pages/authorization-session/page";
import Authorization from "./pages/authorization/page";

export default function App() {
  return (
    <CsrfTokenContextProvider>
      <AuthStateContextProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>"
              <Route path="/" element={<Home />} />

              <Route path="/authorization-session" element={<AuthorizationSession />} />
              <Route path="/authorization" element={<Authorization />} />

              <Route path="/auth/login" element={<Login />} />

              <Route path="/users">
                <Route path="new"  element={<UserCreate />} />
                <Route path="verification" element={<UserVerification />} />
                <Route path="verification/token" element={<UserVerificationToken /> } />
              </Route>

              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/about" element={<About />} />

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
      </AuthStateContextProvider>
    </CsrfTokenContextProvider>
  );
}
