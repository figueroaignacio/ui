import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Accordion } from './accordion';

// Mock motion to display AnimatePresence correctly in tests
vi.mock('motion/react', async () => {
  const React = await import('react');
  return {
    motion: {
      button: React.forwardRef(({ children, whileTap, ...props }: any, ref: any) => (
        <button ref={ref} {...props}>
          {children}
        </button>
      )),
      div: React.forwardRef(({ children, ...props }: any, ref: any) => (
        <div ref={ref} {...props}>
          {children}
        </div>
      )),
      svg: React.forwardRef(({ children, ...props }: any, ref: any) => (
        <svg ref={ref} {...props}>
          {children}
        </svg>
      )),
    },
    useReducedMotion: () => false,
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

describe('Accordion', () => {
  it('renders closed by default', () => {
    render(
      <Accordion type="single">
        <Accordion.Item value="item-1">
          <Accordion.Trigger value="item-1">Is it accessible?</Accordion.Trigger>
          <Accordion.Content value="item-1">
            Yes. It adheres to the WAI-ARIA design pattern.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>,
    );

    const trigger = screen.getByRole('button', { name: /Is it accessible?/i });
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    const content = screen.queryByText('Yes. It adheres to the WAI-ARIA design pattern.');
    expect(content).not.toBeInTheDocument();
  });

  it('toggles accordion content when clicked in single mode', async () => {
    render(
      <Accordion type="single">
        <Accordion.Item value="item-1">
          <Accordion.Trigger value="item-1">Is it accessible?</Accordion.Trigger>
          <Accordion.Content value="item-1">Yes.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2">
          <Accordion.Trigger value="item-2">Is it unstyled?</Accordion.Trigger>
          <Accordion.Content value="item-2">No.</Accordion.Content>
        </Accordion.Item>
      </Accordion>,
    );

    const trigger1 = screen.getByRole('button', { name: /Is it accessible?/i });
    const trigger2 = screen.getByRole('button', { name: /Is it unstyled?/i });

    await userEvent.click(trigger1);

    await waitFor(() => {
      expect(screen.getByText('Yes.')).toBeInTheDocument();
      expect(trigger1).toHaveAttribute('aria-expanded', 'true');
    });

    // Click second item
    await userEvent.click(trigger2);

    await waitFor(() => {
      expect(screen.queryByText('Yes.')).not.toBeInTheDocument();
      expect(screen.getByText('No.')).toBeInTheDocument();
      expect(trigger1).toHaveAttribute('aria-expanded', 'false');
      expect(trigger2).toHaveAttribute('aria-expanded', 'true');
    });
  });

  it('allows multiple open items in multiple mode', async () => {
    render(
      <Accordion type="multiple">
        <Accordion.Item value="item-1">
          <Accordion.Trigger value="item-1">Is it accessible?</Accordion.Trigger>
          <Accordion.Content value="item-1">Yes.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2">
          <Accordion.Trigger value="item-2">Is it unstyled?</Accordion.Trigger>
          <Accordion.Content value="item-2">No.</Accordion.Content>
        </Accordion.Item>
      </Accordion>,
    );

    const trigger1 = screen.getByRole('button', { name: /Is it accessible?/i });
    const trigger2 = screen.getByRole('button', { name: /Is it unstyled?/i });

    await userEvent.click(trigger1);
    await userEvent.click(trigger2);

    await waitFor(() => {
      expect(screen.getByText('Yes.')).toBeInTheDocument();
      expect(screen.getByText('No.')).toBeInTheDocument();
      expect(trigger1).toHaveAttribute('aria-expanded', 'true');
      expect(trigger2).toHaveAttribute('aria-expanded', 'true');
    });
  });
});
