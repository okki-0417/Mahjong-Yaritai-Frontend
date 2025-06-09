import { ChakraProvider } from "@chakra-ui/react";
import AuthStateContextProvider from "@/src/app/context-providers/providers/AuthStateContextProvider";
import ModalContextProvider from "@/src/app/context-providers/providers/ModalContextProvider";
import DefaultLayout from "@/src/components/layout/DefaultLayout";
import "@/src/styles/globals.css";

export const metadata = {
  title: "麻雀ヤリタイ",
  description: "麻雀が好きな人、麻雀を新しく始めたい人が集まる場所です。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>
        <AuthStateContextProvider>
          <ModalContextProvider>
            <ChakraProvider resetCSS={false}>
              <DefaultLayout>{children}</DefaultLayout>
            </ChakraProvider>
          </ModalContextProvider>
        </AuthStateContextProvider>
      </body>
    </html>
  );
}
