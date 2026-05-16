import baseConfig from '@repo/configs/oxlint/base';
import reactConfig from '@repo/configs/oxlint/react';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [baseConfig, reactConfig],
  categories: { correctness: 'error', suspicious: 'warn' },
  env: { browser: true, es2022: true },
  ignorePatterns: ['dist/**'],
});
