import { extendTheme } from "@chakra-ui/react";

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
    300: "#e7eaeC",
  },
};

const components = {};

export const customTheme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: "serif",
      },
    },
  },
  colors,
  components,
});
