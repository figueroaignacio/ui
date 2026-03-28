# NachUI Primitive Layer (UI)

The core UI engine of the NachUI ecosystem. Built for **React 19**, **Tailwind CSS v4**, and is optimized for the highest performance standards.

## Tech Stack

- **Core Engine**: [React](https://react.dev/) (utilizing latest features like `useActionState` and modern Concurrent Rendering).
- **Styling**: [Tailwind](https://tailwindcss.com/) — Next-generation engine with zero-runtime overhead and 100% CSS variable-driven configuration.
- **Animations**: [Motion](https://motion.dev) (via the `motion` package).
- **Utility Layer**: [cva](https://cva.style/) (Class Variance Authority) for type-safe component variations.
- **Testing**: [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/react).

## Key Features

### 1. High-Ownership Philosophy

This package provides a reference for components designed to be copied directly into other projects. This approach ensures 100% ownership of the primitives and zero dependency bloat.

### 2. Radical Design Excellence

Every component is handcrafted with a focus on clean aesthetics, professional spacing, and accessible default behaviors.

### 3. Tailwind CSS v4 Performance

Built for the next generation of CSS, this library leverages the Direct-to-CSS architecture, offering significant performance gains and a 100% variable-driven configuration.

## Usage

As a developer, you don't install `@repo/ui`. You use this workspace as a reference, selecting the primitive you need (e.g., `button.tsx`), and pasting it into your own workspace.

```tsx
// Example of a NachUI Button primitive implementation
import { Button } from '@/components/button';

export const App = () => (
  <Button variant="primary" size="lg">
    Launch Platform
  </Button>
);
```

## Architecture

- `src/components`: The primary collection of high-fidelity UI primitives.
- `src/lib`: Shared utility functions like the `cn` class merger.
- `src/css`: The global styling entry point, utilizing Tailwind v4's CSS variable system.
- `src/hooks`: Specialized React hooks for modern component interactions.
