import { Outlet } from "react-router";
import Navigation from "../navigation";
import Footer from "../footer";
import BottomNavigation from "../bottom-navigation";

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
