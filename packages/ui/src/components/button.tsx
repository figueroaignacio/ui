'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import React, { forwardRef, JSX, useCallback } from 'react';
import { cn } from '../lib/cn';

const buttonVariants = cva(
  [
    // Base styles
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium',
    'transition-all duration-200 ease-in-out',
    'outline-none select-none',
    // Focus styles
    'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    // Disabled styles
    'disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed',
    // SVG styles
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    '[&_svg:not([class*="size-"])]:size-4',
    // Invalid state
    'aria-invalid:ring-2 aria-invalid:ring-destructive/50 aria-invalid:border-destructive',
    // Active state
    'active:scale-[0.95]',
  ].join(' '),
  {
    variants: {
      variant: {
        default: [
          'bg-primary text-white shadow-sm',
          'hover:bg-primary/90 hover:shadow-md',
          'active:shadow-sm',
        ].join(' '),
        destructive: [
          'bg-destructive text-destructive-foreground shadow-sm',
          'hover:bg-destructive/90 hover:shadow-md',
          'active:shadow-sm',
          'focus-visible:ring-destructive/50',
        ].join(' '),
        outline: [
          'border border-input bg-background',
          'hover:bg-accent hover:text-accent-foreground hover:border-accent',
          'active:bg-accent/80',
        ].join(' '),
        secondary: [
          'bg-secondary text-secondary-foreground shadow-sm',
          'hover:bg-secondary/80 hover:shadow-md',
          'active:shadow-sm',
        ].join(' '),
        ghost: ['hover:bg-accent hover:text-accent-foreground', 'active:bg-accent/80'].join(' '),
        link: ['text-primary underline-offset-4', 'hover:underline', 'active:text-primary/80'].join(
          ' ',
        ),
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3 text-xs',
        lg: 'h-11 rounded-lg px-8 text-base',
        icon: 'size-10',
      },
      loading: {
        true: 'cursor-wait',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      loading: false,
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  loader?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  onClickAsync?: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}

interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  attached?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      loading = false,
      loader,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      onClick,
      onClickAsync,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    const [isAsyncLoading, setIsAsyncLoading] = React.useState(false);
    const isLoading = loading || isAsyncLoading;
    const isDisabled = disabled || isLoading;

    const handleClick = useCallback(
      async (event: React.MouseEvent<HTMLButtonElement>) => {
        if (onClickAsync) {
          setIsAsyncLoading(true);
          try {
            await onClickAsync(event);
          } catch (error) {
            console.error('Button async click error:', error);
          } finally {
            setIsAsyncLoading(false);
          }
        } else {
          onClick?.(event);
        }
      },
      [onClick, onClickAsync],
    );

    const LoaderComponent = loader ?? (
      <Loader2 className="size-4 animate-spin" aria-hidden="true" />
    );

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        onClick={handleClick}
        className={cn(
          buttonVariants({ variant, size, loading: isLoading }),
          fullWidth && 'w-full',
          className,
        )}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading && LoaderComponent}
        {!isLoading && leftIcon && <span aria-hidden="true">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span aria-hidden="true">{rightIcon}</span>}
      </button>
    );
  },
);

Button.displayName = 'Button';

const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, children, orientation = 'horizontal', attached = false, ...props }, ref) => {
    const groupClassName = cn(
      'inline-flex',
      orientation === 'horizontal' ? 'flex-row' : 'flex-col',
      attached
        ? orientation === 'horizontal'
          ? '[&>button:not(:first-child)]:rounded-l-none [&>button:not(:last-child)]:rounded-r-none [&>button:not(:first-child)]:-ml-px'
          : '[&>button:not(:first-child)]:rounded-t-none [&>button:not(:last-child)]:rounded-b-none [&>button:not(:first-child)]:-mt-px'
        : orientation === 'horizontal'
          ? 'gap-2'
          : 'gap-2',
      className,
    );

    return (
      <div ref={ref} role="group" className={groupClassName} {...props}>
        {children}
      </div>
    );
  },
);

ButtonGroup.displayName = 'ButtonGroup';

export { Button, ButtonGroup, buttonVariants };

export type { ButtonGroupProps, ButtonProps };

export default function ButtonDemo(): JSX.Element {
  const [loadingStates, setLoadingStates] = React.useState<Record<string, boolean>>({});

  const handleAsyncClick = React.useCallback(async (id: string) => {
    setLoadingStates((prev) => ({ ...prev, [id]: true }));
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoadingStates((prev) => ({ ...prev, [id]: false }));
  }, []);

  const handleAsyncAction = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log('Acción completada');
  };

  return (
    <div className="bg-background min-h-screen p-8">
      <div className="mx-auto max-w-4xl space-y-12">
        {/* Variants */}
        <section>
          <h2 className="text-foreground mb-4 text-2xl font-bold">Variantes</h2>
          <div className="flex flex-wrap gap-3">
            <Button>Default</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </section>

        {/* Sizes */}
        <section>
          <h2 className="text-foreground mb-4 text-2xl font-bold">Tamaños</h2>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
            </Button>
          </div>
        </section>

        {/* With Icons */}
        <section>
          <h2 className="text-foreground mb-4 text-2xl font-bold">Con Iconos</h2>
          <div className="flex flex-wrap gap-3">
            <Button
              leftIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              }
            >
              Con icono izquierdo
            </Button>
            <Button
              variant="outline"
              rightIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              }
            >
              Con icono derecho
            </Button>
          </div>
        </section>

        {/* Loading States */}
        <section>
          <h2 className="text-foreground mb-4 text-2xl font-bold">Estados de Carga</h2>
          <div className="flex flex-wrap gap-3">
            <Button loading={loadingStates['manual']} onClick={() => handleAsyncClick('manual')}>
              Loading Manual
            </Button>
            <Button variant="destructive" onClickAsync={handleAsyncAction}>
              Loading Automático
            </Button>
            <Button variant="outline" loading>
              Siempre cargando
            </Button>
          </div>
        </section>

        {/* States */}
        <section>
          <h2 className="text-foreground mb-4 text-2xl font-bold">Estados</h2>
          <div className="flex flex-wrap gap-3">
            <Button disabled>Deshabilitado</Button>
            <Button aria-invalid>Inválido</Button>
          </div>
        </section>

        {/* Full Width */}
        <section>
          <h2 className="text-foreground mb-4 text-2xl font-bold">Ancho Completo</h2>
          <Button fullWidth>Botón de ancho completo</Button>
        </section>

        {/* Button Groups */}
        <section>
          <h2 className="text-foreground mb-4 text-2xl font-bold">Grupos de Botones</h2>

          <div className="space-y-4">
            <div>
              <p className="text-muted-foreground mb-2 text-sm">Horizontal normal</p>
              <ButtonGroup>
                <Button variant="outline">Izquierda</Button>
                <Button variant="outline">Centro</Button>
                <Button variant="outline">Derecha</Button>
              </ButtonGroup>
            </div>

            <div>
              <p className="text-muted-foreground mb-2 text-sm">Horizontal attached</p>
              <ButtonGroup attached>
                <Button variant="outline">Izquierda</Button>
                <Button variant="outline">Centro</Button>
                <Button variant="outline">Derecha</Button>
              </ButtonGroup>
            </div>

            <div>
              <p className="text-muted-foreground mb-2 text-sm">Vertical normal</p>
              <ButtonGroup orientation="vertical">
                <Button variant="outline">Arriba</Button>
                <Button variant="outline">Centro</Button>
                <Button variant="outline">Abajo</Button>
              </ButtonGroup>
            </div>

            <div>
              <p className="text-muted-foreground mb-2 text-sm">Vertical attached</p>
              <ButtonGroup orientation="vertical" attached>
                <Button variant="outline">Arriba</Button>
                <Button variant="outline">Centro</Button>
                <Button variant="outline">Abajo</Button>
              </ButtonGroup>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
