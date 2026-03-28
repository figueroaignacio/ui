# Configuración de ESLint (@repo/eslint-config)

[English](./README.md) | [Español]

Reglas de linting unificadas y cumplimiento del estilo de código en todos los paquetes y aplicaciones de NachUI.

## Uso

Para usar en un espacio de trabajo, crea un archivo `eslint.config.mjs`:

```javascript
import { nextJsConfig } from '@repo/eslint-config/next-js';

export default nextJsConfig;
```

## Características

- **Formateo Arquitectónico**: Cumplimiento preciso de convenciones de espaciado, importaciones y nomenclatura consistentes.
- **Capa de Accesibilidad**: Incluye `eslint-plugin-jsx-a11y` para el desarrollo de una UI que cumpla con los estándares ARIA.
- **Integración con Tailwind v4**: Ordena automáticamente las clases con el plugin de Tailwind para Prettier.
- **Motor Listo para Next.js**: Preconfigurado para la optimización de App Router y React Server Components (RSC).
