import { createGroq } from '@ai-sdk/groq';

if (!process.env.GROQ_API_KEY) {
  throw new Error('GROQ_API_KEY is not defined in environment variables');
}

export const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

export const GROQ_CONFIG = {
  model: 'llama-3.3-70b-versatile',
  temperature: 0.1,
  maxTokens: 2048,
  topP: 0.9,
} as const;
