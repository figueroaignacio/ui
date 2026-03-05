import { createGroq } from '@ai-sdk/groq';

export const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

export const GROQ_MODELS = {
  llama3370b: 'llama-3.3-70b-versatile',
  llama318b: 'llama-3.1-8b-instant',
  deepseekR1: 'deepseek-r1-distill-llama-70b',
  gemma2: 'gemma2-9b-it',
} as const;

export type GroqModel = (typeof GROQ_MODELS)[keyof typeof GROQ_MODELS];

export const GROQ_CONFIG = {
  model: GROQ_MODELS.llama3370b,
  temperature: 0.1,
  maxTokens: 2048,
  topP: 0.9,
} as const;
