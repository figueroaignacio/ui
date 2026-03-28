# NachUI Neural Core (API)

[English] | [Español](./README.es.md)

The intelligence layer for the NachUI ecosystem. Designed to orchestrate AI-powered assistants and agentic workflows using the latest Large Language Models (LLMs).

## Tech Stack

- **Model Engine**: [Google Gemini](https://deepmind.google/technologies/gemini/) (via [Google Generative AI](https://github.com/google-gemini/generative-ai-js)).
- **SDK**: [Vercel AI SDK](https://sdk.vercel.ai/) for high-fidelity streaming and provider-agnostic logic.
- **Tools & Actions**: Leveraging the latest Function Calling capabilities for autonomous agent tasks.
- **Validation Engine**: [Zod](https://zod.dev/) for type-safe schema validation and structured outputs.

## Key Features

### 1. Neural Real-Time Streaming

Provides low-latency, real-time responses using Gemini, ensuring a smooth and responsive technical chat experience for developers.

### 2. Context-Aware Knowledge Layer

The AI is configured with a specialized system prompt that allows it to understand NachUI's "Copy-Paste" philosophy, the latest Tailwind CSS v4 features, and React 19 best practices.

### 3. Modular Provider Architecture

Designed for flexibility, the package supports multiple providers (Google, OpenAI, Anthropic, Groq), allowing for rapid model switching without changing the core business logic.

### 4. Structured Decision Making

All AI interactions are validated using Zod schemas, ensuring that the documentation platform always receives valid data for UI rendering and component simulations.

## Usage

As a workspace dependency:

```typescript
import { google } from '@repo/ai/providers';
import { generateText } from 'ai';

const result = await generateText({
  model: google('gemini-2.5-flash'),
  prompt: 'Analyze the architectural benefits of Tailwind CSS v4',
});
```

## Architecture

- `src/providers.ts`: Configuration for model providers and engine defaults.
- `src/prompts`: Specialized system prompts and neural templates.
- `src/agent.ts`: Orchestration logic for agentic behaviors and tool calling.
- `src/index.ts`: Unified entry point for the neural core.
