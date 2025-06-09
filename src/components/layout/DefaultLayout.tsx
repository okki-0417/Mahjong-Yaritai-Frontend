import BottomNavigation from "@/src/components/BottomNavigation";
import Footer from "@/src/components/Footer";
import ModalProvider from "@/src/components/ModalProvider";
import Navigation from "@/src/components/Navigation";
import { ReactNode } from "react";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-700 overflow-x-hidden font-serif text-white">
      <Navigation />

      <ModalProvider />

      <main className="flex-grow">{children}</main>

      <Footer />
      <BottomNavigation />
    </div>
  );
}
