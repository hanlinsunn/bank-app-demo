# Angular 14 baseline (Phase 0)

Verified pre-migration state for the Angular 14 → 18 migration. Rollback point: tag
`pre-migration-baseline` (commit `fde7b25`).

## Runtime

| | |
| --- | --- |
| Node | 20.18.1 (pinned in `.nvmrc`) |
| npm | 10.8.2 |
| Angular CLI | 14.2.13 (reports Node 20 as "Unsupported" — expected, builds/tests/lint all pass) |
| Angular | 14.3.0 · Angular Material 14.2.7 · TypeScript 4.7 · RxJS 7.5 |

Node 20 LTS satisfies Angular 17 (`^18.13.0 || >=20.9.0`) and Angular 18
(`^18.19.1 || ^20.11.1 || >=22.0.0`), so the whole migration runs on one runtime.

`@types/node` stays pinned to `^16` until TypeScript 5.2+ lands in the Angular 17 phase; newer
Node types do not compile under TypeScript 4.7.

## Verification gate

| Check | Result |
| --- | --- |
| `npm ci` | pass |
| `npm run build:all` | pass (both apps, production config, budgets green) |
| `npm test` | pass — 39 specs: online-banking 10, credit-card-portal 5, boa-design-system 8, integrations 10, banking-data 6 |
| `npm run lint` | pass — all five projects |
| `npm run start:all` | both apps serve (4200 / 4201) |
| Online Banking golden path | pass — unauthenticated redirect → SSO login → overview → transactions → $250 transfer → sign out |
| Credit Card Portal golden path | pass — login → card overview → transactions → $45 payment |
| `[boa-analytics]` console events | pass |
| Visual spot-check | captured as the reference set below |

## Production bundle sizes (baseline for budget comparison)

| App | Initial total (raw) | Initial total (transfer) | main.js (raw) | styles.css (raw) |
| --- | --- | --- | --- | --- |
| online-banking | 674.76 kB | 149.79 kB | 556.33 kB | 84.30 kB |
| credit-card-portal | 669.81 kB | 148.80 kB | 551.36 kB | 84.30 kB |

Configured budgets (`angular.json`, both apps): initial warning 1 MB / error 2 MB, component
style warning 4 kB / error 8 kB.

## Visual-fidelity reference

Baseline screenshots of both apps' key screens (login, overview, transactions, transfer/payment
forms) are attached to Jira KAN-9. They are the comparison set for the Material MDC phase
(KAN-3), which changes button, card, form-field, and select DOM and class names.
