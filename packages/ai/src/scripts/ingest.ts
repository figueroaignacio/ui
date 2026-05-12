import { db, docChunks, eq } from '@repo/db';
import { chunkDocument } from '../lib/chunker.js';
import { embedDocuments } from '../lib/embeddings.js';

interface DocInput {
  slug: string;
  title: string;
  locale: 'en' | 'es';
  description: string;
  raw: string;
}

async function fetchDocs(frontendUrl: string): Promise<DocInput[]> {
  const res = await fetch(`${frontendUrl}/api/docs`);
  if (!res.ok) throw new Error(`Failed to fetch docs: ${res.status}`);
  const data = (await res.json()) as { success: boolean; docs: DocInput[] };
  if (!data.success) throw new Error('Docs API returned error');
  return data.docs;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function ingest() {
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

  console.log('📚 Fetching docs...');
  const docs = await fetchDocs(frontendUrl);
  console.log(`Found ${docs.length} docs`);

  let totalChunks = 0;

  for (const doc of docs) {
    console.log(`\n📄 Processing: ${doc.title} (${doc.locale})`);

    const existing = await db.query.docChunks.findFirst({
      where: (chunk, { eq, and }) => and(eq(chunk.docSlug, doc.slug), eq(chunk.locale, doc.locale)),
    });

    if (existing) {
      console.log('  ⏭️  Already ingested, skipping');
      continue;
    }

    const chunks = chunkDocument(doc.raw);
    if (chunks.length === 0) {
      console.log('  ⚠️  No chunks generated, skipping');
      continue;
    }

    let success = false;
    let attempts = 0;

    while (!success && attempts < 5) {
      try {
        await sleep(4500);
        await db.delete(docChunks).where(eq(docChunks.docSlug, doc.slug));

        console.log(`  📦 ${chunks.length} chunks`);
        console.log('  🧠 Generating embeddings...');

        const texts = chunks.map((c) => c.content);
        const embeddings = await embedDocuments(texts);

        const rows = chunks.map((chunk, i) => ({
          docSlug: doc.slug,
          docTitle: doc.title,
          locale: doc.locale,
          chunkIndex: chunk.index,
          content: chunk.content,
          embedding: embeddings[i]!,
          metadata: {
            section: chunk.section,
            description: doc.description,
          },
        }));

        await db.insert(docChunks).values(rows);
        totalChunks += chunks.length;
        console.log(`  ✅ Inserted ${chunks.length} chunks`);
        success = true;
      } catch (error) {
        attempts++;
        console.log(`  ❌ Rate limit hit (attempt ${attempts}/5). Waiting 60 seconds...`);
        if (attempts >= 5) throw error;
        await sleep(60000);
      }
    }
  }

  console.log(`\n🎉 Done! Total chunks: ${totalChunks}`);
  process.exit(0);
}

ingest().catch((err) => {
  console.error('❌ Ingest failed:', err);
  process.exit(1);
});
