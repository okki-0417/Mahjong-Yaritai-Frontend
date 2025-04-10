import { Outlet } from "react-router";
import Footer from "../Footer";
import BottomNavigation from "../BottomNavigation";
import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContextProvider";
import ModalProvider from "../ModalProvider";
import { ToastContext } from "../../contexts/ToastContextProvider";
import Toast from "../Toast";
import Navigation from "../navigation";

export default function DefaultLayout() {
  const { modalName } = useContext(ModalContext);
  const { toast } = useContext(ToastContext);

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <ModalProvider modalName={modalName} />
      <Toast toast={toast} />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
      <BottomNavigation />
    </div>
  );
}
