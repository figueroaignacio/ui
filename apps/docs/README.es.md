# Documentación de NachUI (Web)

[English](./README.md) | [Español]

La interfaz principal y el Portal de Documentación Neural para el ecosistema NachUI. Una aplicación **Next.js** de alto rendimiento que sirve como galería interactiva de componentes y motor para desarrolladores.

## Stack Tecnológico

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Server Components).
- **Estilos**: [Tailwind](https://tailwindcss.com/) para una UI ultrarrápida basada en variables.
- **Motor de Contenido**: [Velite](https://velite.js.org/) — Capa de transformación MDX con seguridad de tipos.
- **Animaciones**: [Motion](https://motion.dev) (a través del paquete `motion`).
- **Integración de IA**: [@ai-sdk/react](https://sdk.vercel.ai/) para el agente interactivo de Gemini.
- **Localización**: [next-intl](https://next-intl-docs.vercel.app/) para una arquitectura multi-idioma.

## Características Clave

### 1. Soporte Técnico Neural

Un asistente de IA integrado (conectado a **Gemini**) que proporciona orientación técnica en tiempo real sobre el uso de componentes, mejores prácticas arquitectónicas de React y personalización profunda.

### 2. Simulación de Alto Rendimiento

Cada componente en NachUI se renderiza dentro de un entorno simulado, lo que permite a los desarrolladores interactuar, probar y extraer el código fuente en milisegundos.

### 3. Integración MDX con Seguridad de Tipos

Potenciado por Velite, cada página de documentación se valida completamente en tiempo de compilación, lo que garantiza una seguridad de tipos del 100% y cero sobrecarga en tiempo de ejecución para la entrega de contenido.

### 4. Iteración Local Hiperrápida

Construido sobre **Turbo**, la experiencia de desarrollo está optimizada para el Reemplazo de Módulos en Caliente (HMR) instantáneo y ciclos de compilación rápidos.

## Inicio Rápido

Desde la raíz del monorepo, ejecuta:

```bash
# Iniciar la plataforma de documentación
pnpm --filter docs dev
```

La documentación está disponible en `http://localhost:3000`.

## Arquitectura

La aplicación sigue una estructura de Next.js orientada a dominios:

- `src/app`: Lógica unificada de enrutamiento y diseño.
- `src/features`: Lógica modular por dominios (Motor de Docs, Chat de IA, Galería de UI).
- `src/components`: Primitivas de UI y componentes específicos de la documentación.
- `velite.config.ts`: Definiciones de contenido siguiendo un esquema predefinido.
