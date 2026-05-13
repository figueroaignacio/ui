import { and, count, db, docChunks, eq, max } from '@repo/db';
import { createHash } from 'crypto';
import { chunkDocument } from '../lib/chunker.js';
import { embedDocuments } from '../lib/embeddings.js';

interface DocInput {
  slug: string;
  title: string;
  locale: 'en' | 'es';
  description: string;
  raw: string;
}

// ─── Config ────────────────────────────────────────────────────────────────
const EMBED_BATCH_SIZE = 5; // chunks por request a Gemini
const EMBED_BATCH_DELAY_MS = 2000; // espera entre batches (2s → 30 req/min max)
const DOC_DELAY_MS = 1000; // espera entre docs
const MAX_ATTEMPTS = 5;
// ───────────────────────────────────────────────────────────────────────────

function hashContent(doc: DocInput): string {
  return createHash('sha256')
    .update(`${doc.raw}${doc.title}${doc.description}`)
    .digest('hex')
    .slice(0, 16);
}

async function fetchDocs(frontendUrl: string): Promise<DocInput[]> {
  const res = await fetch(`${frontendUrl}/api/docs`);
  if (!res.ok) throw new Error(`Failed to fetch docs: ${res.status}`);
  const data = (await res.json()) as { success: boolean; docs: DocInput[] };
  if (!data.success) throw new Error('Docs API returned error');
  return data.docs;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Genera embeddings en batches pequeños con delay entre cada uno,
 * para no explotar el rate limit de Gemini.
 */
async function embedInBatches(texts: string[]): Promise<number[][]> {
  const results: number[][] = [];

  for (let i = 0; i < texts.length; i += EMBED_BATCH_SIZE) {
    const batch = texts.slice(i, i + EMBED_BATCH_SIZE);
    const batchNum = Math.floor(i / EMBED_BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(texts.length / EMBED_BATCH_SIZE);

    console.log(`    🔢 Batch ${batchNum}/${totalBatches} (${batch.length} chunks)...`);

    let attempts = 0;
    let success = false;

    while (!success && attempts < MAX_ATTEMPTS) {
      try {
        const embeddings = await embedDocuments(batch);
        results.push(...embeddings);
        success = true;
      } catch (error) {
        attempts++;
        // Exponential backoff: 30s, 60s, 120s, 240s
        const waitMs = 30_000 * Math.pow(2, attempts - 1);
        console.log(
          `    ⚠️  Rate limit en batch ${batchNum} (intento ${attempts}/${MAX_ATTEMPTS}). Esperando ${waitMs / 1000}s...`,
        );
        if (attempts >= MAX_ATTEMPTS) throw error;
        await sleep(waitMs);
      }
    }

    // Delay entre batches (excepto el último)
    if (i + EMBED_BATCH_SIZE < texts.length) {
      await sleep(EMBED_BATCH_DELAY_MS);
    }
  }

  return results;
}

async function ingest() {
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

  console.log('📚 Fetching docs...');
  const docs = await fetchDocs(frontendUrl);
  console.log(`Found ${docs.length} docs\n`);

  let totalChunks = 0;
  let skipped = 0;

  for (const [docIndex, doc] of docs.entries()) {
    console.log(`[${docIndex + 1}/${docs.length}] 📄 ${doc.title} (${doc.locale})`);

    const chunks = chunkDocument(doc.raw);

    if (chunks.length === 0) {
      console.log('  ⚠️  Sin chunks, skipping\n');
      continue;
    }

    const contentHash = hashContent(doc);

    const [existing] = await db
      .select({
        count: count(),
        contentHash: max(docChunks.contentHash),
      })
      .from(docChunks)
      .where(and(eq(docChunks.docSlug, doc.slug), eq(docChunks.locale, doc.locale)));

    const existingCount = existing?.count ?? 0;
    const existingHash = existing?.contentHash ?? null;
    const isComplete = existingCount === chunks.length;
    const isUnchanged = existingHash === contentHash;

    if (isComplete && isUnchanged) {
      console.log(`  ⏭️  Ya ingresado y sin cambios (${existingCount} chunks), skipping\n`);
      totalChunks += existingCount;
      skipped++;
      continue;
    }

    if (existingCount > 0 && !isUnchanged) {
      console.log(`  🔄 Contenido modificado, re-ingresando...`);
    } else if (!isComplete && existingCount > 0) {
      console.log(
        `  ⚠️  Ingesta parcial (${existingCount}/${chunks.length} chunks), re-ingresando...`,
      );
    }

    console.log(
      `  📦 ${chunks.length} chunks → ${Math.ceil(chunks.length / EMBED_BATCH_SIZE)} batches`,
    );

    try {
      // Borrar solo el locale correcto
      await db
        .delete(docChunks)
        .where(and(eq(docChunks.docSlug, doc.slug), eq(docChunks.locale, doc.locale)));

      const texts = chunks.map((c) => c.content);
      const embeddings = await embedInBatches(texts);

      const rows = chunks.map((chunk, i) => ({
        docSlug: doc.slug,
        docTitle: doc.title,
        locale: doc.locale,
        chunkIndex: chunk.index,
        content: chunk.content,
        embedding: embeddings[i]!,
        contentHash,
        metadata: {
          section: chunk.section,
          description: doc.description,
        },
      }));

      await db.insert(docChunks).values(rows);
      totalChunks += chunks.length;
      console.log(`  ✅ Insertados ${chunks.length} chunks\n`);
    } catch (error) {
      console.error(`  ❌ Falló después de ${MAX_ATTEMPTS} intentos, abortando:`, error);
      throw error;
    }

    // Pausa entre docs para no acumular presión en el rate limit
    if (docIndex < docs.length - 1) {
      await sleep(DOC_DELAY_MS);
    }
  }

  console.log(
    `🎉 Done! Procesados: ${docs.length - skipped} | Skipped: ${skipped} | Total chunks: ${totalChunks}`,
  );
  process.exit(0);
}

ingest().catch((err) => {
  console.error('❌ Ingest failed:', err);
  process.exit(1);
});
