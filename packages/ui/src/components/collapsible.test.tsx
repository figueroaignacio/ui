import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Collapsible } from './collapsible';

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
      span: React.forwardRef(
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
          <span ref={ref} {...props}>
            {children}
          </span>
        ),
      ),
    },
    useReducedMotion: () => false,
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

describe('Collapsible', () => {
  it('renders closed by default', () => {
    render(
      <Collapsible>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Content inside</Collapsible.Content>
      </Collapsible>,
    );

    const trigger = screen.getByRole('button', { name: /Toggle/i });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText('Content inside')).not.toBeInTheDocument();
  });

  it('toggles content on click', async () => {
    render(
      <Collapsible>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Content inside</Collapsible.Content>
      </Collapsible>,
    );

    const trigger = screen.getByRole('button', { name: /Toggle/i });

    await userEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText('Content inside')).toBeInTheDocument();
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    await userEvent.click(trigger);

    await waitFor(() => {
      expect(screen.queryByText('Content inside')).not.toBeInTheDocument();
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('respects defaultOpen prop', () => {
    render(
      <Collapsible defaultOpen>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Content inside</Collapsible.Content>
      </Collapsible>,
    );

    expect(screen.getByText('Content inside')).toBeInTheDocument();
  });
});
