import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Snippet } from './snippet';

describe('Snippet', () => {
  it('renders correctly with children', () => {
    render(
      <Snippet>
        <code>npm install something</code>
      </Snippet>
    );

    expect(screen.getByText('npm install something')).toBeInTheDocument();
    // Validate the inner container structure classes
    const codeElement = screen.getByText('npm install something');
    expect(codeElement.parentElement).toHaveClass('px-6 py-3');
  });
});
