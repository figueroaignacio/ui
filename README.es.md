# NachUI

[English](./README.md) | [Español]

### Ecosistema arquitectónico de alto rendimiento para desarrolladores modernos.

**NachUI** es una colección de componentes de UI **copy-paste y sin dependencias**, diseñada con **React**, **Next.js**, **Tailwind** y **Motion**. Representa una transición de librerías sobrecargadas hacia bases de código de alta propiedad y fácil mantenimiento.

## La Visión

El desarrollo estándar suele sacrificar la propiedad del código por la velocidad. **NachUI** ofrece lo mejor de ambos mundos:

- **Propiedad total del código**: Sin bloqueos por `node_modules`. Tú eres el dueño de las primitivas.
- **Excelencia arquitectónica**: Optimizado con **Framer Motion** y **Tailwind CSS v4** para un rendimiento de vanguardia.
- **Estrategia Zero-Bloat**: Cada componente es independiente, legible y preparado para personalización de nivel senior.

## Stack Tecnológico (Edición 2026)

Este monorepo utiliza herramientas estándares de la industria para garantizar la escalabilidad y la eficiencia del desarrollador.

| Tecnología             | Propósito                                                         | Razón                                                                         |
| :--------------------- | :---------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| **Espacio de Trabajo** | [Turbo](https://turbo.build/) + [pnpm](https://pnpm.io/)          | Ejecución hiperrápida y almacenamiento en caché compartido eficiente.         |
| **Motor Principal**    | [Next.js 16](https://nextjs.org/)                                 | Patrones avanzados de React 19 con soporte total para App Router y RSC.       |
| **Capa Visual**        | [Tailwind CSS v4](https://tailwindcss.com/)                       | Arquitectura de variables CSS puras sin sobrecarga en tiempo de ejecución.    |
| **Contenido**          | [Velite](https://velite.js.org/)                                  | Transformación de contenido con seguridad de tipos para un esquema unificado. |
| **Lógica Neural**      | [Google Gemini 2.5](https://deepmind.google/technologies/gemini/) | Razonamiento avanzado a través del [Vercel AI SDK](https://sdk.vercel.ai/).   |
| **Movimiento**         | [Framer Motion](https://www.framer.com/motion/)                   | Interacciones físicas de alta fidelidad.                                      |

## Estructura del Repositorio

El proyecto está estructurado como un **monorepo de Turborepo**, lo que garantiza la modularidad y límites arquitectónicos claros:

### Aplicaciones

- **[apps/docs](apps/docs)**: El Portal de Documentación Neural. Con simulaciones de componentes en tiempo real y asistencia técnica por IA.

### Lógica Central y Paquetes

- **[packages/ui](packages/ui)**: La Capa de Primitivas. Componentes React de alta fidelidad estilizados con los últimos estándares de Tailwind v4.
- **[packages/ai](packages/ai)**: El Núcleo Neural. Orquesta las interacciones con LLMs, comportamientos de agentes y respuestas contextuales.
- **[packages/typescript-config](packages/typescript-config)** y **[packages/eslint-config](packages/eslint-config)**: Ajustes predeterminados de modo estricto unificados y cumplimiento de estilo en todo el espacio de trabajo.

## Motor de Documentación Neural

NachUI incluye un **agente potenciado por Gemini**. Construido con el Vercel AI SDK, ofrece orientación contextual, proporcionando una experiencia de programación en pareja centrada en los principios arquitectónicos de NachUI y la personalización de componentes.

## Inicio Rápido

Asegúrate de tener [pnpm](https://pnpm.io/) instalado:

```bash
# Inicializar el espacio de trabajo
pnpm install

# Iniciar el entorno de desarrollo unificado
pnpm dev

# Generar los paquetes listos para producción
pnpm build
```

## Desarrollado por Ignacio Figueroa

Si NachUI acelera tu flujo de trabajo, considera apoyar el proyecto con una ⭐ en GitHub.
