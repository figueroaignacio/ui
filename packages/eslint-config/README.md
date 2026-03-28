# ESLint Configuration (@repo/eslint-config)

[English] | [Español](./README.es.md)

Unified linting rules and code style enforcement across all NachUI packages and applications.

## Usage

To use in a workspace, create an `eslint.config.mjs` file:

```javascript
import { nextJsConfig } from '@repo/eslint-config/next-js';

export default nextJsConfig;
```

## Features

- **Architectural Formatting**: Precise enforcement of consistent whitespace, imports, and naming conventions.
- **Accessibility Layer**: Includes `eslint-plugin-jsx-a11y` for ARIA-compliant UI development.
- **Tailwind v4 Integration**: Automatically sorts class names with the Prettier Tailwind plugin.
- **Next.js Engine Ready**: Pre-configured for App Router and React Server Components (RSC) optimization.
