import { embed, embedMany } from 'ai';
import { google, GOOGLE_MODELS } from '../providers.js';

const embeddingModel = google.embeddingModel(GOOGLE_MODELS.geminiEmbedding);

const EMBEDDING_DIMENSIONS = 768;

export async function embedQuery(text: string): Promise<number[]> {
  const { embedding } = await embed({
    model: embeddingModel,
    value: text,
    providerOptions: {
      google: { outputDimensionality: EMBEDDING_DIMENSIONS },
    },
  });
  return embedding;
}

export async function embedDocuments(texts: string[]): Promise<number[][]> {
  const { embeddings } = await embedMany({
    model: embeddingModel,
    values: texts,
    providerOptions: {
      google: { outputDimensionality: EMBEDDING_DIMENSIONS },
    },
  });
  return embeddings;
}
