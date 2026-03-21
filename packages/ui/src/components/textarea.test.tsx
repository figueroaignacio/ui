import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Textarea } from './textarea';

describe('Textarea', () => {
  it('renders correctly', () => {
    render(<Textarea placeholder="Enter text" />);
    const textarea = screen.getByPlaceholderText('Enter text');
    expect(textarea).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Textarea label="Message" id="msg" />);
    const label = screen.getByText('Message');
    expect(label).toBeInTheDocument();
  });

  it('renders error message and sets aria-invalid', () => {
    render(<Textarea error="Required field" />);
    const textarea = screen.getByRole('textbox');
    const errorMessage = screen.getByText('Required field');
    expect(errorMessage).toBeInTheDocument();
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders description', () => {
    render(<Textarea description="Max 500 characters" />);
    expect(screen.getByText('Max 500 characters')).toBeInTheDocument();
  });

  it('handles user input', async () => {
    render(<Textarea />);
    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, 'Hello World');
    expect(textarea).toHaveValue('Hello World');
  });

  it('is disabled when disabled prop is passed', () => {
    render(<Textarea disabled />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled();
  });

  it('applies size variant classes', () => {
    const { rerender } = render(<Textarea size="sm" placeholder="sm" />);
    let textarea = screen.getByPlaceholderText('sm');
    expect(textarea.className).toContain('min-h-[60px]');

    rerender(<Textarea size="lg" placeholder="lg" />);
    textarea = screen.getByPlaceholderText('lg');
    expect(textarea.className).toContain('min-h-[120px]');
  });
});
