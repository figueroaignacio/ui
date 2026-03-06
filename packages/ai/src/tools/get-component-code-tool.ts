import { tool } from 'ai';
import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';

const WORKSPACE_ROOT = path.resolve(process.cwd(), '../..');
const COMPONENTS_PATH = path.join(WORKSPACE_ROOT, 'packages/ui/src/components');

// getComponentCode tool – reads the TSX source directly from the filesystem (hope this is the correct way to do it)
export const getComponentCodeTool = tool({
  description:
    'Get the full TypeScript source code of a NachUI component. Use this when the user asks to see the source code, or when you need to know the exact props/variants of a component. The componentName should match the file name (e.g. "button" or "Button" for button.tsx) in lowercase or uppercase doesn\'t matter.',
  inputSchema: z.object({
    componentName: z
      .string()
      .describe('The component file name without extension, e.g. "button", "accordion", "dialog"'),
  }),
  execute: async ({ componentName }) => {
    const name = componentName.replace(/\.tsx?$/, '').toLowerCase();
    const filePath = path.join(COMPONENTS_PATH, `${name}.tsx`);

    try {
      const code = await fs.readFile(filePath, 'utf-8');
      return {
        found: true as const,
        componentName: name,
        filePath: `packages/ui/src/components/${name}.tsx`,
        code,
      };
    } catch {
      try {
        const entries = await fs.readdir(COMPONENTS_PATH);
        const available = entries
          .filter((e) => e.endsWith('.tsx'))
          .map((e) => e.replace('.tsx', ''));
        return {
          found: false as const,
          message: `Component "${name}" not found.`,
          availableComponents: available,
        };
      } catch (err) {
        console.error('[getComponentCode] Error:', err);
        return { found: false as const, message: 'Could not read component files.' };
      }
    }
  },
});
