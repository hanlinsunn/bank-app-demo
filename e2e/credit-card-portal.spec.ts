import { expect, test } from '@playwright/test';
import { captureAnalyticsEvents, selectOption, signInWithSso, toolbarUser } from './helpers';

test('protected route redirects to login when signed out', async ({ page }) => {
  await page.goto('/card-overview');

  await expect(page).toHaveURL(/\/login\?returnUrl=%2Fcard-overview$/);
  await expect(page.getByRole('button', { name: 'Sign in with BofA SSO' })).toBeVisible();
});

test('golden path: sign in, view card and transactions, make a payment', async ({ page }) => {
  const analytics = captureAnalyticsEvents(page);

  await page.goto('/card-overview');
  await signInWithSso(page);

  await expect(page.getByRole('heading', { name: 'Credit card overview' })).toBeVisible();
  await expect(page.getByText('$1,248.23')).toBeVisible();
  await expect(page.getByText('$8,751.77')).toBeVisible();
  await expect(page.getByText('Minimum payment due Aug 28')).toBeVisible();

  await page.getByRole('link', { name: 'Transactions' }).click();
  await expect(page.getByRole('heading', { name: 'Recent transactions' })).toBeVisible();

  await page.getByRole('link', { name: 'Make a payment' }).click();
  await selectOption(page, 'Pay from', /Advantage Plus Banking/);
  await page.getByLabel('Amount').fill('45');
  await page.getByRole('button', { name: 'Submit payment' }).click();

  await expect(page.getByText(/\$45\.00 posted\. Confirmation PMT-\d+\./)).toBeVisible();

  await page.getByRole('button', { name: 'Sign out' }).click();
  await expect(page).toHaveURL(/\/login$/);
  await expect(toolbarUser(page)).toBeHidden();

  expect(analytics).toEqual(
    expect.arrayContaining([
      'login_success',
      'account_viewed',
      'credit_card_payment_started',
      'credit_card_payment_submitted',
    ]),
  );
});
