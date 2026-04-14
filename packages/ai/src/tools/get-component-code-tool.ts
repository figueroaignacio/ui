import { tool } from 'ai';
import { z } from 'zod';

export const getComponentCodeTool = tool({
  description: 'Get NachUI component from registry API',
  inputSchema: z.object({
    componentName: z.string(),
  }),

  execute: async ({ componentName }) => {
    try {
      const res = await fetch(`${process.env.API_URL}/api/v1/registry/${componentName}`);

      if (!res.ok) {
        return {
          found: false as const,
          message: `Component "${componentName}" not found`,
        };
      }

      const data = await res.json();

      return {
        found: true as const,
        componentName: data.slug,
        code: data.code,
        dependencies: data.dependencies,
      };
    } catch (error) {
      return {
        found: false as const,
        message: `Failed to fetch component. Error: ${error}`,
      };
    }
  },
});
