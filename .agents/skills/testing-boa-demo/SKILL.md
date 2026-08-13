---
name: testing-boa-demo
description: How to run and manually test the BoA Angular demo monorepo (online-banking :4200, credit-card-portal :4201), including the Angular/Material upgrade phases.
---

# Testing the BoA Angular demo monorepo

## Running
- `npm ci` (or reuse existing `node_modules`), then `npm run start:all` from the repo root.
  - online-banking → http://localhost:4200, credit-card-portal → http://localhost:4201.
  - First compile takes 30-60s; wait for `✔ Compiled successfully.` twice in the serve log before driving the browser.
- Individually: `npm run start:banking` / `npm run start:credit`.
- Other checks: `npm run build:all`, `npm test`, `npm run lint`.
- Playwright: **must** pass the config path — `npm run e2e` (= `playwright test -c e2e/playwright.config.ts`).
  Running `npx playwright test e2e/<spec>.ts` without `-c e2e/playwright.config.ts` fails with
  `page.goto: Cannot navigate to invalid URL` because the per-app `baseURL` projects are never loaded.
  To run only the pixel suites: `npx playwright test -c e2e/playwright.config.ts visual-online-banking visual-credit-card-portal`.
  Playwright reuses an already-running `start:all`, so no need to stop the dev servers first.

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

## Angular / Material version notes
- Verify the running framework version from the DOM: `<app-root ng-version="...">` in DevTools Elements.
- Since KAN-3 the design system is on the **MDC** components: plain `@angular/material/<component>`
  imports and `mat.core()` / `mat.all-component-typographies()` / `mat.all-component-themes()` in
  `libs/boa-design-system/src/styles/boa-theme.scss`. No `legacy-*` import should reappear — Material 17
  deletes those entry points. DOM class names are `mat-mdc-*` (`mat-mdc-raised-button`,
  `mat-mdc-outlined-button`, `mat-mdc-form-field`), which is what the button specs assert.
- Text prefixes/suffixes must use `matTextPrefix` / `matTextSuffix`, not `matPrefix` — with `matPrefix`
  MDC treats `$` as an icon prefix, drops the `mat-mdc-form-field-text-prefix` wrapper, and the symbol
  ends up flush against the outline.
- Visual-fidelity regression signal after any Material bump: the pixel baselines in
  `e2e/*-snapshots/*.png` were recaptured on Angular 15 + MDC. The intended look is a navy toolbar, a
  filled navy primary button, an outlined secondary button, elevated (not outlined) white cards, and an
  outlined amount field with a muted `$` prefix on the value's baseline.
- Expect `@types/node` and TypeScript to be pinned per Angular major; do not bump them independently.

## Expected non-issues (do not report as regressions)
- DevTools **Issues** panel shows a few `Incorrect use of <label for=FORM_ELEMENT>` entries on any page with
  `mat-form-field` + `mat-select`. This comes from Material's own markup, is not a console error,
  and is present across versions. Judge console health by red **Console** errors, not the Issues badge.
- The console always logs `[webpack-dev-server]` and `Angular is running in development mode` info lines.

## Known gotcha: empty mat-select
- Any component exposing options as a **getter** returning a fresh Observable (e.g. `get accountOptions$() { return this.accounts$.pipe(map(...)) }`) combined with `*ngFor="let o of options$ | async"` will render **zero options** because the `async` pipe re-subscribes on every change-detection cycle and the mocked services have a 300 ms `delay()`. The mat-select then shows no value and appears not to open.
- Symptom to look for: `<mat-select class="... mat-mdc-select-empty" ng-reflect-value="chk-1234">` with no `mat-option` and no `.cdk-overlay-pane` after a click.
- Fix pattern: assign the observable once in `ngOnInit` (as `transfers.component.ts` does) instead of using a getter.

## Devin Secrets Needed
- None.
