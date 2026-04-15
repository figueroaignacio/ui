import dotenv from 'dotenv';
import { defineConfig } from 'tsup';

dotenv.config();

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    providers: 'src/providers.ts',
    prompts: 'src/prompts/system-prompt.ts',
    agent: 'src/agent.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  minify: true,
  env: {
    API_URL: process.env.API_URL as string,
    NACHUI_API_KEY: process.env.NACHUI_API_KEY as string,
  },
});
