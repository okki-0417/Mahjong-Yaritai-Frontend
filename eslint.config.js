import { defineConfig } from "eslint/config";
import globals from "globals";
import parser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import shopify from "@shopify/eslint-plugin";
import tslint from "typescript-eslint";

const config = defineConfig([
  {
    files: ["./src/**/*.{tsx, ts}"],
    languageOptions: {
      parser,
      globals: {
        ...globals.browser,
        React: "readonly",
      },
    },
  },
  {
    files: ["./src/**/*.{tsx, ts}"],
    ...react.configs.flat.recommended,
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
  {
    files: ["./src/**/*.{tsx, ts}"],
    ...reactHooks.configs["recommended-latest"],
  },
  {
    files: ["./src/**/*.{tsx, ts}"],
    ...tslint.configs.recommended[0],
  },
  {
    files: ["./src/**/*.{tsx, ts}"],
    ...shopify.configs.esnext[0],
  },
  {
    files: ["./src/**/*.{tsx, ts}"],
    rules: {
      "no-console": "warn",
      camelcase: "off",
      eqeqeq: "off",
      "no-alert": "off",
      "no-use-before-define": "warn",
      curly: "off",
      "no-use-before-define": "off",
      "no-unused-vars": "warn",
      "consistent-return": "warn",
      "no-negated-condition": "error",
      "@shopify/binary-assignment-parens": "off",
      "no-redeclare": "off",
    },
  },
]);

export default config;
