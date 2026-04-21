# Capa de Primitivas de NachUI (UI)

[English](./README.md) | [Español]

El motor de UI central del ecosistema NachUI. Construido para **React**, **Tailwind**, y optimizado para los más altos estándares de rendimiento.

## Stack Tecnológico

- **Motor Principal**: [React](https://react.dev/) (utilizando las últimas características como `useActionState` y Renderizado Concurrente moderno).
- **Estilos**: [Tailwind](https://tailwindcss.com/) — Motor de próxima generación con cero sobrecarga en tiempo de ejecución y configuración 100% basada en variables CSS.
- **Animaciones**: [Motion](https://motion.dev) (a través del paquete `motion/react`).
- **Capa de Utilidad**: [cva](https://cva.style/) (Class Variance Authority) para variaciones de componentes con seguridad de tipos.
- **Pruebas**: [Vitest](https://vitest.dev/) y [React Testing Library](https://testing-library.com/react).

## Características Clave

### 1. Filosofía de Alta Propiedad

Este paquete proporciona una referencia para componentes diseñados para ser copiados directamente a otros proyectos. Este enfoque garantiza la propiedad total de las primitivas y elimina la sobrecarga de dependencias.

### 2. Excelencia en Diseño Radical

Cada componente está hecho a mano con un enfoque en estética limpia, espaciado profesional y comportamientos predeterminados accesibles.

### 3. Rendimiento de Tailwind

Construida para la próxima generación de CSS, esta librería aprovecha la arquitectura Direct-to-CSS, ofreciendo mejoras significativas de rendimiento y una configuración 100% basada en variables.

## Uso

Como desarrollador, no instalas `@repo/ui`. Utilizas este espacio de trabajo como referencia, seleccionando la primitiva que necesitas (por ejemplo, `button.tsx`), y pegándola en tu propio espacio de trabajo.

```tsx
// Ejemplo de implementación de una primitiva de Botón de NachUI
import { Button } from '@/components/button';

export const App = () => (
  <Button variant="primary" size="lg">
    Lanzar Plataforma
  </Button>
);
```

## Arquitectura

- `src/components`: La colección principal de primitivas de UI de alta fidelidad.
- `src/lib`: Funciones de utilidad compartidas como el fusionador de clases `cn`.
- `src/css`: El punto de entrada de estilos globales, utilizando el sistema de variables CSS de Tailwind v4.
- `src/hooks`: Hooks de React especializados para interacciones de componentes modernos.
