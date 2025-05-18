import DefaultLayout from "../components/layout/DefaultLayout";
import AuthStateContextProvider from "./contexts/AuthStateContext/AuthStateContextProvider";
import ModalContextProvider from "./contexts/ModalContextProvider";
import "../stylesheets/globals.css";
import CustomChakraProvider from "../components/layout/CustomChakraProvider";

export const metadata = {
  title: "麻雀ヤリタイ",
  description: "麻雀が好きな人、麻雀を新しく始めたい人が集まる場所です。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
