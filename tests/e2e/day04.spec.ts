import { test, expect } from '@playwright/test';

test.describe('Day 04: ARIA Patterns & Accessible Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/day-04');
  });

  test.describe('Accessible Modal Experience', () => {
    test('traps focus inside the modal and wraps around', async ({ page }) => {
      // Open the modal
      await page.getByRole('button', { name: 'Launch Modal Experience' }).click();
      
      // Modal should be visible
      const modal = page.getByRole('dialog');
      await expect(modal).toBeVisible();
      
      // Playwright's getByLabel is precise. 
      // In Cypress it was button[aria-label="Close modal"]
      const closeButton = page.getByLabel('Close modal');
      
      // Wait for focus to settle
      await expect(closeButton).toBeFocused({ timeout: 10000 });

      // Tab through all elements
      await page.keyboard.press('Tab'); // Full Name input
      await expect(page.getByLabel('Full Name')).toBeFocused();
      
      await page.keyboard.press('Tab'); // Environment input
      await page.keyboard.press('Tab'); // Cancel button
      await page.keyboard.press('Tab'); // Confirm button
      
      // Next tab should wrap back to the Close button
      await page.keyboard.press('Tab');
      await expect(closeButton).toBeFocused();

      // Shift + Tab from first element (Close button) should wrap to last element (Confirm button)
      await page.keyboard.press('Shift+Tab');
      await expect(page.getByRole('button', { name: 'Confirm Changes' })).toBeFocused();
    });

    test('restores focus to the trigger button on close', async ({ page }) => {
      const trigger = page.getByRole('button', { name: 'Launch Modal Experience' });
      await trigger.click();
      
      const closeButton = page.getByLabel('Close modal');
      await expect(closeButton).toBeVisible();
      await closeButton.click();
      
      // Modal should be gone
      await expect(page.getByRole('dialog')).toHaveCount(0);
      
      // Focus should be restored
      await expect(trigger).toBeFocused();
    });

    test('closes on Escape key', async ({ page }) => {
      await page.getByRole('button', { name: 'Launch Modal Experience' }).click();
      await expect(page.getByRole('dialog')).toBeVisible();
      
      await page.keyboard.press('Escape');
      await expect(page.getByRole('dialog')).toHaveCount(0);
    });
  });

  test.describe('Global Toast System', () => {
    test('triggers and displays accessible announcements', async ({ page }) => {
      await page.getByRole('button', { name: 'Trigger Polite Announcement' }).click();
      
      // Should find a toast with role="status"
      const toast = page.getByRole('status');
      await expect(toast).toBeVisible();
      await expect(toast).toContainText('Success: Data synced at');
      
      // Should have aria-live container
      const container = page.getByTestId('toast-container');
      await expect(container).toHaveAttribute('aria-live', 'polite');
    });

    test('triggers assertive announcements for critical errors', async ({ page }) => {
      await page.getByRole('button', { name: 'Trigger Assertive Announcement' }).click();
      
      const toast = page.getByRole('status');
      await expect(toast).toBeVisible();
      await expect(toast).toContainText('CRITICAL: Connection lost at');
    });
  });
});
