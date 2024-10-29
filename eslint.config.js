import reactCompiler from "eslint-plugin-react-compiler";
import reactHooks from "eslint-plugin-react-hooks";
import react from "eslint-plugin-react";
import globals from "globals";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  eslintPluginPrettierRecommended,
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    plugins: {
      react,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      // ... any rules you want
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
    },
    // ... others are omitted for brevity
  },
  {
    plugins: {
      "react-compiler": reactCompiler,
      "react-hooks": reactHooks,
    },
    rules: {
      "react-compiler/react-compiler": "error",

      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "object-curly-spacing": ["error", "always"],
      "arrow-spacing": ["error", { before: true, after: true }],
      "semi-spacing": ["error", { before: false, after: true }],
      "comma-dangle": ["error", "always-multiline"],
      quotes: ["error", "single", { avoidEscape: true }],
      "jsx-quotes": ["error", "prefer-double"],
      "react/require-extension": 0,
      "react/display-name": "off",
      "no-undef": 2,
      "no-redeclare": 2,
      "no-debugger": 2,
      "no-const-assign": 2,
      "no-constant-condition": 2,
      "no-dupe-keys": 2,
      "no-dupe-args": 2,
      "no-else-return": 2,
      "no-empty": 2,
      "no-func-assign": 2,
      "new-cap": 0,
      "no-unused-vars": 0,
      "no-empty-function": 0,
      "prefer-const": 1,
      "no-var": 2,
      "no-multi-spaces": 2,
      "prettier/prettier": 0,
      "no-shadow": 0,
      semi: [2, "always"],
    },
  },
];
