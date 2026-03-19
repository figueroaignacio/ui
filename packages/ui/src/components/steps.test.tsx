import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Steps } from './steps';

describe('Steps', () => {
  it('renders correctly', () => {
    render(
      <Steps>
        <h3>Step 1</h3>
        <p>Description 1</p>
        <h3>Step 2</h3>
        <p>Description 2</p>
      </Steps>,
    );

    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();

    // Ensure the container has the 'steps' class
    expect(screen.getByText('Step 1').parentElement).toHaveClass('steps');
  });
});
