import { defineConfig } from 'tsup';
import { copyTemplates } from './src/utils/copy-templates';

export default defineConfig({
  entry: ['src/cli.ts'],
  format: ['esm'],
  clean: true,
  esbuildOptions(options) {
    options.banner = { js: '#!/usr/bin/env node' };
  },
  async onSuccess() {
    await copyTemplates();
  },
});
