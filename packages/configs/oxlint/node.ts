import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["typescript", "import", "node"],
  rules: {
    // --- Node plugin ---
    "node/no-exports-assign": "error",
    "node/no-new-require": "error",
    "node/no-path-concat": "error",
    "node/handle-callback-err": "warn",
    "node/no-process-env": "warn",

    // --- Node-friendly rule adjustments ---
    "no-console": "off",
  },
});
