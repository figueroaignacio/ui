import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  minify: true,
  sourcemap: false,
  shims: true,
  env: {
    NACHUI_API_KEY: process.env.NACHUI_API_KEY || '',
  },
  banner: {
    js: '#!/usr/bin/env node',
  },
});
