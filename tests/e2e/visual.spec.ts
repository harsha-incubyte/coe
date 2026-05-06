import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Freeze time to avoid dynamic date/time strings causing mismatches
    // We use a fixed date: 2024-01-01T00:00:00Z
    await page.addInitScript(() => {
      const fixedDate = new Date('2024-01-01T00:00:00Z').getTime();
      Date.now = () => fixedDate;
      // @ts-expect-error - Overriding global Date for test stability
      window.Date = class extends Date {
        constructor() {
          super();
          return new Date(fixedDate);
        }
      };
    });

    // Disable CSS animations and transitions for consistent screenshots
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          transition-duration: 0s !important;
          animation-duration: 0s !important;
          transition-delay: 0s !important;
          animation-delay: 0s !important;
        }
      `,
    });
  });

  test('home page visual snapshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Take a full page screenshot and compare with baseline
    await expect(page).toHaveScreenshot('home-page.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });

  test('login page visual snapshot', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveScreenshot('login-page.png', {
      mask: [page.locator('input')], // Mask inputs if they have cursors/focus
    });
  });
});
