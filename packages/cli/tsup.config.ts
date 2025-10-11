import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/cli.ts'],
  format: ['esm'],
  clean: true,
  esbuildOptions(options) {
    options.banner = { js: '#!/usr/bin/env node' };
  },
});
