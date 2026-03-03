# AGENTS.md - Developer Guide for NachUI

This file contains guidelines and commands for agents working on the NachUI codebase.

## Project Overview

NachUI is a monorepo containing:

- `packages/ui` - React UI component library
- `apps/docs` - Documentation site (Next.js)
- `packages/typescript-config` - Shared TypeScript configs

## Build & Development Commands

### Root Commands (via Turbo)

```bash
pnpm build           # Build all packages
pnpm dev             # Start dev servers for all apps
pnpm lint            # Lint all packages
pnpm start           # Start production servers
pnpm format          # Format code with Prettier
```

### UI Package Commands (`packages/ui/`)

```bash
# Run all tests
pnpm test            # Run tests in watch mode
pnpm test:run        # Run tests once

# Run a single test file
pnpm vitest run src/lib/cn.test.ts
pnpm vitest run src/components/button.test.tsx

# Other test options
pnpm test:ui         # Run tests with UI
pnpm test:coverage   # Run tests with coverage

# Linting & Type Checking
pnpm lint            # ESLint with max-warnings 0
pnpm type-check      # TypeScript type checking
```

### Docs App Commands (`apps/docs/`)

```bash
pnpm dev             # Start dev server (runs Velite + Next.js)
pnpm build           # Build for production
pnpm start           # Start production server
```

## Code Style Guidelines

### General Principles

- Write clean, minimal, professional code
- Prioritize readability and maintainability
- Components should be copy-paste ready (dependency-free where possible)
- Accessibility is a first-class concern

### Formatting (Prettier)

```json
{
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "arrowParens": "always",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

Run `pnpm format` to format all files.

### TypeScript Rules

- **Strict mode enabled** - All strict checks are on
- **Use explicit types** for component props and function returns
- **Use `noUncheckedIndexedAccess`** - Array access returns `T | undefined`
- **Always use `type`** for type-only imports
- **Use interfaces** for object shapes that may be extended
- **Use type aliases** for unions, intersections, and primitives

```typescript
// Good
import { cn, type ClassValue } from '../lib/cn';
interface ButtonProps extends HTMLMotionProps<'button'> {
  loading?: boolean;
}

// Avoid
import { cn, ClassValue } from '../lib/cn';
```

### Imports Organization

Order imports as follows:

1. React / Next.js imports (`react`, `next/*`)
2. Third-party libraries (grouped by package)
3. Internal imports (`@repo/ui`, `@/lib`)
4. Relative imports (`../lib/cn`)

```typescript
import React, { forwardRef } from 'react';
import { motion } from 'motion/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { cn } from '../lib/cn';
import { buttonVariants } from './button';
```

### Component Patterns

#### File Structure

- One component per file (or closely related components)
- Export component as named export
- Export types separately
- Use CVA (class-variance-authority) for variants

```typescript
// button.tsx
'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '../lib/cn';

const buttonVariants = cva('...', { variants: { ... } });

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return <button ref={ref} className={cn(buttonVariants(...), className)} {...props} />;
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
export type { ButtonProps };
```

#### Animation Constants

Define animation variants and transitions at module level (outside component):

```typescript
const VARIANTS = { initial: {...}, animate: {...}, exit: {...} } as const;
const TRANSITION = { duration: 0.3 } as const;
const STYLE = { willChange: 'opacity' } as const;
```

#### Context Patterns

When using React Context:

```typescript
const DialogContext = React.createContext<DialogContextType | undefined>(undefined);

const useDialogContext = () => {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error('useXxxContext must be used within a Xxx provider');
  }
  return context;
};
```

### Tailwind CSS Conventions

- Use `cn()` utility for conditional classes
- Group related classes logically
- Use Tailwind CSS v4 features (no custom `tailwind.config.js`)
- Prefer Tailwind's built-in utilities over custom CSS

### Naming Conventions

- **Components**: PascalCase (`Button`, `DialogContent`)
- **Hooks**: camelCase with `use` prefix (`useDialogContext`)
- **Utils**: camelCase (`cn`, `formatDate`)
- **Types/Interfaces**: PascalCase (`ButtonProps`, `DialogContextType`)
- **Constants**: SCREAMING_SNAKE_CASE for config objects, camelCase for small objects
- **Files**: kebab-case (`button.tsx`, `dialog-content.tsx`)

### Error Handling

- Throw descriptive errors in context hooks
- Use Zod for runtime validation when needed
- Provide meaningful error messages

### Testing

- Place tests next to source files: `button.test.tsx`
- Use Vitest with React Testing Library
- Include `@testing-library/jest-dom` matchers

### Git Commit Messages

Follow Conventional Commits (validated by commitlint):

```
feat: add new button variant
fix: resolve dialog close behavior
docs: update button documentation
refactor: simplify animation logic
test: add tests for input component
```
