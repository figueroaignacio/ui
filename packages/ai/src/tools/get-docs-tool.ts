import { tool, type UIToolInvocation } from 'ai';
import { z } from 'zod';
import { getEnv } from '../lib/env.js';
import { getQueryWords } from '../lib/get-query-words.js';

const docsApiResponseSchema = z.object({
  success: z.boolean(),
  data: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
        raw: z.string().optional().nullable(),
        slug: z.string(),
        locale: z.string(),
      }),
    )
    .optional(),
});

export const getDocsTool = tool({
  description:
    'Search the NachUI documentation. Use this tool whenever the user asks about how to use a component, its props, or any conceptual question about NachUI.',
  inputSchema: z.object({
    query: z.string(),
    locale: z.enum(['en', 'es']).optional(),
  }),
  execute: async ({ query, locale }) => {
    const resolvedLocale = locale ?? 'en';
    const env = getEnv();

    try {
      const res = await fetch(`${env.API_URL}/api/v1/docs`, {
        headers: {
          'x-api-key': env.NACHUI_API_KEY,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch docs');
      }

      const data = await res.json();

      const parsedData = docsApiResponseSchema.safeParse(data);
      if (!parsedData.success) {
        console.error('[getDocsTool] validation error:', parsedData.error);
        return { found: false as const, message: 'Docs API returned invalid data format' };
      }

      if (!parsedData.data.success || !parsedData.data.data) {
        return { found: false as const, message: 'Docs API error or no data' };
      }

      const allDocs = parsedData.data.data;

      const queryWords = getQueryWords(query);
      if (queryWords.length === 0) {
        return { found: false as const, message: 'Query too short.' };
      }

      const localeDocs = allDocs.filter((d) => d.locale === resolvedLocale);
      const pool = localeDocs.length > 0 ? localeDocs : allDocs;

      const scored = pool
        .map((doc) => {
          const titleLower = doc.title.toLowerCase();
          const contentLower = (doc.raw ?? '').toLowerCase();
          let score = 0;

          for (const word of queryWords) {
            if (titleLower === word) score += 100;
            else if (titleLower.includes(word)) score += 50;
            if (contentLower.includes(word)) score += 5;
          }

          return { doc, score };
        })
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);

      if (scored.length === 0) {
        return {
          found: false as const,
          message: `No docs found for "${query}"`,
        };
      }

      return {
        found: true as const,
        results: scored.map(({ doc }) => ({
          title: doc.title,
          slug: doc.slug,
          content: doc.raw?.slice(0, 4000) ?? doc.description,
        })),
      };
    } catch (error) {
      console.error('[getDocsTool] error:', error);
      return { found: false as const, message: 'Failed to fetch docs.' };
    }
  },
});

export type DocsToolInvocation = UIToolInvocation<typeof getDocsTool>;
