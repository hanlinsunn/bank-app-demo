# Migration notes

Angular 14 → Angular 18 exercise. Current state: **Angular 15** (Phase 1, KAN-2) with Angular
Material on its *legacy* (pre-MDC) entry points — the MDC swap is its own phase (KAN-3), so the
planted gap below is still intact, just spelled `legacy-*`.

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

## Planted legacy dependency: `boa-button`

`libs/boa-design-system/src/lib/boa-button/boa-button.module.ts` imports `MatLegacyButtonModule` from
`@angular/material/legacy-button` — the **pre-MDC ("legacy") button implementation** — and
`boa-button.component.ts` renders it with the `mat-raised-button` / `mat-stroked-button` /
`mat-button` attribute selectors. Both applications go through `<boa-button>` and never import the
Material button directly (enforced by an ESLint `no-restricted-imports` rule in each app).

Angular Material 15 replaced these components with MDC-based implementations and moved the originals
to `@angular/material/legacy-button` (`MatLegacyButtonModule`); Material 17 deleted the legacy entry
points entirely. So on Angular 18 this module has no direct equivalent: `boa-button` has to move to
the MDC button, and every consumer inherits the DOM, class-name, and theming changes that come with it.

On Angular 14 the same dependency was spelled `MatButtonModule` from `@angular/material/button`;
Material 15's update schematic rewrote it to the aliased legacy entry point.

## Other work an Angular 18 migration will surface

Not planted deliberately, but real and worth discovering:

- **Angular Material MDC migration** beyond the button: `boa-card` (`MatCardModule`), `boa-alert`
  (`MatIconModule`), `MatFormFieldModule` / `MatInputModule` / `MatSelectModule` in both apps.
- **Sass theming API**: `libs/boa-design-system/src/styles/boa-theme.scss` uses `mat.legacy-core()`
  and `mat.all-legacy-component-themes()` with hand-rolled palettes; the theming API and density
  model changed with MDC, and the legacy mixins are gone in Material 17.
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
