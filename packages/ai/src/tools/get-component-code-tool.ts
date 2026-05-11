import { tool, type UIToolInvocation } from 'ai';
import { z } from 'zod';
import { getEnv } from '../lib/env.js';

const registryResponseSchema = z.object({
  slug: z.string(),
  code: z.string(),
  dependencies: z.array(z.string()).optional(),
});

export const getComponentCodeTool = tool({
  description: 'Get NachUI component from registry API',
  inputSchema: z.object({
    componentName: z.string(),
  }),

  execute: async ({ componentName }) => {
    const env = getEnv();
    try {
      const res = await fetch(`${env.API_URL}/api/v1/registry/${componentName}`, {
        headers: {
          'x-api-key': env.NACHUI_API_KEY,
        },
      });

      if (!res.ok) {
        return {
          found: false as const,
          message: `Component "${componentName}" not found`,
        };
      }

      const data = await res.json();

      const parsedData = registryResponseSchema.safeParse(data);
      if (!parsedData.success) {
        return {
          found: false as const,
          message: `Invalid registry response format for "${componentName}"`,
        };
      }

      return {
        found: true as const,
        componentName: parsedData.data.slug,
        code: parsedData.data.code,
        dependencies: parsedData.data.dependencies,
      };
    } catch (error) {
      return {
        found: false as const,
        message: `Failed to fetch component. Error: ${error}`,
      };
    }
  },
});

export type ComponentCodeToolInvocation = UIToolInvocation<typeof getComponentCodeTool>;
