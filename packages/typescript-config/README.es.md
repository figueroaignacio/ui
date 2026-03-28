# Configuración de TypeScript (@repo/typescript-config)

[English](./README.md) | [Español]

Configuraciones compartidas de TypeScript utilizadas en todo el monorepo de NachUI para garantizar una comprobación de tipos estricta y comportamientos consistentes del compilador.

## Uso

Cada espacio de trabajo puede extender la configuración base en su `tsconfig.json`:

```json
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "dist"
  }
}
```

## Características

- **Modo Estricto Extremo**: `strict: true` y otras flags adicionales están habilitadas por defecto para todos los espacios de trabajo.
- **Motor Nativo NodeNext**: Construido para estándares de ECMAScript y módulos ESM modernos.
- **Optimizado para Next.js**: Configuraciones especializadas para librerías y aplicaciones React de alto rendimiento.
- **Uniformidad Arquitectónica**: Lógica de resolución de `alias` y `paths` consistente en todo el monorepo.
