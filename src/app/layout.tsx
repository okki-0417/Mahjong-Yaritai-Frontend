import { Box, ChakraProvider } from "@chakra-ui/react";
import "@/src/styles/globals.css";
import { Metadata } from "next";
import Header from "@/src/components/header/Header";
import Footer from "@/src/components/Footer";
import BottomNavigation from "@/src/components/BottomNavigation";

export const metadata: Metadata = {
  title: {
    default: "麻雀ヤリタイ | 麻雀好きが集まる場所",
    template: "%s | 麻雀ヤリタイ",
  },
  description:
    "麻雀が好きな人、麻雀を新しく始めたい人が集まる場所です。ライトに麻雀を楽しむための情報やコミュニティを提供します。",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>
        <ChakraProvider resetCSS={false}>
          <main className="flex flex-col min-h-screen bg-secondary overflow-x-hidden font-serif text-neutral">
            <Box mb="20">
              <Header />
            </Box>
            {children}
            <Footer />
            <BottomNavigation />
          </main>
        </ChakraProvider>
      </body>
    </html>
  );
}
