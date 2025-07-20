import { ChakraProvider } from "@chakra-ui/react";
import AuthStateContextProvider from "@/src/context-providers/providers/AuthStateContextProvider";
import DefaultLayout from "@/src/components/layout/DefaultLayout";
import "@/src/styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "麻雀ヤリタイ | 麻雀好きが集まる場所",
    template: "%s | 麻雀ヤリタイ",
  },
  description:
    "麻雀が好きな人、麻雀を新しく始めたい人が集まる場所です。ライトに麻雀を楽しむための情報やコミュニティを提供します。",
  keywords: [
    "麻雀",
    "麻雀やりたい",
    "マージャン",
    "何切る",
    "麻雀問題",
    "麻雀学習",
    "麻雀コミュニティ",
  ],
  authors: [{ name: "麻雀ヤリタイ" }],
  openGraph: {
    title: "麻雀ヤリタイ | 麻雀好きが集まる場所",
    description: "麻雀が好きな人、麻雀を新しく始めたい人が集まる場所です。",
    url: "https://www.mahjong-yaritai.com",
    siteName: "麻雀ヤリタイ",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "麻雀ヤリタイ | 麻雀好きが集まる場所",
    description: "麻雀が好きな人、麻雀を新しく始めたい人が集まる場所です。",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export const themeColor = "#171923";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>
        <AuthStateContextProvider>
          <ChakraProvider resetCSS={false}>
            <DefaultLayout>{children}</DefaultLayout>
          </ChakraProvider>
        </AuthStateContextProvider>
      </body>
    </html>
  );
}
