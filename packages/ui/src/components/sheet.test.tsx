import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type * as React from 'react';
import { Sheet } from './sheet';

// Mock motion to disable AnimatePresence delay for Portals
vi.mock('motion/react', async () => {
  const React = await import('react');
  return {
    motion: {
      button: ({
        children,
        _style,
        _initial,
        _animate,
        _exit,
        _variants,
        _transition,
        _drag,
        _dragConstraints,
        _dragElastic,
        _onDragEnd,
        _whileTap,
        _whileHover,
        _layoutId,
        ref,
        ...props
      }: React.ComponentProps<'button'> & Record<string, unknown>) => (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          {...(props as React.ComponentProps<'button'>)}
        >
          {children}
        </button>
      ),
      div: ({
        children,
        _style,
        _initial,
        _animate,
        _exit,
        _variants,
        _transition,
        _drag,
        _dragConstraints,
        _dragElastic,
        _onDragEnd,
        _whileTap,
        _whileHover,
        _layoutId,
        ref,
        ...props
      }: React.ComponentProps<'div'> & Record<string, unknown>) => (
        <div ref={ref as React.Ref<HTMLDivElement>} {...(props as React.ComponentProps<'div'>)}>
          {children}
        </div>
      ),
    },
    useMotionValue: () => ({ set: vi.fn(), get: () => 0 }),
    useTransform: () => ({ set: vi.fn(), get: () => 0 }),
    useReducedMotion: () => false,
    AnimatePresence: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
  };
});

describe('Sheet', () => {
  it('opens and closes appropriately', async () => {
    render(
      <Sheet>
        <Sheet.Trigger>Open Sheet</Sheet.Trigger>
        <Sheet.Content side="right">
          <Sheet.Header>
            <Sheet.Title>Sheet Title</Sheet.Title>
            <Sheet.Description>Sheet Description</Sheet.Description>
          </Sheet.Header>
          <div>Sheet Content Body</div>
          <Sheet.Close>Close Custom</Sheet.Close>
        </Sheet.Content>
      </Sheet>,
    );

    const trigger = screen.getByRole('button', { name: 'Open Sheet' });

    // initially hidden
    expect(screen.queryByText('Sheet Title')).not.toBeInTheDocument();

    // click trigger
    await userEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText('Sheet Title')).toBeInTheDocument();
      expect(screen.getByText('Sheet Description')).toBeInTheDocument();
      expect(screen.getByText('Sheet Content Body')).toBeInTheDocument();
    });

    // click close button (default one with X icon, or our custom one)
    const closeBtn = screen.getByRole('button', { name: 'Close Custom' });
    await userEvent.click(closeBtn);

    await waitFor(() => {
      expect(screen.queryByText('Sheet Title')).not.toBeInTheDocument();
    });
  });
});
