import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/design-system/theme';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {ui}
    </ThemeProvider>
  );
};

describe('Button Component', () => {
  it('renders correctly as a button by default', () => {
    renderWithTheme(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe('BUTTON');
  });

  it('renders as a custom element when using "as" prop', () => {
    renderWithTheme(<Button as="a" href="https://example.com">Link Button</Button>);
    const link = screen.getByRole('link', { name: /link button/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('shows loading state and triggers aria-busy', () => {
    renderWithTheme(<Button isLoading>Submit</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toBeDisabled();
    // Content should be hidden or replaced by spinner
    expect(screen.getByText('Submit')).toHaveStyle('visibility: hidden');
    expect(button.querySelector('.btn-spinner')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    renderWithTheme(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    renderWithTheme(<Button onClick={handleClick} disabled>Disabled</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders with left and right icons', () => {
    renderWithTheme(
      <Button 
        leftIcon={<span data-testid="left-icon">🚀</span>}
        rightIcon={<span data-testid="right-icon">✨</span>}
      >
        Icon Button
      </Button>
    );
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });
});
