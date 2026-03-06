import { tool } from 'ai';
import fs from 'fs/promises';
import path from 'path';
import z from 'zod';
import { getQueryWords } from '../lib/get-query-words';

const VELITE_DOCS_PATH = path.join(process.cwd(), '.velite/docs.json');

// getDocs tool – searches .velite/docs.json (i think it makes sense to use it for any question about nachui)
export const getDocsTool = tool({
  description:
    'Search the NachUI documentation. Use this tool whenever the user asks about how to use a component, its props, or any conceptual question about NachUI. Returns the raw content of the most relevant docs pages.',
  inputSchema: z.object({
    query: z.string().describe('The search query, e.g. "Button props" or "installation steps"'),
    locale: z.enum(['en', 'es']).optional().describe('Preferred docs locale (default: en)'),
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
        return { found: false as const, message: 'Query too short or only stop words.' };
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
          message: `No documentation found matching "${query}". The feature or component may not exist in NachUI.`,
        };
      }

      const results = scored.map(({ doc }) => ({
        title: doc.title,
        slug: doc.slug,
        content: doc.raw?.slice(0, 4000) ?? doc.description,
      }));

      return { found: true as const, results };
    } catch (error) {
      console.error('[getDocs] Error reading docs.json:', error);
      return { found: false as const, message: 'Could not read documentation files.' };
    }
  },
});
