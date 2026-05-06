import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Mock weather APIs for this test
    await page.route('**/geocoding-api.open-meteo.com/v1/search*', async route => {
      await route.fulfill({
        json: {
          results: [
            { id: 1, name: 'London', latitude: 51.5085, longitude: -0.1257, country: 'United Kingdom' }
          ]
        }
      });
    });

    await page.route('**/api.open-meteo.com/v1/forecast*', async route => {
      await route.fulfill({
        json: {
          current_weather: { temperature: 15, weathercode: 1, is_day: 1 }
        }
      });
    });
  });

  test('should login, view weather, search and logout', async ({ page }) => {
    // Visit login page
    await page.goto('/login?callbackUrl=/day-02');

    // Attempt login with valid credentials
    await page.fill('#email', 'doctor@example.com');
    await page.fill('#password', 'password123');
    await page.click('button[type="submit"]');

    // Verify redirection to weather dashboard
    await expect(page).toHaveURL(/.*day-02/, { timeout: 20000 });

    // Ensure the page title is visible
    await expect(page.locator('h1')).toContainText('Weather', { timeout: 15000 });
    await expect(page.locator('#user-profile-btn')).toBeVisible({ timeout: 10000 });
    
    const searchInput = page.getByTestId('city-search-input').first();
    await expect(searchInput).toBeVisible({ timeout: 15000 });

    // Search for a city
    await searchInput.fill('Lond');
    
    // Wait for and click the first suggestion
    const firstSuggestion = page.locator('.suggestions-list li').first();
    await expect(firstSuggestion).toBeVisible();
    await firstSuggestion.click();

    // Verify weather data is displayed
    await expect(page.getByText('London')).toBeVisible();
    await expect(page.getByText('°C')).toBeVisible();

    // Logout via Navbar
    await page.click('#user-profile-btn');
    await page.getByText('Logout').click();

    // Verify redirection back to login page
    await expect(page).toHaveURL(/.*login/);
    await expect(page.locator('#email')).toBeVisible();
  });
});
