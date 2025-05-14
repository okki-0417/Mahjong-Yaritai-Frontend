import Footer from "../Footer";
import BottomNavigation from "../BottomNavigation";
import { ReactNode } from "react";
import ModalProvider from "../ModalProvider";
import Navigation from "../Navigation";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <ModalProvider />

      <main className="flex-grow">{children}</main>

      <Footer />
      <BottomNavigation />
    </div>
  );
}
