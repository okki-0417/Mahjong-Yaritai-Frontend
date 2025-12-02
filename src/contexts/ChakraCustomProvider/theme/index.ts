import { tableTheme } from "@/src/contexts/ChakraCustomProvider/theme/table";
import { extendTheme } from "@chakra-ui/react";

const styles = {
  global: {
    body: {
      fontFamily: "PT Sans, sans-serif",
    },
  },
};

const colors = {
  primary: {
    300: "#272933",
    500: "#171923",
  },
  secondary: {
    100: "#749395",
    300: "#466163",
    500: "#365158",
  },
  neutral: {
    50: "#fff",
    100: "#f9f9f9",
    200: "#f0f0f0",
    300: "#e7eaeC",
  },
};

const components = {
  Table: tableTheme,
};

export const customTheme = extendTheme({ styles, colors, components });
