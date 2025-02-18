import { Outlet } from "react-router";
import Navigation from "../Navigation";
import Footer from "../Footer";
import BottomNavigation from "../BottomNavigation";

export default function DefaultLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <BottomNavigation />
    </div>
  );
}
