import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Callout } from './callout';

describe('Callout', () => {
  it('renders the default variant with structured children', () => {
    render(
      <Callout>
        <Callout.Text>
          <Callout.Title>Note</Callout.Title>
          <Callout.Content>This is a callout.</Callout.Content>
        </Callout.Text>
      </Callout>,
    );

    expect(screen.getByText('Note')).toBeInTheDocument();
    expect(screen.getByText('This is a callout.')).toBeInTheDocument();
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('renders danger variant as an alert with default icon', () => {
    render(
      <Callout variant="danger">
        <Callout.Icon data-testid="callout-icon" />
        <Callout.Text>
          <Callout.Title>Error</Callout.Title>
          <Callout.Content>Something went wrong.</Callout.Content>
        </Callout.Text>
      </Callout>,
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByTestId('callout-icon').innerHTML).not.toEqual('');
  });

  it('allows custom icons through Callout.Icon children', () => {
    render(
      <Callout>
        <Callout.Icon>
          <span data-testid="custom-icon">Icon</span>
        </Callout.Icon>
        <Callout.Text>
          <Callout.Title>Custom</Callout.Title>
          <Callout.Content>Has a custom icon.</Callout.Content>
        </Callout.Text>
      </Callout>,
    );

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });
});
