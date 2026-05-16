'use client';

import type { BrickSourceFile } from '@/features/bricks/lib/get-brick-source';
import { useCopyToClipboard } from '@/features/docs/hooks/use-copy-to-clipboard';
import { Copy01Icon, LaptopIcon, Tick02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Tabs } from '@repo/ui/components/tabs';
import { cn } from '@repo/ui/lib/cn';
import { useState } from 'react';
import { BrickCodeViewer } from './brick-code-viewer';
interface BrickPreviewProps {
  id: string;
  name: string;
  description: string;
  children: React.ReactNode;
  files: BrickSourceFile[] | null;
  installCommand?: string;
}

type ViewportSize = 'desktop' | 'tablet' | 'mobile';

const VIEWPORT_WIDTHS: Record<ViewportSize, string> = {
  desktop: 'w-full',
  tablet: 'max-w-[768px]',
  mobile: 'max-w-[375px]',
};

export function BrickPreview({
  id,
  name,
  description,
  children,
  files,
  installCommand,
}: BrickPreviewProps) {
  const [viewport, setViewport] = useState<ViewportSize>('desktop');
  const { isCopied, copyToClipboard } = useCopyToClipboard(2000);

  return (
    <section aria-labelledby={`brick-${id}-title`}>
      <Tabs defaultValue="preview" variant="ghost" className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Tabs.List>
              <Tabs.Trigger variant="ghost" value="preview">
                Preview
              </Tabs.Trigger>
              <Tabs.Trigger variant="ghost" value="code">
                Code
              </Tabs.Trigger>
            </Tabs.List>
            <p className="text-muted-foreground hidden text-sm sm:block">{description}</p>
          </div>

          <div className="flex items-center gap-2">
            <div
              className="border-border bg-muted/30 hidden items-center gap-1 rounded-md border p-0.5 sm:flex"
              role="group"
              aria-label="Viewport size"
            >
              <button
                type="button"
                onClick={() => setViewport('desktop')}
                className={cn(
                  'rounded-sm p-1.5 transition-colors',
                  viewport === 'desktop'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground',
                )}
                aria-label="Desktop viewport"
                aria-pressed={viewport === 'desktop'}
              >
                <HugeiconsIcon icon={LaptopIcon} size={14} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setViewport('mobile')}
                className={cn(
                  'rounded-sm p-1.5 transition-colors',
                  viewport === 'mobile'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground',
                )}
                aria-label="Mobile viewport"
                aria-pressed={viewport === 'mobile'}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect width="12" height="20" x="6" y="2" rx="2" />
                  <circle cx="12" cy="18" r="1" />
                </svg>
              </button>
            </div>

            {installCommand && (
              <button
                type="button"
                onClick={() => copyToClipboard(installCommand)}
                aria-label={
                  isCopied ? 'Install command copied' : `Copy install command: ${installCommand}`
                }
                className={cn(
                  'border-border bg-muted/30 text-muted-foreground hover:text-foreground flex items-center gap-2 rounded-md border px-3 py-1.5 font-mono text-xs transition-colors',
                  isCopied && 'text-success',
                )}
                title={isCopied ? 'Copied!' : `Copy: ${installCommand}`}
              >
                <HugeiconsIcon
                  icon={isCopied ? Tick02Icon : Copy01Icon}
                  size={12}
                  aria-hidden="true"
                />
                <span className="hidden sm:inline">{installCommand}</span>
              </button>
            )}
          </div>
        </div>

        <Tabs.Content value="preview" className="mt-0">
          <div className="border-border bg-background/50 rounded-lg border">
            <div
              className={cn(
                'mx-auto flex min-h-[500px] items-center justify-center p-6 transition-all duration-300 sm:p-10',
                VIEWPORT_WIDTHS[viewport],
              )}
            >
              {children}
            </div>
          </div>
        </Tabs.Content>

        <Tabs.Content value="code" className="mt-0">
          {files && files.length > 0 ? (
            <BrickCodeViewer files={files} />
          ) : (
            <div className="border-border bg-destructive/10 rounded-lg border p-6">
              <p className="text-destructive text-sm font-medium">
                ⚠️ Source code not available for brick &ldquo;{name}&rdquo;.
              </p>
            </div>
          )}
        </Tabs.Content>
      </Tabs>
    </section>
  );
}
