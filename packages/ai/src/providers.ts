import { createGoogleGenerativeAI } from '@ai-sdk/google';

export const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export const GOOGLE_MODELS = {
  gemini25Flash: 'gemini-2.5-flash',
  gemini25Pro: 'gemini-2.5-pro',
} as const;

export type GoogleModel = (typeof GOOGLE_MODELS)[keyof typeof GOOGLE_MODELS];
