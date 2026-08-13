# Migration notes

Angular 14 → Angular 18 exercise. Current state: **Angular 15 on MDC-based Angular Material**
(Phase 1, KAN-2; Phase 1b, KAN-3). Nothing imports a `legacy-*` entry point any more, so the
Angular 17 phase — which deletes them — is unblocked.

## Phase 1b (KAN-3): Material MDC migration

- `ng generate @angular/material:mdc-migration` for button, card, form-field, input, select and
  progress-spinner; the aliased `MatLegacy*` imports are gone. Rollback tag: `pre-mdc`.
- `boa-theme.scss`: `mat.core()` / `mat.all-component-typographies()` /
  `mat.all-component-themes()`, and the typography config uses MDC level names. Legacy `$input`
  has no MDC equivalent — input text now comes from `body-1`, which is set to the old input level
  (16px/26px/400).
- The schematic's dual legacy+MDC includes, `appearance="outlined"` on `<mat-card>` (legacy cards
  were elevated) and the reformatted inline `styles` blocks were reverted; the only hand-written
  remediation left is the currency prefix. `matPrefix` had to become `matTextPrefix` so MDC treats
  `$` as a text prefix, and the theme restores the 16px leading padding MDC drops in that case.
- Visual deltas that could not be styled away: MDC components are ~8px shorter at density 0, so the
  toolbar and amount-field pixel baselines in `e2e/*-snapshots/` were recaptured. Everything else
  (navy toolbar, filled navy primary button, outlined secondary, elevated white cards) matches.
- `boa-button.component.spec.ts` asserts on Material's own class names, which MDC renames:
  `mat-raised-button` → `mat-mdc-raised-button`, `mat-stroked-button` → `mat-mdc-outlined-button`.
- Bundles grew ~56 kB raw per app (`styles.css` 98 kB → 123 kB): `mat.all-component-themes()` emits
  more CSS than the legacy mixins did. Still far inside the 1 MB budget.

## Phase 1 (KAN-2): Angular 15 core upgrade

- `ng update @angular/core@15 @angular/cli@15 @angular-eslint/schematics@15`, then
  `ng update @angular/cdk@15 @angular/material@15`; TypeScript 4.7 → 4.9.5. Rollback tag: `pre-ng15`.
- Material's v15 schematic rewrote every MDC-affected import to the legacy entry point with an alias
  (`MatLegacyButtonModule as MatButtonModule`), so templates and specs are untouched. `boa-theme.scss`
  moved to `mat.legacy-core()` / `mat.all-legacy-component-themes()` / `all-legacy-component-typographies()`.
- The apps' `no-restricted-imports` guard now also blocks `@angular/material/legacy-button` and
  `@angular/material/legacy-card` so applications still have to go through `boa-*` wrappers.
- CLI migrations deleted the default-matching `.browserslistrc` files, dropped the obsolete
  `require` calls in each `test.ts`, and set `target`/`useDefineForClassFields` in `tsconfig.json`.
- Production bundles grew ~35 kB raw per app (legacy Material ships alongside MDC styles); still far
  inside the 1 MB budget.

## Resolved: the planted `boa-button` legacy dependency

`libs/boa-design-system/src/lib/boa-button/boa-button.module.ts` used to import the **pre-MDC**
button (`MatButtonModule` from `@angular/material/button` on Angular 14, rewritten to
`MatLegacyButtonModule` from `@angular/material/legacy-button` by Material 15's update schematic).
Material 17 deletes those entry points, so KAN-3 moved the wrapper to the MDC button; both
applications still only see `<boa-button>` (enforced by an ESLint `no-restricted-imports` rule in
each app, which also blocks the legacy paths).

## Other work an Angular 18 migration will surface

Not planted deliberately, but real and worth discovering:

- **NgModule-based architecture**: every feature is declared in the app's `AppModule`; Angular 18
  favours standalone components and `provideRouter`.
- **Class-based route guards**: `BoaAuthGuard implements CanActivate` is deprecated in favour of
  functional guards.
- **Bootstrap path**: `platformBrowserDynamic().bootstrapModule()` and `zone.js` polyfill wiring.
- **Toolchain**: Angular CLI builder configuration, `karma`/`jasmine` (Angular 18 defaults toward
  the application builder and other test runners), and TypeScript 4.9 (Angular 18 requires 5.4+)
  with the `@types/node@16` pin it still needs.
- **RxJS 7.5** — Angular 18 expects RxJS 7.8+.

The mocked integrations (`BoaSsoService`, `BoaAnalyticsService`, `MarketDataProviderService`) must keep
working unchanged across the migration; they are the stand-ins for internal platform dependencies.
