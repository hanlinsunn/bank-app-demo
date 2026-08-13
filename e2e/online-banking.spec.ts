import { expect, test } from '@playwright/test';
import { captureAnalyticsEvents, selectOption, signInWithSso, toolbarUser } from './helpers';

test('protected route redirects to login when signed out', async ({ page }) => {
  await page.goto('/transfers');

  await expect(page).toHaveURL(/\/login\?returnUrl=%2Ftransfers$/);
  await expect(page.getByRole('button', { name: 'Sign in with BofA SSO' })).toBeVisible();
});

test('golden path: sign in, view accounts and transactions, transfer money, sign out', async ({ page }) => {
  const analytics = captureAnalyticsEvents(page);

  await page.goto('/transfers');
  await signInWithSso(page);
  await expect(page).toHaveURL(/\/transfers$/);

  await page.getByRole('link', { name: 'Accounts' }).click();
  await expect(page.getByRole('heading', { name: 'Account overview' })).toBeVisible();
  await expect(page.getByText('$8,420.17')).toBeVisible();
  await expect(page.getByText('$24,230.55')).toBeVisible();
  await expect(page.getByText('Source: mocked market-data provider integration')).toBeVisible();

  await page.getByRole('link', { name: 'Transactions' }).click();
  await expect(page.getByRole('heading', { name: 'Recent transactions' })).toBeVisible();
  await selectOption(page, 'Account', /Advantage Savings/);
  await expect(page.getByText('Interest Paid').first()).toBeVisible();

  await page.getByRole('link', { name: 'Transfer money' }).click();
  await selectOption(page, 'From', /Advantage Plus Banking/);
  await selectOption(page, 'To', /Advantage Savings/);
  await page.getByLabel('Amount').fill('250');
  await page.getByRole('button', { name: 'Submit transfer' }).click();

  const receipt = page.getByText(/\$250\.00 scheduled\. Confirmation TRF-\d+\./);
  await expect(receipt).toBeVisible();

  await page.getByRole('button', { name: 'Sign out' }).click();
  await expect(page).toHaveURL(/\/login$/);
  await expect(toolbarUser(page)).toBeHidden();

  expect(analytics).toEqual(
    expect.arrayContaining(['login_success', 'account_viewed', 'transfer_started', 'transfer_submitted']),
  );
});
