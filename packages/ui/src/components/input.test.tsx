import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Input } from './input';

describe('Input', () => {
  it('renders correctly', () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Input label="Email Address" id="email" />);
    const label = screen.getByText('Email Address');
    const input = screen.getByRole('textbox', { name: 'Email Address' });
    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it('renders error message and sets aria-invalid', () => {
    render(<Input error="Invalid email" />);
    const input = screen.getByRole('textbox');
    const errorMessage = screen.getByText('Invalid email');

    expect(errorMessage).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby');
  });

  it('handles user input', async () => {
    render(<Input />);
    const input = screen.getByRole('textbox');

    await userEvent.type(input, 'Hello World');
    expect(input).toHaveValue('Hello World');
  });

  it('is disabled when disabled prop is passed', () => {
    render(<Input disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });
});
