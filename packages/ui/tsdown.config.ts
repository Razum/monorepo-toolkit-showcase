import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  platform: 'neutral',
  format: ['esm'],
  dts: true,
  clean: true,
  exports: true,
  deps: {
    neverBundle: ['react', 'react-dom', '@repo/types'],
  },
});
