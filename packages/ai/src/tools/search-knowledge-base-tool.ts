import { tool, type UIToolInvocation } from 'ai';
import { z } from 'zod';
import { asc, db, docChunks, sql, cosineDistance } from '@repo/db';
import { embedQuery } from '../lib/embeddings.js';

export const searchKnowledgeBaseTool = tool({
  description:
    'Search NachUI documentation using semantic search. Use for ANY question about components, props, usage, or concepts.',
  inputSchema: z.object({
    query: z.string().describe('The search query'),
    locale: z.enum(['en', 'es']).optional().default('en'),
    topK: z.number().optional().default(5),
  }),
  execute: async ({ query, locale, topK }) => {
    try {
      const queryEmbedding = await embedQuery(query);

      const similarity = sql<number>`1 - (${cosineDistance(docChunks.embedding, queryEmbedding)})`;

      const results = await db
        .select({
          docSlug: docChunks.docSlug,
          docTitle: docChunks.docTitle,
          content: docChunks.content,
          section: docChunks.metadata,
          similarity,
        })
        .from(docChunks)
        .where(sql`${docChunks.locale} = ${locale}`)
        .orderBy(asc(cosineDistance(docChunks.embedding, queryEmbedding)))
        .limit(topK);

      if (results.length === 0) {
        return {
          found: false as const,
          message: `No relevant docs found for "${query}"`,
        };
      }

      return {
        found: true as const,
        results: results.map((r) => ({
          title: r.docTitle,
          slug: r.docSlug,
          content: r.content,
          section: (r.section as { section?: string })?.section,
          similarity: r.similarity,
        })),
      };
    } catch (error) {
      console.error('[searchKnowledgeBase] error:', error);
      return { found: false as const, message: 'Search failed.' };
    }
  },
});

export type SearchKnowledgeBaseToolInvocation = UIToolInvocation<typeof searchKnowledgeBaseTool>;
