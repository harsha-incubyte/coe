import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Day 05 Kata 2: Automation & UI Sanity', () => {
  test.beforeEach(async ({ page }) => {
    // Set authentication state in localStorage before navigation
    await page.addInitScript(() => {
      window.localStorage.setItem('coe-app-storage', JSON.stringify({
        state: {
          user: { id: '1', email: 'harsha@incubyte.co', name: 'Harsha' },
          token: 'mock-token',
          isAuthenticated: true
        },
        version: 0
      }));
    });

    // Visit Day 05 page
    await page.goto('/day-05');
    await expect(page.locator('main')).toBeVisible();
  });

  test('should have no accessibility violations on baseline', async ({ page }) => {
    await expect(page.locator('.day-05-grid')).toBeVisible();
    
    // Accessibility audit
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('.day-05-grid')
      .disableRules(['page-has-heading-one'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should use semantic roles for all sections', async ({ page }) => {
    const sections = page.locator('[data-testid^="demo-section-"]');
    const count = await sections.count();
    for (let i = 0; i < count; i++) {
      const tagName = await sections.nth(i).evaluate(el => el.tagName);
      expect(tagName).toBe('SECTION');
    }
  });

  test('should display the automation and UI sanity sections', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Automation & UI Sanity' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Automated A11y Pipeline' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Pa11y Headless CI' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Mobile Ergonomics' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Contrast Polish (4.5:1)' })).toBeVisible();
  });

  test('should have accessible touch targets in the ergonomics section', async ({ page }) => {
    const closeButton = page.getByLabel('Accessible close button');
    const box = await closeButton.boundingBox();
    expect(box?.width).toBeGreaterThanOrEqual(44);
    expect(box?.height).toBeGreaterThanOrEqual(44);
  });

  test('should follow atomic structure for sections', async ({ page }) => {
    const sections = page.locator('section');
    const count = await sections.count();
    expect(count).toBeGreaterThanOrEqual(4);
    await expect(sections.first()).toHaveAttribute('data-testid', 'demo-section-pipeline');
  });
});
