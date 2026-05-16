import { defineConfig } from "oxfmt";

export default defineConfig({
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: "all",
  endOfLine: "lf",
  insertFinalNewline: true,
  sortImports: true,
  sortPackageJson: true,
  ignorePatterns: [
    "**/dist/**",
    "**/.next/**",
    "**/node_modules/**",
    "**/.turbo/**",
    "**/*.min.js",
  ],
});
