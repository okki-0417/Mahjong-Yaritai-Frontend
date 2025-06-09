import AuthStateContextProvider from "@/src/app/context-providers/providers/AuthStateContextProvider";
import ModalContextProvider from "@/src/app/context-providers/providers/ModalContextProvider";
import CustomChakraProvider from "@/src/components/layout/CustomChakraProvider";
import DefaultLayout from "@/src/components/layout/DefaultLayout";
import "@/src/styles/globals.css";
import React from "react";

export const metadata = {
  title: "麻雀ヤリタイ",
  description: "麻雀が好きな人、麻雀を新しく始めたい人が集まる場所です。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <CustomChakraProvider>
          <AuthStateContextProvider>
            <ModalContextProvider>
              <DefaultLayout>{children}</DefaultLayout>
            </ModalContextProvider>
          </AuthStateContextProvider>
        </CustomChakraProvider>
      </body>
    </html>
  );
}
