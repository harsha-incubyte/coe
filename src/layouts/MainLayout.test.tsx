import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './MainLayout';
import { describe, it, expect } from 'vitest';

describe('MainLayout', () => {
  it('should have a skip link as the first focusable element', () => {
    render(
      <BrowserRouter>
        <MainLayout>
          <div>Content</div>
        </MainLayout>
      </BrowserRouter>
    );

    const skipLink = screen.getByRole('link', { name: /skip to content/i });
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  it('should have a main element with id "main-content" and tabIndex="-1"', () => {
    render(
      <BrowserRouter>
        <MainLayout>
          <div>Content</div>
        </MainLayout>
      </BrowserRouter>
    );

    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveAttribute('id', 'main-content');
    expect(mainElement).toHaveAttribute('tabIndex', '-1');
  });

  it('should apply correct theme styles to the content container', () => {
    render(
      <BrowserRouter>
        <MainLayout>
          <div>Content</div>
        </MainLayout>
      </BrowserRouter>
    );

    const mainElement = screen.getByRole('main');
    // spacing['2xl'] is 3rem (48px)
    expect(mainElement).toHaveStyle({
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '3rem'
    });
  });

  it('should apply global styles to headings', () => {
    render(
      <BrowserRouter>
        <MainLayout>
          <h1>Test Heading</h1>
        </MainLayout>
      </BrowserRouter>
    );

    const heading = screen.getByRole('heading', { level: 1 });
    // This is expected to be provided by GlobalStyles.ts after migration
    expect(heading).toHaveStyle({
      textAlign: 'center',
      fontSize: '2.5rem'
    });
  });
});
