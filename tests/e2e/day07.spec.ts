import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Day 07: Task Board & Atomic Refactor', () => {
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

    // Mock tasks API
    await page.route('**/api/tasks', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { id: '1', title: 'Task 1', completed: false },
          { id: '2', title: 'Task 2', completed: true }
        ])
      });
    });

    // Visit Day 07 page
    await page.goto('/day-07');
    await expect(page.locator('main')).toBeVisible();
  });

  test('should have no accessibility violations on the task board', async ({ page }) => {
    // Wait for the simulated loading state to finish
    await expect(page.getByTestId('tasks-list-container')).toBeVisible({ timeout: 10000 });
    
    // Ensure the footer/concept cards are also visible
    await expect(page.getByText('React Query Cache')).toBeVisible();
    
    // Wait for Framer Motion animations to settle to avoid false-positive color-contrast violations
    await page.waitForTimeout(1000);
    
    // Accessibility audit - excluding the DesktopIndicator or disabling region rule for this dev-only utility
    const accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules(['region'])
      .analyze();
    if (accessibilityScanResults.violations.length > 0) {
      console.log('Day 07 A11y Violations:', JSON.stringify(accessibilityScanResults.violations, null, 2));
    }
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should use semantic tags for task items', async ({ page }) => {
    const articles = page.locator('article');
    const count = await articles.count();
    expect(count).toBeGreaterThanOrEqual(1);
    
    for (let i = 0; i < count; i++) {
      await expect(articles.nth(i).locator('header')).toBeVisible();
      await expect(articles.nth(i).locator('footer')).toBeVisible();
    }
  });
});
