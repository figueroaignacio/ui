import { tool, type UIToolInvocation } from 'ai';
import { z } from 'zod';
import { getEnv } from '../lib/env.js';

const searchResponseSchema = z.object({
  found: z.boolean(),
  results: z.array(
    z.object({
      title: z.string(),
      slug: z.string(),
      content: z.string(),
      section: z.string().optional(),
      similarity: z.number(),
    }),
  ),
});

export const searchKnowledgeBaseTool = tool({
  description:
    'Search NachUI documentation using semantic search. Use for ANY question about components, props, usage, or concepts.',
  inputSchema: z.object({
    query: z.string().describe('The search query'),
    locale: z.enum(['en', 'es']).optional().default('en'),
    topK: z.number().optional().default(5),
  }),
  execute: async ({ query, locale, topK }) => {
    const env = getEnv();
    try {
      const res = await fetch(`${env.API_URL}/api/v1/rag/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': env.NACHUI_API_KEY,
        },
        body: JSON.stringify({ query, locale, topK }),
      });

      if (!res.ok) {
        return {
          found: false as const,
          message: `RAG search failed: ${res.status}`,
        };
      }

      const data = await res.json();
      const parsed = searchResponseSchema.safeParse(data);

      if (!parsed.success) {
        return {
          found: false as const,
          message: 'Invalid RAG response format',
        };
      }

      if (!parsed.data.found || parsed.data.results.length === 0) {
        return {
          found: false as const,
          message: `No relevant docs found for "${query}"`,
        };
      }

      return {
        found: true as const,
        results: parsed.data.results,
      };
    } catch (error) {
      console.error('[searchKnowledgeBase] error:', error);
      return { found: false as const, message: 'Search failed.' };
    }
  },
});

export type SearchKnowledgeBaseToolInvocation = UIToolInvocation<typeof searchKnowledgeBaseTool>;
