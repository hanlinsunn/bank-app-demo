import { defineConfig, devices } from '@playwright/test';

export const BANKING_URL = 'http://localhost:4200';
export const CREDIT_URL = 'http://localhost:4201';

/**
 * Golden-path smoke suite for both apps. Selectors are role- and text-based so the suite keeps
 * working across the Angular Material MDC migration, which rewrites the internal DOM and the
 * `.mat-*` class names.
 */
export default defineConfig({
  testDir: '.',
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 1 : 0,
  workers: process.env['CI'] ? 1 : undefined,
  reporter: process.env['CI'] ? [['list'], ['html', { open: 'never' }]] : 'list',
  timeout: 60_000,
  expect: { timeout: 15_000 },
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    ...devices['Desktop Chrome'],
  },
  projects: [
    { name: 'online-banking', testMatch: /online-banking\.spec\.ts/, use: { baseURL: BANKING_URL } },
    { name: 'credit-card-portal', testMatch: /credit-card-portal\.spec\.ts/, use: { baseURL: CREDIT_URL } },
  ],
  webServer: [
    {
      command: 'npm run start:banking',
      url: BANKING_URL,
      cwd: '..',
      timeout: 180_000,
      reuseExistingServer: !process.env['CI'],
    },
    {
      command: 'npm run start:credit',
      url: CREDIT_URL,
      cwd: '..',
      timeout: 180_000,
      reuseExistingServer: !process.env['CI'],
    },
  ],
});
