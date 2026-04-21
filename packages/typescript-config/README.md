# TypeScript Configuration (@repo/typescript-config)

[English] | [Español](./README.es.md)

Shared TypeScript configurations used across the NachUI monorepo to ensure strict type checking and consistent compiler behaviors.

## Usage

Each workspace can extend the base configuration in its `tsconfig.json`:

```json
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "dist"
  }
}
```

## Features

- **Extreme Strict Mode**: `strict: true` and additional flags are enabled by default for all workspaces.
- **NodeNext Native Engine**: Built for modern ESM modules and ECMAScript standards.
- **Next.js Optimized**: Specialized configurations for high-performance React applications and libraries.
- **Architectural Uniformity**: Consistent `alias` and `paths` resolution logic across the entire monorepo.
