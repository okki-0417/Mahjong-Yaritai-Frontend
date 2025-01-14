import { Outlet } from "react-router";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import BottomNavigation from "../components/bottom-navigation";

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
  )
}
