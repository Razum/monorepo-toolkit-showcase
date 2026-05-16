# Monorepo toolkit showcase (Turborepo + Syncpack)

Teaching/demo repository that showcases **npm workspaces**, **Turborepo task orchestration + caching**, **Syncpack dependency consistency rules**, and **shared TypeScript packages** consumed via **compiled `dist/` outputs** (not `src/` imports from apps).

## Structure

```txt
apps/
  api/     Hono API — typed JSON responses via @repo/types, utilities from @repo/toolkit
  spa/     Vite + React — UI showcase + debouncing demos
  ssr/     Next.js (App Router) — SSR data + client island using shared packages

packages/
  types/    @repo/types — shared contracts (User, Product, ApiResponse<T>, HealthStatus, …)
  toolkit/  @repo/toolkit — debounce() + useDebouncedValue (subpath exports: /utils, /hooks)
  ui/       @repo/ui — Button, Card, Badge (built with tsdown → dist/)
```

### Dependency graph (high level)

- `spa` → `ui`, `toolkit`, `types`
- `ssr` → `ui`, `toolkit`, `types`
- `api` → `toolkit`, `types`
- `ui` → `types`

Turborepo uses `build` → `dependsOn: ["^build"]` so upstream packages build before downstream apps.

## Prereqs

- Node **>= 18**
- npm **9+** (this repo uses `packageManager: npm@9.8.1`)

## Install

```bash
npm install
```

## Common commands

| Command                   | What it does                                                     |
| ------------------------- | ---------------------------------------------------------------- |
| `npm run dev`             | Runs `turbo run dev` (multiple dev servers via Turborepo)        |
| `npm run build`           | Runs `turbo run build` with upstream `^build` ordering + caching |
| `npm run lint`            | Runs `turbo run lint`                                            |
| `npm run typecheck`       | Runs `turbo run typecheck`                                       |
| `npm run clean`           | Runs `turbo run clean` in workspaces                             |
| `npm run syncpack:list`   | Lists dependency versions across the monorepo                    |
| `npm run syncpack:lint`   | Enforces Syncpack rules (see `.syncpackrc.json`)                 |
| `npm run syncpack:fix`    | Applies Syncpack fixes **when you choose to align versions**     |
| `npm run syncpack:format` | Formats manifests according to Syncpack rules                    |

**Demo note:** `syncpack:lint` is expected to exit non-zero in this repo (for example the intentional `axios` ban + intentional cross-package version drift).

### Turborepo “live demo” scripts

These wrap useful Turbo CLI flags:

| Command                   | What it does                                                                   |
| ------------------------- | ------------------------------------------------------------------------------ |
| `npm run build:graph`     | `turbo run build --graph` — dependency/task graph output                       |
| `npm run build:dry`       | `turbo run build --dry-run` — prints planned execution without running builds  |
| `npm run build:summarize` | `turbo run build --summarize` — prints summary timings/cache stats after a run |

Equivalent forms:

```bash
npx turbo run build --graph
npx turbo run build --dry-run
npx turbo run build --summarize
```

## Turborepo notes

### Task pipeline + cache fingerprints

[`turbo.json`](turbo.json) declares tasks (`build`, `dev`, `lint`, `typecheck`, `clean`).

- **`build`** depends on **`^build`**, meaning workspace dependencies build first — this is the core monorepo “graph execution” demo.
- **Outputs** are declared so Turborepo can cache artifacts (examples include `.next/**`, `dist/**`, `build/**`).
- **`typecheck`** uses narrower `inputs` so unrelated file changes don’t invalidate typechecks unnecessarily.

### Demonstrating caching locally

Run:

```bash
npm run build
npm run build
```

On the second run, Turbo should report cache hits for unchanged packages/apps.

### Package consumption model

Apps depend on workspace packages via `"@repo/…": "*"` and import through **`package.json#exports`** pointing at **`dist/`** after `npm run build`.

## Syncpack notes

Configuration lives in [`.syncpackrc.json`](.syncpackrc.json).

This demo intentionally includes **policy examples** you can talk through:

- **Banned dependency**: `axios` is banned, but `apps/spa` still lists it to show how `syncpack:lint` catches violations.
- **Workspace pinning**: `@repo/*` packages are expected to use npm workspace-friendly specifiers.
- **Grouped consistency rules**: React / TypeScript / ESLint-related packages include intentional drift across apps/packages so `syncpack:list` / `syncpack:lint` produce teaching-friendly output.

> Tip: this repo is optimized for demos — **don’t “fix” drift automatically** unless you want to remove the teaching signal.

## Package builds (`tsdown`)

Shared libraries [`packages/ui`](packages/ui), [`packages/toolkit`](packages/toolkit), and [`packages/types`](packages/types) use [`tsdown`](https://github.com/rolldown/tsdown) to emit **`dist/`** + **`.d.ts`** declarations.

## Troubleshooting

### “Cannot find module `@repo/...` types/output”

Run a build so `dist/` exists:

```bash
npm run build
```

During local iteration you can also run package watchers (`packages/*/npm run dev`) depending on your workflow.
