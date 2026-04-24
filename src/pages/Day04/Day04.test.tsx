import { render, screen } from '@testing-library/react';

import Day04 from './index';
import { describe, it, expect, vi } from 'vitest';
import { ThemeManager } from '@/design-system/theme/ThemeManager';
import { LayoutProvider } from '@/design-system/layout/LayoutContext';

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeManager>
      <LayoutProvider>
        {ui}
      </LayoutProvider>
    </ThemeManager>
  );
};

describe('Day04 Page', () => {
  it('should render atomic Input components instead of legacy ones', async () => {
    renderWithTheme(<Day04 />);
    
    // Open the modal
    const launchButton = screen.getByRole('button', { name: /launch modal/i });
    launchButton.click();

    // New Input is wrapped in a FormGroup
    const fullNameInput = await screen.findByLabelText(/full name/i);
    expect(fullNameInput).toBeInTheDocument();
    expect(fullNameInput).toHaveAttribute('id');
    
    const environmentInput = screen.getByLabelText(/environment/i);
    expect(environmentInput).toBeInTheDocument();
    // New Input should have aria-describedby for helper text if present
    expect(environmentInput).toHaveAttribute('aria-describedby');
  });

  it('should have the correct data-testid on the main container', () => {
    renderWithTheme(<Day04 />);
    expect(screen.getByTestId('day04-page')).toBeInTheDocument();
  });
});
