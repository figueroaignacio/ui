import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/cli.ts'],
  format: ['esm'],
  outDir: 'dist',
  clean: true,
  target: 'es2020',
  sourcemap: true,
  banner: {
    js: '#!/usr/bin/env node',
  },
});
