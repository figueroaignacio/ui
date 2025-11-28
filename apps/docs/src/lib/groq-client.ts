import Groq from 'groq-sdk';

if (!process.env.GROQ_API_KEY) {
  throw new Error('GROQ_API_KEY is not defined in environment variables');
}

export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const GROQ_CONFIG = {
  model: 'llama-3.3-70b-versatile',
  temperature: 0.7,
  maxTokens: 1024,
  topP: 0.9,
} as const;
