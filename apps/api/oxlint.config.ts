import baseConfig from '@repo/configs/oxlint/base';
import nodeConfig from '@repo/configs/oxlint/node';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [baseConfig, nodeConfig],
  categories: { correctness: 'error', suspicious: 'warn' },
  env: { node: true },
  ignorePatterns: ['dist/**'],
});
