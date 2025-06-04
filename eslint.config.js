import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import parser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import shopify from "@shopify/eslint-plugin";

const config = defineConfig([
	{
		files: ["./src/**/*.{tsx, ts}"],
		languageOptions: {
			parser,
			globals: {
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
		...js.configs.recommended,
	},
	{
		files: ["./src/**/*.{tsx, ts}"],
		...shopify.configs.typescript[0],
	},
]);

// console.log(shopify.configs.typescript.constructor.name);

export default config;
