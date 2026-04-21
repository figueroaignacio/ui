# MateUI CLI

[English](./README.md) | [Español]

La Interfaz de Línea de Comandos oficial para el ecosistema MateUI. Diseñada para ayudarte a integrar, administrar y actualizar primitivas de React de alta fidelidad directamente en el código de tu proyecto sin complicaciones.

## Stack Tecnológico

- **Framework de CLI**: [Commander](https://github.com/tj/commander.js)
- **Prompts Interactivos**: [@clack/prompts](https://github.com/natemoo-re/clack)
- **Estilos de Consola**: [Kleur](https://github.com/lukeed/kleur)
- **Validación de Datos**: [Zod](https://zod.dev/)

## Características Clave

### 1. Integración Radicalmente Simple

Inicializa MateUI en tu entorno de trabajo, configura tu proyecto y agrega componentes de React diseñados a la perfección directamente en tu código fuente. Tú eres el dueño del código.

### 2. Flujo de Trabajo Optimizado

Administra el ciclo de vida completo de tus componentes desde la terminal: lista las primitivas disponibles, agrega nuevas, actualiza las existentes de manera sencilla, o elimina las que ya no necesitas.

### 3. Prioridad a la Experiencia del Desarrollador

Construido con prompts interactivos elegantes, validación de errores útil y comandos intuitivos que respetan tu tiempo.

## Uso

Puedes ejecutar el CLI directamente a través de `npx` (o tu gestor de paquetes preferido) sin necesidad de instalarlo globalmente.

```bash
# Inicializar MateUI en tu proyecto
npx mateui init

# Agregar un componente específico
npx mateui add button

# Listar todos los componentes disponibles
npx mateui list

# Actualizar un componente instalado
npx mateui update button

# Eliminar un componente instalado
npx mateui remove button
```

## Arquitectura

- `src/commands`: Contiene todas las acciones del CLI (`init`, `add`, `list`, `update`, `remove`).
- `src/index.ts`: El punto de entrada principal que procesa y ejecuta los comandos mediante `commander`.
