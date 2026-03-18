import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Label } from './label';

describe('Label', () => {
  it('renders correctly', () => {
    render(<Label htmlFor="test-input">Test Label</Label>);
    const label = screen.getByText('Test Label');
    expect(label).toBeInTheDocument();
  });

  it('passes htmlFor attribute', () => {
    render(<Label htmlFor="test-input">Email</Label>);
    const label = screen.getByText('Email');
    expect(label).toHaveAttribute('for', 'test-input');
  });

  it('applies custom classes', () => {
    render(<Label className="custom-class">Test Label</Label>);
    const label = screen.getByText('Test Label');
    expect(label).toHaveClass('custom-class');
  });
});
