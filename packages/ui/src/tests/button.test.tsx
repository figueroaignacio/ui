import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button, ButtonGroup } from '../components/button';

describe('Button', () => {
  describe('Rendering', () => {
    it('renders with children text', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('renders with default type="button"', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });

    it('renders with custom type', () => {
      render(<Button type="submit">Submit</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    });

    it('applies custom className', () => {
      render(<Button className="custom-class">Click me</Button>);
      expect(screen.getByRole('button')).toHaveClass('custom-class');
    });

    it('renders with fullWidth prop', () => {
      render(<Button fullWidth>Click me</Button>);
      expect(screen.getByRole('button')).toHaveClass('w-full');
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      render(<Button variant="default">Default</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-secondary');
    });

    it('renders destructive variant', () => {
      render(<Button variant="destructive">Delete</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-destructive');
    });

    it('renders outline variant', () => {
      render(<Button variant="outline">Outline</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('border-2');
    });

    it('renders secondary variant', () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-primary');
    });

    it('renders ghost variant', () => {
      render(<Button variant="ghost">Ghost</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('hover:bg-secondary');
    });

    it('renders link variant', () => {
      render(<Button variant="link">Link</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('text-primary');
    });
  });

  describe('Sizes', () => {
    it('renders default size', () => {
      render(<Button size="default">Default</Button>);
      expect(screen.getByRole('button')).toHaveClass('h-10');
    });

    it('renders small size', () => {
      render(<Button size="sm">Small</Button>);
      expect(screen.getByRole('button')).toHaveClass('h-9');
    });

    it('renders large size', () => {
      render(<Button size="lg">Large</Button>);
      expect(screen.getByRole('button')).toHaveClass('h-11');
    });

    it('renders icon size', () => {
      render(<Button size="icon">Icon</Button>);
      expect(screen.getByRole('button')).toHaveClass('size-9');
    });
  });

  describe('Loading state', () => {
    it('shows loader when loading', () => {
      render(<Button loading>Loading</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(button.querySelector('.animate-spin')).toBeInTheDocument();
    });

    it('disables button when loading', () => {
      render(<Button loading>Loading</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('hides icons when loading', () => {
      render(
        <Button loading leftIcon={<span data-testid="left-icon">L</span>}>
          Loading
        </Button>,
      );
      expect(screen.queryByTestId('left-icon')).not.toBeInTheDocument();
    });

    it('renders custom loader', () => {
      render(
        <Button loading loader={<span data-testid="custom-loader">...</span>}>
          Loading
        </Button>,
      );
      expect(screen.getByTestId('custom-loader')).toBeInTheDocument();
    });

    it('applies cursor-wait class when loading', () => {
      render(<Button loading>Loading</Button>);
      expect(screen.getByRole('button')).toHaveClass('cursor-wait');
    });
  });

  describe('Icons', () => {
    it('renders left icon', () => {
      render(<Button leftIcon={<span data-testid="left-icon">←</span>}>With Icon</Button>);
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    });

    it('renders right icon', () => {
      render(<Button rightIcon={<span data-testid="right-icon">→</span>}>With Icon</Button>);
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });

    it('renders both icons', () => {
      render(
        <Button
          leftIcon={<span data-testid="left-icon">←</span>}
          rightIcon={<span data-testid="right-icon">→</span>}
        >
          With Icons
        </Button>,
      );
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });
  });

  describe('Disabled state', () => {
    it('disables button when disabled prop is true', () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('applies disabled opacity class', () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole('button')).toHaveClass('disabled:opacity-50');
    });
  });

  describe('Interactions', () => {
    it('calls onClick handler when clicked', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick}>Click me</Button>);
      await user.click(screen.getByRole('button'));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Button onClick={handleClick} disabled>
          Click me
        </Button>,
      );
      await user.click(screen.getByRole('button'));

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when loading', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Button onClick={handleClick} loading>
          Click me
        </Button>,
      );
      await user.click(screen.getByRole('button'));

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has correct role', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('sets aria-busy when loading', () => {
      render(<Button loading>Loading</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
    });

    it('does not set aria-busy when not loading', () => {
      render(<Button>Not loading</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'false');
    });

    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<Button ref={ref}>Click me</Button>);
      expect(ref).toHaveBeenCalled();
    });
  });

  describe('HTML attributes', () => {
    it('passes through additional props', () => {
      render(
        <Button data-testid="custom-button" aria-label="Custom label">
          Click me
        </Button>,
      );
      const button = screen.getByTestId('custom-button');
      expect(button).toHaveAttribute('aria-label', 'Custom label');
    });

    it('supports aria-invalid attribute', () => {
      render(<Button aria-invalid>Invalid</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-invalid');
    });
  });
});

describe('ButtonGroup', () => {
  describe('Rendering', () => {
    it('renders children buttons', () => {
      render(
        <ButtonGroup>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>,
      );
      expect(screen.getByRole('button', { name: /button 1/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /button 2/i })).toBeInTheDocument();
    });

    it('has correct role', () => {
      render(
        <ButtonGroup>
          <Button>Button 1</Button>
        </ButtonGroup>,
      );
      expect(screen.getByRole('group')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <ButtonGroup className="custom-group">
          <Button>Button 1</Button>
        </ButtonGroup>,
      );
      expect(screen.getByRole('group')).toHaveClass('custom-group');
    });
  });

  describe('Orientation', () => {
    it('renders horizontal orientation by default', () => {
      render(
        <ButtonGroup>
          <Button>Button 1</Button>
        </ButtonGroup>,
      );
      expect(screen.getByRole('group')).toHaveClass('flex-row');
    });

    it('renders horizontal orientation explicitly', () => {
      render(
        <ButtonGroup orientation="horizontal">
          <Button>Button 1</Button>
        </ButtonGroup>,
      );
      expect(screen.getByRole('group')).toHaveClass('flex-row');
    });

    it('renders vertical orientation', () => {
      render(
        <ButtonGroup orientation="vertical">
          <Button>Button 1</Button>
        </ButtonGroup>,
      );
      expect(screen.getByRole('group')).toHaveClass('flex-col');
    });
  });

  describe('Attached prop', () => {
    it('applies gap when not attached horizontally', () => {
      render(
        <ButtonGroup orientation="horizontal" attached={false}>
          <Button>Button 1</Button>
        </ButtonGroup>,
      );
      expect(screen.getByRole('group')).toHaveClass('gap-2');
    });

    it('applies gap when not attached vertically', () => {
      render(
        <ButtonGroup orientation="vertical" attached={false}>
          <Button>Button 1</Button>
        </ButtonGroup>,
      );
      expect(screen.getByRole('group')).toHaveClass('gap-2');
    });

    it('applies attached styles for horizontal orientation', () => {
      render(
        <ButtonGroup orientation="horizontal" attached>
          <Button>Button 1</Button>
        </ButtonGroup>,
      );
      const group = screen.getByRole('group');
      expect(group.className).toContain('rounded-l-none');
    });

    it('applies attached styles for vertical orientation', () => {
      render(
        <ButtonGroup orientation="vertical" attached>
          <Button>Button 1</Button>
        </ButtonGroup>,
      );
      const group = screen.getByRole('group');
      expect(group.className).toContain('rounded-t-none');
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(
        <ButtonGroup ref={ref}>
          <Button>Button 1</Button>
        </ButtonGroup>,
      );
      expect(ref).toHaveBeenCalled();
    });

    it('passes through additional props', () => {
      render(
        <ButtonGroup data-testid="custom-group" aria-label="Button group">
          <Button>Button 1</Button>
        </ButtonGroup>,
      );
      const group = screen.getByTestId('custom-group');
      expect(group).toHaveAttribute('aria-label', 'Button group');
    });
  });
});
