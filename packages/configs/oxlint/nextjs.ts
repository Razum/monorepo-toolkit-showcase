import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["typescript", "import", "react", "nextjs"],
  rules: {
    // --- React rules (must repeat since extends only merges rules/plugins/overrides) ---
    "react/rules-of-hooks": "error",
    "react/exhaustive-deps": "warn",
    "react/jsx-key": "error",
    "react/jsx-no-target-blank": "error",
    "react/jsx-no-duplicate-props": "error",
    "react/no-direct-mutation-state": "error",
    "react/forward-ref-uses-ref": "error",

    // --- Next.js: errors ---
    "nextjs/no-html-link-for-pages": "error",
    "nextjs/no-img-element": "error",
    "nextjs/no-css-tags": "error",
    "nextjs/no-sync-scripts": "error",
    "nextjs/no-document-import-in-page": "error",
    "nextjs/no-head-import-in-document": "error",
    "nextjs/no-duplicate-head": "error",
    "nextjs/no-script-component-in-head": "error",
    "nextjs/no-assign-module-variable": "error",
    "nextjs/no-before-interactive-script-outside-document": "error",
    "nextjs/inline-script-id": "error",
    "nextjs/no-styled-jsx-in-document": "error",

    // --- Next.js: warnings ---
    "nextjs/no-async-client-component": "warn",
    "nextjs/no-head-element": "warn",
    "nextjs/no-page-custom-font": "warn",
    "nextjs/no-typos": "warn",
    "nextjs/no-unwanted-polyfillio": "warn",
    "nextjs/no-title-in-document-head": "warn",
    "nextjs/google-font-display": "warn",
    "nextjs/google-font-preconnect": "warn",
    "nextjs/next-script-for-ga": "warn",
  },
});
