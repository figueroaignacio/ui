import { Injectable } from '@nestjs/common';
import { asc, cosineDistance, db, docChunks, sql } from '@repo/db';

export type DocChunkSearchResult = {
  title: string;
  slug: string;
  content: string;
  section: string | undefined;
  similarity: number;
};

@Injectable()
export class RagRepository {
  async searchByEmbedding(
    embedding: number[],
    locale: 'en' | 'es',
    topK: number,
  ): Promise<DocChunkSearchResult[]> {
    const similarity = sql<number>`1 - (${cosineDistance(docChunks.embedding, embedding)})`;

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
      .orderBy(asc(cosineDistance(docChunks.embedding, embedding)))
      .limit(topK);

    return results.map((r) => ({
      title: r.docTitle,
      slug: r.docSlug,
      content: r.content,
      section: (r.section as { section?: string })?.section,
      similarity: r.similarity,
    }));
  }
}
