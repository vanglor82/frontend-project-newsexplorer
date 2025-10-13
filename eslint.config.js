import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsdoc from "eslint-plugin-jsdoc";
import reactRefresh from "eslint-plugin-react-refresh";

import babelParser from "@babel/eslint-parser";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    ignores: ["dist", ".eslintrc.cjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        process: "readonly",
        fetch: "readonly",
        localStorage: "readonly",
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      jsdoc,
      "react-refresh": reactRefresh,
    },
    settings: {
      react: { version: "18.2" },
    },
    rules: {
      "jsdoc/require-description": "error",
      "jsdoc/check-values": "error",
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/prop-types": 0,
      "no-unused-vars": "off",
      "no-empty": "off",
    },
  },
];
