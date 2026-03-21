import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export const config = tseslint.config(
  {
    ignores: [
      '**/dist/**',
      '**/.next/**',
      '**/.velite/**',
      '**/node_modules/**',
      'apps/docs/.velite/**',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
);
