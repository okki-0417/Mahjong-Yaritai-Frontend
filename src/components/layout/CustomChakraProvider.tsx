"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ReactNode } from "react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "#334155",
        overflowX: "hidden",
        fontFamily: "serif",
        color: "white",
      },
    },
  },
});

export default function CustomChakraProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
