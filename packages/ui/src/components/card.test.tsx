import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Card } from './card';

describe('Card', () => {
  it('renders all structural components', () => {
    render(
      <Card>
        <Card.Header>
          <Card.Title>Title</Card.Title>
          <Card.Description>Description</Card.Description>
        </Card.Header>
        <Card.Content>Content</Card.Content>
        <Card.Footer>Footer</Card.Footer>
      </Card>
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('renders correctly with outline variant', () => {
    render(<Card variant="outline" data-testid="card-root">Content</Card>);
    const card = screen.getByTestId('card-root');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('border-2'); // Outline variant
  });

  it('renders correctly with gradient prop', () => {
    render(<Card gradient data-testid="card-root">Content</Card>);
    const card = screen.getByTestId('card-root');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('bg-gradient-to-br'); // Gradient prop class
  });
});
