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
  After any Playwright version bump (each Angular major tends to bring one) the browser binary is
  missing and every spec fails with `browserType.launch: Executable doesn't exist at
  .../chromium_headless_shell-<build>/...`. Fix with `npx playwright install chromium` once, then rerun.

## Auth
- No credentials/secrets needed. All routes except `/login` are behind `BoaAuthGuard`; hitting one signed out redirects to `/login?returnUrl=...`.
- Click **Sign in with BofA SSO** → signs in demo user "Alex Morgan" (demo-user-001), MFA always succeeds. Session lives in `localStorage`; clear it (or click **Sign out** in the toolbar) to retest the guard.
- The two apps have separate origins (:4200 / :4201) so each needs its own sign-in.
- **Before a regression run, sign out of both origins first.** The `localStorage` session survives dev-server
  restarts and branch switches, so loading `localhost:420x` while still authenticated skips `/login`
  entirely and a click where the SSO button *used to be* silently hits empty page background. The tell is
  a `boa-analytics` console with `account_viewed` but **no** `login_success` — if you see that, sign out
  from the toolbar and click **Sign in with BofA SSO** again so the journey is genuinely exercised.

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
- Angular 17 (`ng update` 16→17, Material 17.3) required **no** pixel-baseline updates: the four
  Angular-15-era MDC snapshots in `e2e/*-snapshots/` still match, so a visual diff after a Material
  bump is a real regression signal rather than expected churn.
- `ng update` to 17 also renames `browserTarget`→`buildTarget` in `angular.json`. Verify the DOM shows
  `ng-version="17.x"`; a stale `16.x` means the dev server was not restarted after the upgrade.
- Angular 18 (`ng update` 17→18, Material 18.2): Material's schematic renames the M2 theming API in
  `boa-theme.scss` (`mat.define-palette` → `mat.m2-define-palette`, `define-typography-config`/`-level`
  → `m2-*`, `define-light-theme` → `m2-define-light-theme`, `mat.$red-palette` → `mat.$m2-red-palette`).
  Values are unchanged, so — like 17 — it required **no** pixel-baseline updates. Verify the DOM shows
  `ng-version="18.x"`.

## Expected non-issues (do not report as regressions)
- DevTools **Issues** panel shows a few `Incorrect use of <label for=FORM_ELEMENT>` entries on any page with
  `mat-form-field` + `mat-select`. This comes from Material's own markup, is not a console error,
  and is present across versions. Judge console health by red **Console** errors, not the Issues badge.
- The console always logs `[webpack-dev-server]` and `Angular is running in development mode` info lines.
- ESLint's typed rules run against `apps/<app>/tsconfig.lint.json` (not `tsconfig.app.json`), because
  `environment.prod.ts` reaches the build only through `fileReplacements`. Putting it in the build
  tsconfig instead makes every dev serve log `environment.prod.ts is part of the TypeScript compilation
  but it's unused`; leaving it out of both makes `npm run lint` fail on `@typescript-eslint` 7+.

## Regression passes after an RxJS bump
- Every mocked service emits via `of(...).pipe(delay(300))`, so an RxJS bump (e.g. 7.5 → 7.8) touches
  every async surface. A page screenshot alone is weak evidence: the async-subscription failure mode
  renders a control that *looks* populated but has zero options. Cover, at minimum, the account tiles,
  the transaction lists, the market summary on `/account-overview`, and **open** each `mat-select`
  (`/transactions` account picker, `/transfers` From+To, `/payments` Pay-from) to confirm the option
  lists materialize; on `/transactions` also switch accounts and confirm the rows change.
- rxjs ~7.8 + `@types/node` ^20 on Angular 18 needed no source changes and produced no runtime
  regressions or console errors.

## Known gotcha: empty mat-select
- Any component exposing options as a **getter** returning a fresh Observable (e.g. `get accountOptions$() { return this.accounts$.pipe(map(...)) }`) combined with `*ngFor="let o of options$ | async"` will render **zero options** because the `async` pipe re-subscribes on every change-detection cycle and the mocked services have a 300 ms `delay()`. The mat-select then shows no value and appears not to open.
- Symptom to look for: `<mat-select class="... mat-mdc-select-empty" ng-reflect-value="chk-1234">` with no `mat-option` and no `.cdk-overlay-pane` after a click.
- Fix pattern: assign the observable once in `ngOnInit` (as `transfers.component.ts` does) instead of using a getter.

## Devin Secrets Needed
- None.
