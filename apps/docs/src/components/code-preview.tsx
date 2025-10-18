'use client';

// Hooks
import { useState } from 'react';

// Components
import { CheckIcon, CopyIcon } from '@radix-ui/react-icons';

export function CodePreview() {
  const [copied, setCopied] = useState(false);

  const codeExample = `import { Button } from "@/components/ui/button"

export function Example() {
  return (
    <Button variant="default">
      Click me
    </Button>
  )
}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl">
          Empezá en segundos
        </h2>
        <p className="text-muted-foreground text-lg text-pretty">
          Instalá y usá componentes con una sintaxis simple y clara
        </p>
      </div>

      <div className="border-border bg-card relative overflow-hidden rounded-lg border">
        {/* Header */}
        <div className="border-border bg-muted/50 flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>

          <button
            onClick={handleCopy}
            className="text-muted-foreground hover:bg-accent hover:text-foreground flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
          >
            {copied ? (
              <>
                <CheckIcon className="h-4 w-4" />
                Copiado
              </>
            ) : (
              <>
                <CopyIcon className="h-4 w-4" />
                Copiar
              </>
            )}
          </button>
        </div>

        {/* Code */}
        <div className="overflow-x-auto p-6">
          <pre className="text-sm">
            <code className="font-mono">
              <span className="text-purple-400">import</span>{' '}
              <span className="text-foreground">{'{ Button }'}</span>{' '}
              <span className="text-purple-400">from</span>{' '}
              <span className="text-green-400">"@/components/ui/button"</span>
              {'\n\n'}
              <span className="text-purple-400">export</span>{' '}
              <span className="text-purple-400">function</span>{' '}
              <span className="text-yellow-400">Example</span>
              <span className="text-foreground">{'() {'}</span>
              {'\n  '}
              <span className="text-purple-400">return</span>{' '}
              <span className="text-foreground">{'('}</span>
              {'\n    '}
              <span className="text-foreground">{'<'}</span>
              <span className="text-blue-400">Button</span>{' '}
              <span className="text-cyan-400">variant</span>
              <span className="text-foreground">=</span>
              <span className="text-green-400">"default"</span>
              <span className="text-foreground">{'>'}</span>
              {'\n      '}
              <span className="text-foreground">Click me</span>
              {'\n    '}
              <span className="text-foreground">{'</'}</span>
              <span className="text-blue-400">Button</span>
              <span className="text-foreground">{'>'}</span>
              {'\n  '}
              <span className="text-foreground">{')'}</span>
              {'\n'}
              <span className="text-foreground">{'}'}</span>
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
