# Núcleo Neural de NachUI (API)

[English](./README.md) | [Español]

La capa de inteligencia para el ecosistema NachUI. Diseñada para orquestar asistentes impulsados por IA y flujos de trabajo de agentes utilizando los últimos Modelos de Lenguaje de Gran Tamaño (LLMs).

## Stack Tecnológico

- **Motor del Modelo**: [Google Gemini](https://deepmind.google/technologies/gemini/) (a través de [Google Generative AI](https://github.com/google-gemini/generative-ai-js)).
- **SDK**: [Vercel AI SDK](https://sdk.vercel.ai/) para streaming de alta fidelidad y lógica independiente del proveedor.
- **Herramientas y Acciones**: Aprovechando las últimas capacidades de Function Calling para tareas de agentes autónomos.
- **Motor de Validación**: [Zod](https://zod.dev/) para validación de esquemas con seguridad de tipos y salidas estructuradas.

## Características Clave

### 1. Streaming Neural en Tiempo Real

Proporciona respuestas de baja latencia en tiempo real utilizando Gemini Flash, garantizando una experiencia de chat técnico fluida y receptiva para los desarrolladores.

### 2. Capa de Conocimiento Contextual

La IA está configurada con un prompt de sistema especializado que le permite comprender la filosofía "Copy-Paste" de NachUI, las últimas características de Tailwind y las mejores prácticas de React.

### 3. Arquitectura de Proveedores Modular

Diseñado para ser flexible, el paquete admite múltiples proveedores (Google, OpenAI, Anthropic, Groq), lo que permite un cambio rápido de modelo sin alterar la lógica de negocio central.

### 4. Toma de Decisiones Estructurada

Todas las interacciones de IA se validan mediante esquemas de Zod, lo que garantiza que la plataforma de documentación siempre reciba datos válidos para el renderizado de la UI y las simulaciones de componentes.

## Uso

Como dependencia del espacio de trabajo:

```typescript
import { google } from '@repo/ai/providers';
import { generateText } from 'ai';

const result = await generateText({
  model: google('gemini-2.5-flash'),
  prompt: 'Analiza los beneficios arquitectónicos de Tailwind CSS v4',
});
```

## Arquitectura

- `src/providers.ts`: Configuración para los proveedores de modelos y valores predeterminados del motor.
- `src/prompts`: Prompts de sistema especializados y plantillas neurales.
- `src/agent.ts`: Lógica de orquestación para comportamientos de agentes y llamadas a herramientas.
- `src/index.ts`: Punto de entrada unificado para el núcleo neural.
