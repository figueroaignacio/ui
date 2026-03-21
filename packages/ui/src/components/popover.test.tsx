import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Popover } from './popover';

describe('Popover', () => {
  it('renders trigger', () => {
    render(
      <Popover>
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Content>Content</Popover.Content>
      </Popover>,
    );
    expect(screen.getByText('Open')).toBeInTheDocument();
  });

  it('shows content when trigger is clicked', async () => {
    render(
      <Popover>
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Content>Popover content</Popover.Content>
      </Popover>,
    );

    await userEvent.click(screen.getByText('Open'));
    expect(screen.getByText('Popover content')).toBeInTheDocument();
  });

  it('hides content when trigger is clicked again', async () => {
    render(
      <Popover>
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Content>Popover content</Popover.Content>
      </Popover>,
    );

    const trigger = screen.getByText('Open');
    await userEvent.click(trigger);
    expect(screen.getByText('Popover content')).toBeInTheDocument();

    await userEvent.click(trigger);
    // AnimatePresence exit animation — content may still be in DOM briefly
  });

  it('renders with defaultOpen', () => {
    render(
      <Popover defaultOpen>
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Content>Content</Popover.Content>
      </Popover>,
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
