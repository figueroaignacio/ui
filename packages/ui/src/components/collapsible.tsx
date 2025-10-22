'use client';

import { cva } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';
import * as React from 'react';
import { JSX } from 'react';
import { cn } from '../lib/cn';

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

// ============================================================================
// CVA VARIANTS
// ============================================================================

const collapsibleVariants = cva('', {
  variants: {
    variant: {
      default: '',
      bordered: 'rounded-lg border border-border',
      card: 'rounded-lg border border-border bg-card shadow-sm',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const collapsibleTriggerVariants = cva(
  [
    'flex w-full items-center justify-between',
    'transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&[data-state=open]>svg]:rotate-180',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'hover:opacity-80',
        bordered: 'p-4 hover:bg-accent/50',
        card: 'p-4 hover:bg-accent/50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const collapsibleContentVariants = cva('overflow-hidden transition-all duration-300', {
  variants: {
    variant: {
      default: '',
      bordered: 'px-4 pb-4',
      card: 'px-4 pb-4',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// ============================================================================
// TYPES
// ============================================================================

interface CollapsibleContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  disabled?: boolean;
  variant?: 'default' | 'bordered' | 'card';
}

interface CollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The default open state (uncontrolled)
   */
  defaultOpen?: boolean;
  /**
   * The controlled open state
   */
  open?: boolean;
  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * If true, the collapsible cannot be toggled
   */
  disabled?: boolean;
  /**
   * Visual variant
   */
  variant?: 'default' | 'bordered' | 'card';
}

interface CollapsibleTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * If true, shows a chevron icon
   */
  showChevron?: boolean;
  /**
   * Custom chevron icon
   */
  chevronIcon?: React.ReactNode;
  /**
   * Position of the chevron
   */
  chevronPosition?: 'left' | 'right';
  /**
   * Use as child to compose with custom trigger
   */
  asChild?: boolean;
}

interface CollapsibleContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * If true, content will be force mounted even when closed
   */
  forceMount?: boolean;
}

// ============================================================================
// CONTEXT
// ============================================================================

const CollapsibleContext = React.createContext<CollapsibleContextValue | null>(null);

const useCollapsibleContext = (): CollapsibleContextValue => {
  const context = React.useContext(CollapsibleContext);
  if (!context) {
    throw new Error('Collapsible components must be used within Collapsible');
  }
  return context;
};

// ============================================================================
// COLLAPSIBLE COMPONENT
// ============================================================================

const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  (
    {
      className,
      defaultOpen = false,
      open: controlledOpen,
      onOpenChange,
      disabled = false,
      variant = 'default',
      children,
      ...props
    },
    ref,
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;

    const setIsOpen = React.useCallback(
      (open: boolean) => {
        if (disabled) return;

        if (!isControlled) {
          setInternalOpen(open);
        }
        onOpenChange?.(open);
      },
      [disabled, isControlled, onOpenChange],
    );

    const contextValue = React.useMemo<CollapsibleContextValue>(
      () => ({
        isOpen,
        setIsOpen,
        disabled,
        variant,
      }),
      [isOpen, setIsOpen, disabled, variant],
    );

    return (
      <CollapsibleContext.Provider value={contextValue}>
        <div
          ref={ref}
          data-state={isOpen ? 'open' : 'closed'}
          data-disabled={disabled ? '' : undefined}
          className={cn(collapsibleVariants({ variant }), className)}
          {...props}
        >
          {children}
        </div>
      </CollapsibleContext.Provider>
    );
  },
);

Collapsible.displayName = 'Collapsible';

// ============================================================================
// COLLAPSIBLE TRIGGER COMPONENT
// ============================================================================

const CollapsibleTrigger = React.forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  (
    {
      className,
      showChevron = true,
      chevronIcon,
      chevronPosition = 'right',
      asChild = false,
      children,
      onClick,
      ...props
    },
    ref,
  ) => {
    const { isOpen, setIsOpen, disabled, variant } = useCollapsibleContext();

    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disabled) {
          setIsOpen(!isOpen);
          onClick?.(e);
        }
      },
      [disabled, isOpen, setIsOpen, onClick],
    );

    const chevron = chevronIcon ?? (
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    );

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        onClick: handleClick,
        'data-state': isOpen ? 'open' : 'closed',
        'aria-expanded': isOpen,
        disabled,
      } as React.HTMLAttributes<HTMLElement>);
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        disabled={disabled}
        data-state={isOpen ? 'open' : 'closed'}
        aria-expanded={isOpen}
        className={cn(collapsibleTriggerVariants({ variant }), className)}
        {...props}
      >
        {showChevron && chevronPosition === 'left' && <span aria-hidden="true">{chevron}</span>}
        <span className="flex-1 text-left">{children}</span>
        {showChevron && chevronPosition === 'right' && <span aria-hidden="true">{chevron}</span>}
      </button>
    );
  },
);

CollapsibleTrigger.displayName = 'CollapsibleTrigger';

// ============================================================================
// COLLAPSIBLE CONTENT COMPONENT
// ============================================================================

const CollapsibleContent = React.forwardRef<HTMLDivElement, CollapsibleContentProps>(
  ({ className, forceMount = false, children, style, ...props }, ref) => {
    const { isOpen, variant } = useCollapsibleContext();
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [height, setHeight] = React.useState<number | undefined>(isOpen ? undefined : 0);

    React.useImperativeHandle(ref, () => contentRef.current as HTMLDivElement);

    React.useEffect(() => {
      const element = contentRef.current;
      if (!element) return;

      const resizeObserver = new ResizeObserver(() => {
        if (isOpen) {
          setHeight(element.scrollHeight);
        }
      });

      resizeObserver.observe(element);

      return () => resizeObserver.disconnect();
    }, [isOpen]);

    React.useEffect(() => {
      const element = contentRef.current;
      if (!element) return;

      if (isOpen) {
        setHeight(element.scrollHeight);
      } else {
        // Force reflow
        element.scrollHeight;
        setHeight(0);
      }
    }, [isOpen]);

    if (!isOpen && !forceMount) {
      return null;
    }

    return (
      <div
        ref={contentRef}
        data-state={isOpen ? 'open' : 'closed'}
        className={cn(collapsibleContentVariants({ variant }), className)}
        style={{
          height: height === undefined ? 'auto' : `${height}px`,
          ...style,
        }}
        {...props}
      >
        <div>{children}</div>
      </div>
    );
  },
);

CollapsibleContent.displayName = 'CollapsibleContent';

// ============================================================================
// EXPORTS
// ============================================================================

export {
  Collapsible,
  CollapsibleContent,
  collapsibleContentVariants,
  CollapsibleTrigger,
  collapsibleTriggerVariants,
  collapsibleVariants,
};

export type { CollapsibleContentProps, CollapsibleProps, CollapsibleTriggerProps };

// ============================================================================
// DEMO
// ============================================================================

export default function CollapsibleDemo(): JSX.Element {
  const [isOpen1, setIsOpen1] = React.useState(false);

  return (
    <div className="bg-background min-h-screen p-8">
      <div className="mx-auto max-w-3xl space-y-12">
        {/* Default */}
        <section>
          <h2 className="text-foreground mb-6 text-2xl font-bold">Default Collapsible</h2>
          <Collapsible>
            <CollapsibleTrigger className="text-sm font-semibold">
              ¿Qué es React?
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <p className="text-muted-foreground text-sm">
                React es una biblioteca de JavaScript para construir interfaces de usuario. Permite
                crear componentes reutilizables y manejar el estado de forma eficiente.
              </p>
            </CollapsibleContent>
          </Collapsible>
        </section>

        {/* Bordered */}
        <section>
          <h2 className="text-foreground mb-6 text-2xl font-bold">Bordered Variant</h2>
          <div className="space-y-2">
            <Collapsible variant="bordered">
              <CollapsibleTrigger>
                <span className="font-semibold">¿Cómo funciona el useState?</span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <p className="text-muted-foreground text-sm">
                  useState es un Hook que te permite añadir estado a componentes funcionales.
                  Retorna un par: el valor actual del estado y una función para actualizarlo.
                </p>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible variant="bordered" defaultOpen>
              <CollapsibleTrigger>
                <span className="font-semibold">¿Qué son los Hooks?</span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <p className="text-muted-foreground text-sm">
                  Los Hooks son funciones que permiten "enganchar" el estado y el ciclo de vida de
                  React desde componentes funcionales. Los más comunes son useState y useEffect.
                </p>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible variant="bordered">
              <CollapsibleTrigger>
                <span className="font-semibold">¿Cuándo usar useEffect?</span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <p className="text-muted-foreground text-sm">
                  useEffect se usa para efectos secundarios como fetching de datos, suscripciones, o
                  modificar el DOM manualmente. Se ejecuta después de cada renderizado.
                </p>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </section>

        {/* Card Variant */}
        <section>
          <h2 className="text-foreground mb-6 text-2xl font-bold">Card Variant</h2>
          <div className="space-y-4">
            <Collapsible variant="card">
              <CollapsibleTrigger>
                <span className="font-semibold">Especificaciones Técnicas</span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Procesador:</span>
                    <span className="font-medium">Intel Core i7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Memoria RAM:</span>
                    <span className="font-medium">16 GB DDR4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Almacenamiento:</span>
                    <span className="font-medium">512 GB SSD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gráficos:</span>
                    <span className="font-medium">NVIDIA RTX 3060</span>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible variant="card" defaultOpen>
              <CollapsibleTrigger>
                <span className="font-semibold">Información de Envío</span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="text-muted-foreground space-y-2 text-sm">
                  <p>Envío gratuito en pedidos superiores a $50</p>
                  <p>Tiempo de entrega estimado: 3-5 días hábiles</p>
                  <p>Seguimiento disponible una vez enviado</p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </section>

        {/* Controlled */}
        <section>
          <h2 className="text-foreground mb-6 text-2xl font-bold">Controlled Collapsible</h2>
          <div className="mb-4 flex gap-2">
            <button
              onClick={() => setIsOpen1(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-3 py-1.5 text-sm"
            >
              Abrir
            </button>
            <button
              onClick={() => setIsOpen1(false)}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md px-3 py-1.5 text-sm"
            >
              Cerrar
            </button>
          </div>
          <Collapsible variant="bordered" open={isOpen1} onOpenChange={setIsOpen1}>
            <CollapsibleTrigger>
              <span className="font-semibold">Estado controlado externamente</span>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <p className="text-muted-foreground text-sm">
                Este collapsible está controlado por los botones de arriba. Estado actual:{' '}
                {isOpen1 ? 'Abierto' : 'Cerrado'}
              </p>
            </CollapsibleContent>
          </Collapsible>
        </section>

        {/* Chevron Position */}
        <section>
          <h2 className="text-foreground mb-6 text-2xl font-bold">Chevron Position</h2>
          <div className="space-y-2">
            <Collapsible variant="bordered">
              <CollapsibleTrigger chevronPosition="left">
                <span className="font-semibold">Chevron a la izquierda</span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <p className="text-muted-foreground text-sm">
                  El ícono de chevron está posicionado a la izquierda del texto.
                </p>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible variant="bordered">
              <CollapsibleTrigger showChevron={false}>
                <span className="font-semibold">Sin chevron</span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <p className="text-muted-foreground text-sm">
                  Este collapsible no muestra el ícono de chevron.
                </p>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </section>

        {/* Disabled */}
        <section>
          <h2 className="text-foreground mb-6 text-2xl font-bold">Disabled State</h2>
          <Collapsible variant="bordered" disabled>
            <CollapsibleTrigger>
              <span className="font-semibold">Collapsible deshabilitado</span>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <p className="text-muted-foreground text-sm">
                Este contenido no se puede expandir porque el collapsible está deshabilitado.
              </p>
            </CollapsibleContent>
          </Collapsible>
        </section>

        {/* Nested */}
        <section>
          <h2 className="text-foreground mb-6 text-2xl font-bold">Nested Collapsibles</h2>
          <Collapsible variant="card">
            <CollapsibleTrigger>
              <span className="font-semibold">Categoría Principal</span>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="space-y-2">
                <p className="text-muted-foreground text-sm">
                  Este es el contenido de la categoría principal.
                </p>
                <Collapsible variant="bordered">
                  <CollapsibleTrigger>
                    <span className="text-sm font-semibold">Subcategoría 1</span>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <p className="text-muted-foreground text-sm">Contenido de la subcategoría 1.</p>
                  </CollapsibleContent>
                </Collapsible>
                <Collapsible variant="bordered">
                  <CollapsibleTrigger>
                    <span className="text-sm font-semibold">Subcategoría 2</span>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <p className="text-muted-foreground text-sm">Contenido de la subcategoría 2.</p>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </section>
      </div>
    </div>
  );
}
