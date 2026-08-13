import { expect, test } from '@playwright/test';
import { signInWithSso } from './helpers';

/**
 * Pixel baselines for the two areas the Material MDC migration must keep identical: the toolbar and
 * the amount input with its `$` prefix. Every other MDC visual change is accepted (see BASELINE.md).
 */
test.describe('visual fidelity', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/payments');
    await signInWithSso(page);
  });

  test('toolbar', async ({ page }) => {
    await expect(page.locator('.app-bar')).toHaveScreenshot('credit-card-portal-toolbar.png');
  });

  test('amount input with currency prefix', async ({ page }) => {
    const amount = page.locator('mat-form-field').filter({ has: page.getByLabel('Amount') });
    await expect(amount).toHaveScreenshot('credit-card-portal-amount-input.png');
  });
});
