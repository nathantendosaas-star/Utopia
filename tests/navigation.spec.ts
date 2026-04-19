import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page).toHaveTitle(/Utopia/);
});

test('can open search modal', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('button[aria-label="Toggle search"]').click(); // Need to ensure button has this label
  await expect(page.getByRole('dialog', { name: 'Search' })).toBeVisible();
});
