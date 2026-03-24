import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Radio } from './radio';

describe('Radio', () => {
  it('renders correctly', () => {
    render(<Radio data-testid="radio" />);
    expect(screen.getByTestId('radio')).toBeInTheDocument();
  });

  it('can be checked', () => {
    render(
      <>
        <Radio data-testid="radio-1" name="group" />
        <Radio data-testid="radio-2" name="group" />
      </>,
    );
    const radio1 = screen.getByTestId('radio-1') as HTMLInputElement;
    const radio2 = screen.getByTestId('radio-2') as HTMLInputElement;

    expect(radio1.checked).toBe(false);
    expect(radio2.checked).toBe(false);

    fireEvent.click(radio1);
    expect(radio1.checked).toBe(true);
    expect(radio2.checked).toBe(false);

    fireEvent.click(radio2);
    expect(radio1.checked).toBe(false);
    expect(radio2.checked).toBe(true);
  });

  it('calls onCheckedChange when clicked', () => {
    const onCheckedChange = vi.fn();
    render(<Radio data-testid="radio" onCheckedChange={onCheckedChange} />);
    const radio = screen.getByTestId('radio');

    fireEvent.click(radio);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('respects disabled state', () => {
    render(<Radio data-testid="radio" disabled />);
    const radio = screen.getByTestId('radio');
    expect(radio).toBeDisabled();
  });
});
