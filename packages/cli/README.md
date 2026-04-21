# MateUI CLI

[English] | [Español](./README.es.md)

The official Command Line Interface for the MateUI ecosystem. Designed to help you seamlessly integrate, manage, and update high-fidelity React primitives directly into your codebase.

## Tech Stack

- **CLI Framework**: [Commander](https://github.com/tj/commander.js)
- **Interactive Prompts**: [@clack/prompts](https://github.com/natemoo-re/clack)
- **Console Styling**: [Kleur](https://github.com/lukeed/kleur)
- **Data Validation**: [Zod](https://zod.dev/)

## Key Features

### 1. Radically Simple Integration

Initialize MateUI in your workspace, configure your environment, and add beautifully crafted React components directly to your source files. You own the code.

### 2. Streamlined Workflow

Manage your complete component lifecycle from the terminal: list available primitives, add new ones, seamlessly update existing ones, or remove those you no longer need.

### 3. Developer Experience First

Built with gorgeous interactive prompts, helpful validation, and intuitive commands that respect your time.

## Usage

You can run the CLI directly via `npx` (or your package manager of choice) without installing it globally.

```bash
# Initialize MateUI in your project
npx mateui init

# Add a specific component
npx mateui add button

# List all available components
npx mateui list

# Update an installed component
npx mateui update button

# Remove an installed component
npx mateui remove button
```

## Architecture

- `src/commands`: Contains all CLI action logic (`init`, `add`, `list`, `update`, `remove`).
- `src/index.ts`: The main entry point parsing terminal instructions via `commander`.
