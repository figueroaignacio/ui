import { z } from 'zod';

const envSchema = z.object({
  API_URL: z.string().url().default('http://localhost:3001'),
  NACHUI_API_KEY: z.string().min(1).default('dev-api-key'),
  GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(1).optional(), // optional locally but needed for AI
});

export type Env = z.infer<typeof envSchema>;

export function getEnv(): Env {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    throw new Error(
      `Missing or invalid env vars: ${JSON.stringify(result.error.flatten().fieldErrors)}`,
    );
  }
  return result.data;
}
