# BoA Digital Banking — Angular 15 Demo

A small, self-contained Angular 15 monorepo that simulates a simplified Bank of America digital
banking environment: two customer-facing applications sharing one internal component library, plus
mocked SSO, analytics, and financial-data integrations.

This is an in-progress state of the Angular 14 → 18 migration: the framework and toolchain are on
v15 while Angular Material still uses the *legacy* (pre-MDC) entry points, which the MDC phase
replaces. Nothing here talks to a real backend, database, cloud service, or identity provider.

```
Online Banking ─┐
                ├─→ boa-design-system ─→ Angular Material 15 (legacy/pre-MDC) ─→ Angular 15
Credit Card Portal ─┘
        │
        └─→ integrations (SSO · analytics · market data) ─→ banking-data (mock fixtures)
```

## Applications

| App | Port | Screens |
| --- | --- | --- |
| Online Banking | 4200 | Login, Account Overview, Recent Transactions, Transfer Money |
| Credit Card Portal | 4201 | Login, Credit Card Overview, Recent Transactions, Make Payment |

Both apps consume `boa-design-system` for shared UI and the same mocked integrations, so they are two
independent consumers of one internal library — the shape of the real migration problem.

## Quick start

Requires Node.js 20 LTS (pinned in `.nvmrc`; the Angular 15 CLI prints an unsupported-engine warning
on it, which is expected and harmless) and a Chrome/Chromium install for the Karma test runner.
Node 20 is the version the Angular 16→18 migration targets, so every phase is verified on it.

```bash
npm install

npm run start:banking   # Online Banking      → http://localhost:4200
npm run start:credit    # Credit Card Portal  → http://localhost:4201
npm run start:all       # both, in parallel
```

Sign in on either app with **Sign in with BofA SSO**. The demo customer is Alex Morgan
(`demo-user-001`); MFA always succeeds and the session is kept in `localStorage`. Protected routes
redirect to `/login` until you sign in.

Open the browser console to watch the mocked analytics SDK: every tracked event is printed as
`[boa-analytics] <event> { … }`.

## Commands

```bash
npm run build:all   # production build of both apps (also: build:banking, build:credit)
npm test            # Karma/Jasmine unit tests for both apps and all three libraries
npm run lint        # ESLint (@angular-eslint) across every project
npm run e2e         # Playwright smoke + visual suite (starts both dev servers itself)
npm run e2e:ui      # the same suite in Playwright's UI mode
```

The Playwright suite lives in `e2e/` and covers both golden paths, the auth-guard redirects, the
`[boa-analytics]` events, and pixel baselines of the toolbar and the `$`-prefixed amount inputs.
First run needs `npx playwright install chromium`; refresh the pixel baselines with
`npm run e2e -- --update-snapshots`.

`npm test` runs headless Chrome. If Karma cannot find a browser, set `CHROME_BIN`, e.g.
`CHROME_BIN=$(which google-chrome) npm test`.

## Repository layout

```
boa-digital-banking/
├── apps/
│   ├── online-banking/src/app/
│   │   ├── login/                     # "Sign in with BofA SSO"
│   │   ├── account-overview/          # balances, recent activity, market summary
│   │   ├── transactions/
│   │   └── transfers/                 # mocked transfer submission
│   └── credit-card-portal/src/app/
│       ├── login/
│       ├── card-overview/             # balance, available credit, minimum payment, due date
│       ├── transactions/
│       └── payments/                  # mocked payment submission
├── libs/
│   ├── boa-design-system/src/
│   │   ├── lib/boa-button/
│   │   ├── lib/boa-card/
│   │   ├── lib/boa-alert/
│   │   ├── lib/boa-account-tile/
│   │   └── styles/boa-theme.scss      # the single Material theme both apps import
│   ├── integrations/src/lib/
│   │   ├── authentication/boa-sso.service.ts
│   │   ├── analytics/boa-analytics.service.ts
│   │   └── financial-data/market-data-provider.service.ts
│   └── banking-data/src/lib/          # account, transaction, transfer, credit-card services
├── shared/models/                     # account, transaction, user models
├── angular.json
└── package.json
```

Every cross-project import goes through a workspace path alias, so the dependency graph is explicit:

| Alias | Contents |
| --- | --- |
| `@boa/design-system` | `BoaDesignSystemModule` and the `boa-*` components |
| `@boa/integrations` | `BoaSsoService`, `BoaAuthGuard`, `BoaAnalyticsService`, `MarketDataProviderService` |
| `@boa/banking-data` | mocked account/transaction/transfer/credit-card services and fixtures |
| `@boa/models` | shared `Account`, `Transaction`, `User` models |

## Shared component library

`boa-design-system` wraps Angular Material rather than re-implementing UI, and the apps use the
wrappers only:

- `<boa-button>` — Material button (`primary`, `secondary`, `ghost` variants)
- `<boa-card>` — Material card with a heading/subheading slot
- `<boa-alert>` — inline status message with a Material icon (`info`/`success`/`warning`/`error`)
- `<boa-account-tile>` — account nickname, masked number, and formatted balance

An ESLint `no-restricted-imports` rule in both apps fails the build if an application imports
`@angular/material/button`, `@angular/material/card`, or their `legacy-` equivalents directly.

## Mocked integrations

| Integration | Service | Behaviour |
| --- | --- | --- |
| SSO / MFA | `BoaSsoService` | `login()`, `logout()`, `isAuthenticated()`, `verifyMfa()`; signs in Alex Morgan immediately, MFA always succeeds, session in `localStorage`, routes protected by `BoaAuthGuard` |
| Analytics | `BoaAnalyticsService` | `track(eventName, properties?)` logs to the console; emits `login_success`, `account_viewed`, `transfer_started`, `transfer_submitted`, `credit_card_payment_started`, `credit_card_payment_submitted` |
| Financial data | `MarketDataProviderService` | `getMarketSummary()` returns static S&P 500 / 10-Year Treasury / Dow data via RxJS with a short delay |

## Mock banking data

All figures come from TypeScript fixtures in `libs/banking-data`:

- Checking ••1234 — $8,420.17 · Savings ••5678 — $24,230.55
- ~37 deposit transactions across the two accounts (payroll, rent, utilities, Zelle, ATM, interest, tax refund) and 22 card transactions, newest first
- Credit Card ••9012 — balance $1,248.23, available credit $8,751.77, minimum payment $45.00, due Aug 28
- Market summary: indices, BAC, Treasury yield, gold, crude, FX pairs, VIX, prime rate, and the 30-year mortgage rate
