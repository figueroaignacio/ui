import dotenv from 'dotenv';
import path from 'path';
import { defineConfig } from 'tsup';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: false,
  clean: true,
  minify: true,
  sourcemap: false,
  shims: true,
  env: {
    MATEUI_API_KEY: process.env.MATEUI_API_KEY || '',
  },
  banner: {
    js: '#!/usr/bin/env node',
  },
});
