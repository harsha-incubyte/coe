/* eslint-disable @typescript-eslint/no-explicit-any */
import { test, expect } from '@playwright/test';

test.describe('Core Web Vitals & Performance Budgets', () => {
  test('should validate home page performance metrics', async ({ page }) => {
    // Navigate and wait for stability
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Capture LCP and CLS
    const metrics = await page.evaluate(async () => {
      return new Promise((resolve) => {
        let lcp = 0;
        let cls = 0;

        // Observe LCP
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          lcp = lastEntry.startTime;
        });
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

        // Observe CLS
        const clsObserver = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            const layoutShift = entry as any;
            if (!layoutShift.hadRecentInput) {
              cls += layoutShift.value;
            }
          }
        });
        clsObserver.observe({ type: 'layout-shift', buffered: true });

        // Wait for metrics to settle
        setTimeout(() => {
          lcpObserver.disconnect();
          clsObserver.disconnect();
          resolve({ lcp, cls });
        }, 3000);
      });
    }) as { lcp: number; cls: number };

    console.log(`[PERF] Home Page - LCP: ${metrics.lcp.toFixed(2)}ms, CLS: ${metrics.cls.toFixed(4)}`);

    // Performance Assertions (Budgets)
    // LCP < 2500ms (Good)
    expect(metrics.lcp).toBeLessThan(2500);
    // CLS < 0.1 (Good)
    expect(metrics.cls).toBeLessThan(0.1);
  });

  test('should validate authentication flow performance', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');

    const metrics = await page.evaluate(async () => {
      return new Promise((resolve) => {
        let lcp = 0;
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          lcp = entries[entries.length - 1].startTime;
        }).observe({ type: 'largest-contentful-paint', buffered: true });

        setTimeout(() => resolve({ lcp }), 2000);
      });
    }) as { lcp: number };

    console.log(`[PERF] Login Page - LCP: ${metrics.lcp.toFixed(2)}ms`);
    expect(metrics.lcp).toBeLessThan(2000);
  });
});
