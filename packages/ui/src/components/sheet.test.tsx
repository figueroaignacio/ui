import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Sheet } from './sheet';

// Mock motion to disable AnimatePresence delay for Portals
vi.mock('motion/react', async () => {
  const React = await import('react');
  return {
    motion: {
      button: React.forwardRef(
        (
          {
            children,
            style,
            initial,
            animate,
            exit,
            variants,
            transition,
            drag,
            dragConstraints,
            dragElastic,
            onDragEnd,
            whileTap,
            whileHover,
            layoutId,
            ...props
          }: any,
          ref: any,
        ) => (
          <button ref={ref} {...props}>
            {children}
          </button>
        ),
      ),
      div: React.forwardRef(
        (
          {
            children,
            style,
            initial,
            animate,
            exit,
            variants,
            transition,
            drag,
            dragConstraints,
            dragElastic,
            onDragEnd,
            whileTap,
            whileHover,
            layoutId,
            ...props
          }: any,
          ref: any,
        ) => (
          <div ref={ref} {...props}>
            {children}
          </div>
        ),
      ),
    },
    useMotionValue: () => ({ set: vi.fn(), get: () => 0 }),
    useTransform: () => ({ set: vi.fn(), get: () => 0 }),
    useReducedMotion: () => false,
    AnimatePresence: ({ children }: any) => <>{children}</>,
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
