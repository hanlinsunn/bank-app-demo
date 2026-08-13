import { expect, Locator, Page } from '@playwright/test';

/** The signed-in customer name in the toolbar (the login page also mentions the name in its hint). */
export function toolbarUser(page: Page): Locator {
  return page.locator('.app-bar__user');
}

/** Signs in through the mocked BofA SSO button and waits for the toolbar to show the customer. */
export async function signInWithSso(page: Page): Promise<void> {
  await page.getByRole('button', { name: 'Sign in with BofA SSO' }).click();
  await expect(toolbarUser(page)).toHaveText('Alex Morgan');
}

/**
 * Opens a `mat-select` by its floating label and picks an option.
 *
 * `mat-select` renders as a combobox whose listbox lives in an overlay outside the form, so the
 * option has to be selected from the page root rather than from within the field.
 */
export async function selectOption(page: Page, label: string, optionText: string | RegExp): Promise<void> {
  // The accessible name is the label plus the selected value, which only appears once the mocked
  // account services resolve; clicking before then opens an empty panel.
  const field = page.getByRole('combobox', { name: new RegExp(`^${label}\\b`) });
  await expect(field).toHaveText(/\S/);
  await field.click();
  await page.getByRole('option', { name: optionText }).click();
  await expect(page.getByRole('listbox')).toBeHidden();
}

/** Collects `[boa-analytics]` console events emitted while the page is driven. */
export function captureAnalyticsEvents(page: Page): string[] {
  const events: string[] = [];
  page.on('console', (message) => {
    const text = message.text();
    if (text.startsWith('[boa-analytics]')) {
      events.push(text.split(' ')[1]);
    }
  });
  return events;
}
