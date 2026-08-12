# Migration notes (Angular 14 baseline)

This repository is the **pre-migration** state for an Angular 14 → Angular 18 exercise. Do not
modernize it. The planted gap below must stay exactly as it is.

## Planted legacy dependency: `boa-button`

`libs/boa-design-system/src/lib/boa-button/boa-button.module.ts` imports `MatButtonModule` from
`@angular/material/button` — the **pre-MDC ("legacy") button implementation** in Angular Material 14 —
and `boa-button.component.ts` renders it with the `mat-raised-button` / `mat-stroked-button` /
`mat-button` attribute selectors. Both applications go through `<boa-button>` and never import the
Material button directly (enforced by an ESLint `no-restricted-imports` rule in each app).

Angular Material 15 replaced these components with MDC-based implementations and moved the originals
to `@angular/material/legacy-button` (`MatLegacyButtonModule`); Material 17 deleted the legacy entry
points entirely. So on Angular 18 this module has no direct equivalent: `boa-button` has to move to
the MDC button, and every consumer inherits the DOM, class-name, and theming changes that come with it.

### Why the requirements doc's exact import is not used

The original requirements ask `boa-button` to import `MatLegacyButtonModule` from
`@angular/material/legacy-button`. That entry point **does not exist in Angular Material 14** — it was
introduced in Material 15 as part of the MDC migration. Installing Material 15 against Angular 14
fails to compile (`TS2707: Generic type 'ɵɵComponentDeclaration' requires between 7 and 8 type
arguments`), because Material 15's partial-Ivy metadata targets a newer compiler.

Staying on Angular 14 (a hard requirement of the doc) therefore means using the pre-MDC button, which
is the Angular 14 spelling of the same legacy dependency and produces the same migration gap. This was
confirmed with the requester before implementation.

## Other work an Angular 18 migration will surface

Not planted deliberately, but real and worth discovering:

- **Angular Material MDC migration** beyond the button: `boa-card` (`MatCardModule`), `boa-alert`
  (`MatIconModule`), `MatFormFieldModule` / `MatInputModule` / `MatSelectModule` in both apps.
- **Sass theming API**: `libs/boa-design-system/src/styles/boa-theme.scss` uses `mat.core()` and
  `mat.all-component-themes()` with hand-rolled palettes; the theming API and density model changed
  after 14.
- **NgModule-based architecture**: every feature is declared in the app's `AppModule`; Angular 18
  favours standalone components and `provideRouter`.
- **Class-based route guards**: `BoaAuthGuard implements CanActivate` is deprecated in favour of
  functional guards.
- **Bootstrap path**: `platformBrowserDynamic().bootstrapModule()` and `zone.js` polyfill wiring.
- **Toolchain**: Angular CLI 14 builder configuration, `karma`/`jasmine` (Angular 18 defaults toward
  the application builder and other test runners), `@angular-eslint` 14, TypeScript 4.7 (Angular 18
  requires 5.4+), and the `@types/node@16` pin that TypeScript 4.7 needs.
- **RxJS 7.5** — Angular 18 expects RxJS 7.8+.

The mocked integrations (`BoaSsoService`, `BoaAnalyticsService`, `MarketDataProviderService`) must keep
working unchanged across the migration; they are the stand-ins for internal platform dependencies.
