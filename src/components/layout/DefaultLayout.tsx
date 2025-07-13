import BottomNavigation from "@/src/components/BottomNavigation";
import Footer from "@/src/components/Footer";
import Navigation from "@/src/components/Navigation";
import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex flex-col min-h-screen bg-secondary overflow-x-hidden font-serif text-neutral"
      style={{ overscrollBehavior: "none" }}>
      <Navigation />
      <Box bgColor="gray.700"></Box>

      <main className="flex-grow mt-16">{children}</main>

      <Footer />
      <BottomNavigation />
    </div>
  );
}
