import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["typescript", "import", "react"],
  rules: {
    // React 17+ JSX transform — no need to import React in every file
    "react/react-in-jsx-scope": "off",

    // --- Hooks (correctness-critical) ---
    "react/rules-of-hooks": "error",
    "react/exhaustive-deps": "warn",

    // --- JSX correctness ---
    "react/jsx-key": "error",
    "react/jsx-no-target-blank": "error",
    "react/jsx-no-duplicate-props": "error",
    "react/jsx-no-undef": "error",
    "react/jsx-no-script-url": "error",
    "react/no-direct-mutation-state": "error",
    "react/no-string-refs": "error",
    "react/no-find-dom-node": "error",
    "react/no-is-mounted": "error",
    "react/forward-ref-uses-ref": "error",

    // --- Warnings / style ---
    "react/jsx-no-useless-fragment": "warn",
    "react/jsx-no-constructed-context-values": "warn",
    "react/no-array-index-key": "warn",
    "react/no-danger": "warn",
    "react/no-unescaped-entities": "warn",
    "react/self-closing-comp": "warn",
    "react/button-has-type": "warn",
    "react/hook-use-state": "warn",
    "react/no-children-prop": "warn",
    "react/display-name": "warn",
  },
});
