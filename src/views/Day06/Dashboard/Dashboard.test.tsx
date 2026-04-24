import { render, screen } from '@testing-library/react';

import { Dashboard } from './Dashboard';
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

describe('Dashboard Component', () => {
  it('should render the dashboard main content with correct data-testid', () => {
    renderWithTheme(<Dashboard />);
    expect(screen.getByTestId('dashboard-main-content')).toBeInTheDocument();
  });

  it('should use the design system Tabs molecule', () => {
    renderWithTheme(<Dashboard />);
    // Tabs uses data-testid="tabs" internally
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });
});
