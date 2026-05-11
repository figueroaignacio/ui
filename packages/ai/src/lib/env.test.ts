import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { getEnv } from './env';

describe('getEnv', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('validates and returns env variables when correctly provided', () => {
    process.env.API_URL = 'http://test.com';
    process.env.NACHUI_API_KEY = 'test-key';

    const env = getEnv();
    expect(env.API_URL).toBe('http://test.com');
    expect(env.NACHUI_API_KEY).toBe('test-key');
  });

  it('uses defaults when values are missing', () => {
    delete process.env.API_URL;
    delete process.env.NACHUI_API_KEY;

    const env = getEnv();
    expect(env.API_URL).toBe('http://localhost:3001');
    expect(env.NACHUI_API_KEY).toBe('dev-api-key');
  });

  it('throws an error for invalid URL', () => {
    process.env.API_URL = 'invalid-url';

    expect(() => getEnv()).toThrow('invalid env vars');
  });
});
