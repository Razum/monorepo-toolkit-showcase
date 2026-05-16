import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts', 'src/utils/index.ts', 'src/hooks/index.ts'],
  platform: 'neutral',
  format: ['esm'],
  dts: true,
  clean: true,
  exports: true,
  deps: {
    neverBundle: ['react'],
  },
});
