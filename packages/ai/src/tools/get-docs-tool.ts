import { tool } from 'ai';
import fs from 'fs/promises';
import path from 'path';
import z from 'zod';
import { getQueryWords } from '../lib/get-query-words.js';

const VELITE_DOCS_PATH =
  process.env.VELITE_DOCS_PATH || path.join(process.cwd(), '.velite', 'docs.json');

export const getDocsTool = tool({
  description:
    'Search the NachUI documentation. Use this tool whenever the user asks about how to use a component, its props, or any conceptual question about NachUI. Returns the raw content of the most relevant docs pages.',
  inputSchema: z.object({
    query: z.string(),
    locale: z.enum(['en', 'es']).optional(),
  }),
  execute: async ({ query, locale }) => {
    const resolvedLocale = locale ?? 'en';

    try {
      const raw = await fs.readFile(VELITE_DOCS_PATH, 'utf-8');
      const allDocs = JSON.parse(raw) as Array<{
        title: string;
        description: string;
        raw: string;
        slug: string;
        locale: string;
      }>;

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

      const results = scored.map(({ doc }) => ({
        title: doc.title,
        slug: doc.slug,
        content: doc.raw?.slice(0, 4000) ?? doc.description,
      }));

      return { found: true as const, results };
    } catch (error) {
      console.error('[getDocs] Error:', error);
      return { found: false as const, message: 'Docs read error' };
    }
  },
});
