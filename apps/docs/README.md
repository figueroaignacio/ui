# NachUI Documentation (Web)

[English] | [Español](./README.es.md)

The primary interface and Neural Documentation Portal for the NachUI ecosystem. A high-performance **Next.js 16** application serving as an interactive component gallery and developer engine.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Server Components).
- **Styling**: [Tailwind](https://tailwindcss.com/) for lightning-fast, variable-driven UI.
- **Content Engine**: [Velite](https://velite.js.org/) — Type-safe MDX transformation layer.
- **Animations**: [Motion](https://motion.dev) (via the `motion` package).
- **AI Integration**: [@ai-sdk/react](https://sdk.vercel.ai/) for the interactive Gemini agent.
- **Localization**: [next-intl](https://next-intl-docs.vercel.app/) for multi-language architecture.

## Key Features

### 1. Neural Technical Support

An integrated AI assistant (connected to **Gemini**) providing real-time technical guidance on component usage, React architectural best practices, and deep customization.

### 2. High-Performance Simulation

Each component in NachUI is rendered within a simulated environment, allowing developers to interact, test, and extract source code in milliseconds.

### 3. Type-Safe MDX Integration

Powered by Velite, every documentation page is fully validated at build time, ensuring 100% type safety and zero-runtime overhead for content delivery.

### 4. Hyper-Fast Local Iteration

Built on **Turbo**, the development experience is optimized for instant Hot Module Replacement (HMR) and rapid build cycles.

## Getting Started

From the root of the monorepo, run:

```bash
# Start the docs platform
pnpm --filter docs dev
```

The documentation is served at `http://localhost:3000`.

## Architecture

The app follows a domain-driven Next.js structure:

- `src/app`: Unified routing and layout logic.
- `src/features`: Modular domain logic (Docs Engine, AI Chat, UI Gallery).
- `src/components`: UI primitives and documentation-specific components.
- `velite.config.ts`: Schema-first content definitions.
