import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Tooltip, TooltipProvider } from './tooltip';

vi.mock('motion/react', async () => {
  const React = await import('react');
  return {
    motion: {
      div: React.forwardRef(({ children, style, initial, animate, exit, variants, transition, drag, dragConstraints, dragElastic, onDragEnd, whileTap, whileHover, layoutId, ...props }: any, ref: any) => (
        <div ref={ref} {...props}>{children}</div>
      )),
    },
    useReducedMotion: () => false,
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

describe('Tooltip', () => {
  it('shows and hides tooltip on hover', async () => {
    const user = userEvent.setup();
    render(
      <TooltipProvider delayDuration={100}>
        <Tooltip.Trigger>Hover me</Tooltip.Trigger>
        <Tooltip.Content>Tooltip Content</Tooltip.Content>
      </TooltipProvider>
    );

    const trigger = screen.getByText('Hover me');
    
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    // Simulate hover
    await user.hover(trigger);
    
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
      expect(screen.getByText('Tooltip Content')).toBeInTheDocument();
    });

    // Simulate unhover
    await user.unhover(trigger);
    
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });
});
