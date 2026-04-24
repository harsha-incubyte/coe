import { render, screen } from '@testing-library/react';

import MainLayout from './MainLayout';
import { describe, it, expect } from 'vitest';
import { ThemeManager } from '@/design-system/theme/ThemeManager';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ThemeManager>
      
        {ui}
      
    </ThemeManager>
  );
};

describe('MainLayout', () => {
  it('should have a skip link as the first focusable element', () => {
    renderWithProviders(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    );

    const skipLink = screen.getByRole('link', { name: /skip to content/i });
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  it('should have a main element with id "main-content" and tabIndex="-1"', () => {
    renderWithProviders(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    );

    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveAttribute('id', 'main-content');
    expect(mainElement).toHaveAttribute('tabIndex', '-1');
  });

  it('should apply correct theme styles to the content container', () => {
    renderWithProviders(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    );

    const mainElement = screen.getByRole('main');
    // spacing['2xl'] is 3rem (48px)
    expect(mainElement).toHaveStyle({
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '3rem'
    });
  });
});
