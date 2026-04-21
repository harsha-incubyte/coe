import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Day05 from './Day05';
import { describe, it, expect, vi } from 'vitest';
import { ThemeManager } from '@/design-system/theme/ThemeManager';

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
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    </ThemeManager>
  );
};

describe('Day05 Page', () => {
  it('should not contain any axe-ignore classes', () => {
    renderWithTheme(<Day05 />);
    const ignoredElements = document.querySelectorAll('.axe-ignore');
    expect(ignoredElements.length).toBe(0);
  });

  it('should not use inline styles for the footer', () => {
    renderWithTheme(<Day05 />);
    const footer = document.querySelector('footer');
    expect(footer).not.toHaveAttribute('style');
  });
});
