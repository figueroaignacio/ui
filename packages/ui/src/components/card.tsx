'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, JSX, useState } from 'react';
import { cn } from '../lib/cn';

const cardVariants = cva('rounded-lg transition-all duration-200', {
  variants: {
    variant: {
      default: 'bg-card text-card-foreground border border-border shadow-sm',
      elevated: 'bg-card text-card-foreground border-0 shadow-lg',
      outline: 'bg-card text-card-foreground border-2 border-border shadow-none',
      ghost: 'bg-transparent text-card-foreground border-0 shadow-none',
    },
    hoverable: {
      true: 'cursor-pointer hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm',
    },
    clickable: {
      true: 'cursor-pointer hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm',
    },
    gradient: {
      true: 'bg-gradient-to-br from-card to-card/80',
    },
  },
  defaultVariants: {
    variant: 'default',
    hoverable: false,
    clickable: false,
    gradient: false,
  },
});

const cardHeaderVariants = cva('flex flex-col space-y-1.5', {
  variants: {
    compact: {
      true: 'p-4',
      false: 'p-6',
    },
  },
  defaultVariants: {
    compact: false,
  },
});

const cardTitleVariants = cva('text-lg font-semibold leading-none tracking-tight');

const cardDescriptionVariants = cva('text-sm text-muted-foreground leading-relaxed');

const cardContentVariants = cva('', {
  variants: {
    compact: {
      true: 'p-4 pt-0',
      false: 'p-6 pt-0',
    },
  },
  defaultVariants: {
    compact: false,
  },
});

const cardFooterVariants = cva('flex items-center', {
  variants: {
    align: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
    },
    compact: {
      true: 'p-4 pt-0',
      false: 'p-6 pt-0',
    },
  },
  defaultVariants: {
    align: 'start',
    compact: false,
  },
});

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  as?: React.ElementType;
}

interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardHeaderVariants> {}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardContentVariants> {}

interface CardFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardFooterVariants> {}

// ============================================================================
// CARD COMPONENT
// ============================================================================

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'default',
      hoverable = false,
      clickable = false,
      gradient = false,
      as: Component = 'div',
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(cardVariants({ variant, hoverable, clickable, gradient }), className)}
        {...(clickable && {
          role: 'button',
          tabIndex: 0,
          onKeyDown: (e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              (e.currentTarget as HTMLElement).click();
            }
          },
        })}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Card.displayName = 'Card';

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, compact, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(cardHeaderVariants({ compact }), className)} {...props}>
        {children}
      </div>
    );
  },
);

CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Component = 'h3', children, ...props }, ref) => {
    return (
      <Component ref={ref} className={cn(cardTitleVariants(), className)} {...props}>
        {children}
      </Component>
    );
  },
);

CardTitle.displayName = 'CardTitle';

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p ref={ref} className={cn(cardDescriptionVariants(), className)} {...props}>
        {children}
      </p>
    );
  },
);

CardDescription.displayName = 'CardDescription';

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, compact, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(cardContentVariants({ compact }), className)} {...props}>
        {children}
      </div>
    );
  },
);

CardContent.displayName = 'CardContent';

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, align, compact, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(cardFooterVariants({ align, compact }), className)} {...props}>
        {children}
      </div>
    );
  },
);

CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardContent,
  cardContentVariants,
  CardDescription,
  cardDescriptionVariants,
  CardFooter,
  cardFooterVariants,
  CardHeader,
  cardHeaderVariants,
  CardTitle,
  cardTitleVariants,
  cardVariants,
};

export type {
  CardContentProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
  CardTitleProps,
};

export default function CardDemo(): JSX.Element {
  const [clickedCard, setClickedCard] = useState<string | null>(null);

  return (
    <div className="bg-background min-h-screen p-8">
      <div className="mx-auto max-w-6xl space-y-12">
        {/* Variants */}
        <section>
          <h2 className="text-foreground mb-6 text-2xl font-bold">Variantes</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card variant="default">
              <CardHeader>
                <CardTitle>Default</CardTitle>
                <CardDescription>Con borde y sombra sutil</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Estilo por defecto con borde y shadow-sm.</p>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Elevated</CardTitle>
                <CardDescription>Sin borde, más sombra</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Estilo elevado sin bordes con shadow-lg.</p>
              </CardContent>
            </Card>

            <Card variant="outline">
              <CardHeader>
                <CardTitle>Outline</CardTitle>
                <CardDescription>Borde doble, sin sombra</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Estilo outline con borde grueso.</p>
              </CardContent>
            </Card>

            <Card variant="ghost">
              <CardHeader>
                <CardTitle>Ghost</CardTitle>
                <CardDescription>Sin borde ni sombra</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Estilo ghost completamente transparente.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Interactive Cards */}
        <section>
          <h2 className="text-foreground mb-6 text-2xl font-bold">Cards Interactivas</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card hoverable>
              <CardHeader>
                <CardTitle>Hoverable</CardTitle>
                <CardDescription>Pasa el mouse sobre mí</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Esta card tiene efectos hover con elevación y traducción.</p>
              </CardContent>
            </Card>

            <Card clickable onClick={() => setClickedCard('clickable')} variant="elevated">
              <CardHeader>
                <CardTitle>Clickable</CardTitle>
                <CardDescription>Haz clic en mí</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  {clickedCard === 'clickable'
                    ? '¡Me hiciste clic! 🎉'
                    : 'Esta card es clickeable y tiene accesibilidad de teclado.'}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* With Gradient */}
        <section>
          <h2 className="text-foreground mb-6 text-2xl font-bold">Con Gradiente</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card gradient variant="elevated">
              <CardHeader>
                <CardTitle>Card con Gradiente</CardTitle>
                <CardDescription>Fondo con gradiente sutil</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Esta card tiene un gradiente de fondo que le da más profundidad visual.
                </p>
              </CardContent>
            </Card>

            <Card gradient hoverable>
              <CardHeader>
                <CardTitle>Gradiente + Hover</CardTitle>
                <CardDescription>Combina gradiente con hover</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Gradiente con efectos hover para máximo impacto.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Complete Example */}
        <section>
          <h2 className="text-foreground mb-6 text-2xl font-bold">Ejemplo Completo</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card hoverable>
              <CardHeader>
                <CardTitle>Plan Básico</CardTitle>
                <CardDescription>Para individuos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-3xl font-bold">
                    $9<span className="text-muted-foreground text-sm font-normal">/mes</span>
                  </p>
                  <ul className="text-muted-foreground space-y-1 text-sm">
                    <li>✓ 10 proyectos</li>
                    <li>✓ 5GB almacenamiento</li>
                    <li>✓ Soporte por email</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-md px-4 py-2 text-sm font-medium">
                  Comenzar
                </button>
              </CardFooter>
            </Card>

            <Card hoverable variant="elevated" gradient>
              <CardHeader>
                <CardTitle>Plan Pro</CardTitle>
                <CardDescription>Para profesionales</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-3xl font-bold">
                    $29<span className="text-muted-foreground text-sm font-normal">/mes</span>
                  </p>
                  <ul className="text-muted-foreground space-y-1 text-sm">
                    <li>✓ Proyectos ilimitados</li>
                    <li>✓ 100GB almacenamiento</li>
                    <li>✓ Soporte prioritario</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-md px-4 py-2 text-sm font-medium">
                  Elegir Pro
                </button>
              </CardFooter>
            </Card>

            <Card hoverable>
              <CardHeader>
                <CardTitle>Plan Empresa</CardTitle>
                <CardDescription>Para equipos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-3xl font-bold">
                    $99<span className="text-muted-foreground text-sm font-normal">/mes</span>
                  </p>
                  <ul className="text-muted-foreground space-y-1 text-sm">
                    <li>✓ Todo ilimitado</li>
                    <li>✓ 1TB almacenamiento</li>
                    <li>✓ Soporte 24/7</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-md px-4 py-2 text-sm font-medium">
                  Contactar
                </button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Different Footers */}
        <section>
          <h2 className="text-foreground mb-6 text-2xl font-bold">Alineación de Footer</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader compact>
                <CardTitle as="h4">Start</CardTitle>
              </CardHeader>
              <CardContent compact>
                <p className="text-sm">Footer alineado a la izquierda</p>
              </CardContent>
              <CardFooter compact align="start">
                <button className="text-primary text-sm hover:underline">Ver más</button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader compact>
                <CardTitle as="h4">Center</CardTitle>
              </CardHeader>
              <CardContent compact>
                <p className="text-sm">Footer alineado al centro</p>
              </CardContent>
              <CardFooter compact align="center">
                <button className="text-primary text-sm hover:underline">Ver más</button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader compact>
                <CardTitle as="h4">End</CardTitle>
              </CardHeader>
              <CardContent compact>
                <p className="text-sm">Footer alineado a la derecha</p>
              </CardContent>
              <CardFooter compact align="end">
                <button className="text-primary text-sm hover:underline">Ver más</button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader compact>
                <CardTitle as="h4">Between</CardTitle>
              </CardHeader>
              <CardContent compact>
                <p className="text-sm">Footer con espacio entre elementos</p>
              </CardContent>
              <CardFooter compact align="between">
                <button className="text-muted-foreground hover:text-foreground text-sm">
                  Cancelar
                </button>
                <button className="text-primary text-sm hover:underline">Guardar</button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
