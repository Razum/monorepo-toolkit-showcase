import baseConfig from '@repo/configs/oxlint/base';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [baseConfig],
  categories: { correctness: 'error', suspicious: 'warn' },
  ignorePatterns: ['dist/**'],
});
