import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Switch } from './switch';

describe('Switch', () => {
  it('renders correctly', () => {
    render(<Switch data-testid="switch" />);
    // Testing the inner input since it gets the test id usually if passed directly
    expect(screen.getByTestId('switch')).toBeInTheDocument();
  });

  it('can be checked and unchecked', () => {
    render(<Switch data-testid="switch" />);
    const switchEl = screen.getByTestId('switch') as HTMLInputElement;

    expect(switchEl.checked).toBe(false);
    fireEvent.click(switchEl);
    expect(switchEl.checked).toBe(true);
  });

  it('calls onCheckedChange when clicked', () => {
    const onCheckedChange = vi.fn();
    render(<Switch data-testid="switch" onCheckedChange={onCheckedChange} />);
    const switchEl = screen.getByTestId('switch');

    fireEvent.click(switchEl);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('respects disabled state', () => {
    render(<Switch data-testid="switch" disabled />);
    const switchEl = screen.getByTestId('switch');
    expect(switchEl).toBeDisabled();
  });
});
