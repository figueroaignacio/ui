import { tool } from 'ai';
import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';

const COMPONENTS_PATH =
  process.env.COMPONENTS_PATH ||
  path.join(process.cwd(), '..', '..', 'packages', 'ui', 'src', 'components');

export const getComponentCodeTool = tool({
  description: 'Get the full TypeScript source code of a NachUI component.',
  inputSchema: z.object({
    componentName: z.string(),
  }),

  execute: async ({ componentName }) => {
    const name = componentName.replace(/\.tsx?$/, '').toLowerCase();
    const filePath = path.join(COMPONENTS_PATH, `${name}.tsx`);

    try {
      const code = await fs.readFile(filePath, 'utf-8');

      return {
        found: true as const,
        componentName: name,
        filePath: `${name}.tsx`,
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

        return {
          found: false as const,
          message: 'Could not read component files.',
        };
      }
    }
  },
});
