import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Select } from './select';

describe('Select', () => {
  it('renders correctly', () => {
    render(
      <Select data-testid="select">
        <option value="1">One</option>
      </Select>,
    );
    expect(screen.getByTestId('select')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(
      <Select data-testid="select">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </Select>,
    );
    const select = screen.getByTestId('select');
    expect(select.children.length).toBe(2);
    expect(select.children[0]?.textContent).toBe('Option 1');
  });

  it('respects disabled state', () => {
    render(
      <Select data-testid="select" disabled>
        <option value="1">One</option>
      </Select>,
    );
    expect(screen.getByTestId('select')).toBeDisabled();
  });
});
