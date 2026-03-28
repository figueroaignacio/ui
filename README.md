# NachUI

### High-Performance, Architectural Ecosystem for Modern Developers.

**NachUI** is a elite collection of **copy-paste, dependency-free** UI components engineered with **React 19**, **Next.js 16**, and **Tailwind CSS v4**. It represents a shift from bloated libraries to high-ownership, maintainable codebases.

---

## The Vision

Standard development often sacrifices ownership for speed. **NachUI** provides the best of both worlds:

- **Full Code Ownership**: No `node_modules` lock-in. You own the primitives.
- **Architectural Excellence**: Optimized with **Framer Motion** and **Tailwind CSS v4** for cutting-edge performance.
- **Zero-Bloat Strategy**: Each component is independent, readable, and ready for senior-level customization.

---

## The Tech Stack (2026 Edition)

This monorepo leverages industry-standard tooling to ensure scalability and developer efficiency.

| Technology       | Purpose                                                           | Rationale                                                            |
| :--------------- | :---------------------------------------------------------------- | :------------------------------------------------------------------- |
| **Workspace**    | [Turbo](https://turbo.build/) + [pnpm](https://pnpm.io/)          | Hyper-fast execution and efficient shared caching.                   |
| **Core Engine**  | [Next.js 16](https://nextjs.org/)                                 | Advanced React 19 patterns with full App Router and RSC support.     |
| **Visual Layer** | [Tailwind CSS v4](https://tailwindcss.com/)                       | Pure CSS variables architecture with zero runtime overhead.          |
| **Content Rail** | [Velite](https://velite.js.org/)                                  | Type-safe content transformation for a unified documentation schema. |
| **Neural Logic** | [Google Gemini 2.5](https://deepmind.google/technologies/gemini/) | Advanced reasoning via the [Vercel AI SDK](https://sdk.vercel.ai/).  |
| **Motion**       | [Motion](https://motion.dev/)                                     | High-fidelity, physics-based interactions.                           |

---

## Repository Structure

The project is structured as a **Turborepo monorepo**, ensuring modularity and clean architectural boundaries:

### Applications

- **[apps/docs](apps/docs)**: The Neural Documentation Portal. Featuring real-time component simulations and AI technical assistance.

### Core Logic & Packages

- **[packages/ui](packages/ui)**: The Primitive Layer. High-fidelity React components styled with the latest Tailwind v4 standards.
- **[packages/ai](packages/ai)**: The Neural Core. Orchestrates LLM interactions, agentic behaviors, and context-aware responses.
- **[packages/typescript-config](packages/typescript-config)** & **[packages/eslint-config](packages/eslint-config)**: Unified strict-mode defaults and styling enforcement across the entire workspace.

---

## Neural Documentation Engine

NachUI features an integrated **Gemini-powered agent**. Built with the Vercel AI SDK, it offers context-aware guidance, providing a technical pair-programming experience focused on NachUI's architectural principles and component customization.

---

## Quick Start

Ensure you have [pnpm](https://pnpm.io/) installed, then:

```bash
# Initialize the workspace
pnpm install

# Launch the unified development environment
pnpm dev

# Generate production-ready bundles
pnpm build
```

---

## Developed by Ignacio Figueroa

If NachUI accelerates your workflow, consider supporting the project with a ⭐ on GitHub.
