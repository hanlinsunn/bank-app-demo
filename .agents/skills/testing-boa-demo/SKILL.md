---
name: testing-boa-demo
description: How to run and manually test the BoA Angular 14 demo monorepo (online-banking :4200, credit-card-portal :4201).
---

# Testing the BoA Angular 14 demo monorepo

## Running
- `npm ci` (or reuse existing `node_modules`), then `npm run start:all` from the repo root.
  - online-banking → http://localhost:4200, credit-card-portal → http://localhost:4201.
  - First compile takes 30-60s; wait for `✔ Compiled successfully.` twice in the serve log before driving the browser.
- Individually: `npm run start:banking` / `npm run start:credit`.

## Auth
- No credentials/secrets needed. All routes except `/login` are behind `BoaAuthGuard`; hitting one signed out redirects to `/login?returnUrl=...`.
- Click **Sign in with BofA SSO** → signs in demo user "Alex Morgan" (demo-user-001), MFA always succeeds. Session lives in `localStorage`; clear it (or click **Sign out** in the toolbar) to retest the guard.
- The two apps have separate origins (:4200 / :4201) so each needs its own sign-in.

## Key UI paths
- Online banking toolbar: Accounts (`/account-overview`), Transactions (`/transactions`), Transfer money (`/transfers`).
- Credit portal toolbar: Card overview (`/card-overview`), Transactions (`/transactions`), Make a payment (`/payments`).
- Transfer defaults checking→savings $250 → green "Transfer submitted … TRF-######".
- Payment defaults $45 from checking → green "Payment submitted … PMT-######".

## Analytics verification
- The mocked SDK (`libs/integrations/.../boa-analytics.service.ts`) uses `console.info('[boa-analytics]', event, props)`.
- Open DevTools Console and type `boa-analytics` in the filter box. Expect `login_success`, `account_viewed`, `transfer_started`, `transfer_submitted` (:4200) and `credit_card_payment_started`, `credit_card_payment_submitted` (:4201).

## Known gotcha: empty mat-select
- Any component exposing options as a **getter** returning a fresh Observable (e.g. `get accountOptions$() { return this.accounts$.pipe(map(...)) }`) combined with `*ngFor="let o of options$ | async"` will render **zero options** because the `async` pipe re-subscribes on every change-detection cycle and the mocked services have a 300 ms `delay()`. The mat-select then shows no value and appears not to open.
- Symptom to look for: `<mat-select class="... mat-select-empty" ng-reflect-value="chk-1234">` with no `mat-option` and no `.cdk-overlay-pane` after a click.
- Fix pattern: assign the observable once in `ngOnInit` (as `transfers.component.ts` does) instead of using a getter.

## Devin Secrets Needed
- None.
