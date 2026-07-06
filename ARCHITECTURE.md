# Architecture

I‑R‑E‑S uses a **feature‑based, layered architecture**. The guiding rule:

> **UI never talks to Firebase directly.** Data flows `UI → hook → service → Firebase`, and back through typed domain models. Each layer has one job.

---

## Layers

```
 UI (pages, features/*/components)
   │  renders, handles interaction
   ▼
 Hooks (features/*/hooks.ts)           ← TanStack Query: caching, loading, retries
   │  useQuery / useMutation
   ▼
 Services (services/api/*.service.ts)  ← business logic, error normalization
   │  plain async functions
   ▼
 Firebase client (services/firebase)   ← lazy SDK singletons
```

- **Services** are framework‑agnostic async functions. They own Firestore/Storage calls, translate raw documents via **converters**, and normalize errors into a friendly `AppError`. They know nothing about React.
- **Hooks** wrap services in TanStack Query, providing caching, background refetching, optimistic updates, and `isLoading`/`isError` state. Components consume these — they never call services directly.
- **Converters** ([`services/api/converters.ts`](src/services/api/converters.ts)) are the single place that knows about the legacy raw shapes (snake_case, `"true"`/`"false"` string booleans). Everything above works with clean [domain types](src/types/index.ts).

## Folder responsibilities

```
src/
├── app/              # Composition root: providers, router, <App>
│   ├── providers/    #   AuthProvider, QueryProvider
│   ├── router.tsx    #   route table (lazy-loaded pages)
│   └── App.tsx       #   provider stack + RouterProvider
├── components/       # Shared, cross-feature components
│   └── ui/           #   the design system (Radix + Tailwind primitives)
├── features/         # Feature slices — each owns its hooks, schema, components
│   ├── account/      #   account layout context + nav
│   ├── auth/         #   sign-in dialog, user menu
│   ├── contact/      #   contact/support hooks + zod schemas
│   ├── documents/    #   document hooks, table row, status badge
│   ├── profile/      #   profile hooks + zod schema
│   └── verify/       #   verification hook
├── hooks/            # Generic reusable hooks (useAuth, useTheme, useMediaQuery…)
├── layouts/          # Route layouts (RootLayout, AccountLayout)
├── pages/            # Route entry points (one file per route, default export)
├── services/         # Data layer
│   ├── api/          #   typed service functions + converters + errors
│   └── firebase/     #   lazy Firebase SDK client
├── stores/           # Zustand client-state stores (theme, command menu)
├── constants/        # Routes, query keys, collections, nav, app config
├── lib/              # Framework-agnostic utilities (cn, hash, format, env)
├── types/            # Domain model types
└── styles/           # globals.css (design tokens + base styles)
```

## State management

State is split by nature, not lumped into one store:

| Kind | Tool | Examples |
| --- | --- | --- |
| **Server state** | TanStack Query | documents, profile, verification results |
| **Client state** | Zustand | theme preference, command‑menu open state |
| **Auth state** | React Context | current user, sign‑in/out (`AuthProvider`) |
| **URL state** | React Router | active account section, redirects |
| **Local UI state** | `useState` | dialogs, expanded rows, form drafts |

This eliminates the V1 anti‑patterns: no `window.location.reload()` to refresh data (Query invalidation instead), no manual `useState` + `useEffect` fetching, and no N+1 per‑row queries.

## Data flow example — verifying a document

```
VerifyPage
  → useVerifyFile()                    (features/verify/hooks.ts)
    → verifyFile(file)                 (services/api/documents.service.ts)
      → hashFile(file)                 (lib/hash.ts — crypto.subtle over bytes)
      → findDocumentByHash(hash)       (Firestore query, via getDb())
      → toDocumentRecord(...)          (converters: raw → domain)
  ← VerificationResult { hash, match }
VerifyPage renders the result panel
```

## Routing

`createBrowserRouter` with **route‑level code splitting** — every page is a `lazy()` chunk. Structure:

- `RootLayout` (navbar, footer, command menu, page transitions) wraps all routes.
- Public: `/`, `/verify`, `/about`, `/contact`.
- `ProtectedRoute` gates `/account/*`; `AccountLayout` renders a role‑aware sidebar and shares `{ user, profile }` with child pages via Outlet context.
- Nested account routes (`profile`, `details`, `upload`, `documents`, `authorize`, `help`) are **deep‑linkable** — replacing V1's fragile tab‑index scheme.

## Theming

Design tokens are CSS variables (HSL triplets) in [`globals.css`](src/styles/globals.css), mapped to semantic Tailwind utilities (`bg-surface`, `text-muted-foreground`). Light/dark is a `.dark` class on `<html>`; an inline script in `index.html` applies it before paint to prevent flash‑of‑wrong‑theme.

## Error handling

- **Render errors** → `ErrorBoundary` (app‑wide) and `RouteError` (per route).
- **Data errors** → services throw normalized `AppError`; hooks surface `isError`; pages show `<ErrorState onRetry>` or a toast.
- **Missing config** → the app boots in demo mode with a `ConfigBanner` instead of crashing (Firebase is lazily initialized).

## Key decisions

- **CRA → Vite** for speed, native ESM, and out‑of‑the‑box code splitting.
- **Bespoke design system over a component library** — Radix primitives + Tailwind give full control of the Linear/Vercel‑grade aesthetic without fighting a theme.
- **Web Crypto for hashing** — fixes the V1 bug where `readAsText` produced unstable hashes for binary files.
- **Security rules in‑repo** — the verification trust boundary lives in Firestore rules, not the client.
