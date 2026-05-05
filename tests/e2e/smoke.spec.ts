import { test, expect } from '@playwright/test';

test.describe('Smoke Test', () => {
  test('should load the login page', async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveTitle(/Login/);
    await expect(page.getByRole('heading', { name: /Login/i })).toBeVisible();
  });

  test('visual comparison of login page', async ({ page }) => {
    await page.goto('/login');
    // This will create a baseline on first run
    await expect(page).toHaveScreenshot('login-page.png');
  });
});
