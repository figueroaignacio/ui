import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Callout } from './callout';

describe('Callout', () => {
  it('renders default variant correctly', () => {
    render(
      <Callout title="Note">
        This is a callout.
      </Callout>
    );
    expect(screen.getByText('Note')).toBeInTheDocument();
    expect(screen.getByText('This is a callout.')).toBeInTheDocument();
    // Default callouts have role="region"
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('renders specific variant (danger) as an alert', () => {
    render(
      <Callout variant="danger" title="Error">
        Something went wrong.
      </Callout>
    );
    // Danger variant uses role="alert"
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('allows custom icons', () => {
    render(
      <Callout title="Custom" icon={<span data-testid="custom-icon">Icon</span>}>
        Has a custom icon.
      </Callout>
    );
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });
});
