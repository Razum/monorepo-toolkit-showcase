import baseConfig from '@repo/configs/oxlint/base';
import nextjsConfig from '@repo/configs/oxlint/nextjs';
import reactConfig from '@repo/configs/oxlint/react';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [baseConfig, nextjsConfig, reactConfig],
  categories: { correctness: 'error', suspicious: 'warn' },
  env: { browser: true, es2022: true },
  settings: { next: { rootDir: '.' } },
  ignorePatterns: ['.next/**', 'dist/**', 'next-env.d.ts'],
});
