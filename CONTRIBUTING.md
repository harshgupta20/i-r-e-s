# Contributing

Thanks for helping improve I‑R‑E‑S. This guide covers local setup and the conventions that keep the codebase consistent.

## Setup

```bash
npm install
cp .env.example .env   # fill in Firebase config (optional for UI work — demo mode works without it)
npm run dev
```

Requires **Node 18+**.

## Before you push

All of these must pass (CI enforces them):

```bash
npm run lint        # ESLint, zero warnings
npm run typecheck   # strict TypeScript, no errors
npm run test        # Vitest
npm run build       # production build succeeds
```

`npm run format` applies Prettier.

## Conventions

### TypeScript
- **No `any`.** Model data with the domain types in `src/types`. Use `unknown` + narrowing at boundaries.
- No magic strings/numbers — put them in `src/constants`.
- Prefer `type`/`interface` exports co-located with their feature.

### Architecture (see [ARCHITECTURE.md](ARCHITECTURE.md))
- **Components never import from `services/*` or `firebase/*` directly.** Go through a hook in `features/*/hooks.ts`.
- New backend calls: add a function to the relevant `*.service.ts`, then expose it via a TanStack Query hook.
- Raw ↔ domain mapping belongs in `services/api/converters.ts` — nowhere else.

### Files & naming
- Files: `kebab-case.tsx`. Components: `PascalCase`. Hooks: `useCamelCase`.
- Pages live in `src/pages`, are **default exports**, and are lazy-loaded in `src/app/router.tsx`.
- One feature concern per folder under `src/features/<feature>`.

### Styling
- Tailwind utilities with **semantic tokens only** (`bg-surface`, not `bg-white`).
- Merge classes with `cn()`. Add reusable design-system pieces to `src/components/ui` (see [COMPONENT_GUIDE.md](COMPONENT_GUIDE.md)).

### Forms
- React Hook Form + a Zod schema (`features/<feature>/schema.ts`), rendered through the `Field` + `Input`/`Textarea` primitives.

### Accessibility
- Every interactive control is keyboard-operable and labelled. Use the design-system components — they handle focus management and ARIA.

### Commits & PRs
- Small, focused commits with clear messages.
- A PR should leave `lint`, `typecheck`, `test`, and `build` green, and include tests for new logic (services, utilities, converters).

## Security

Never commit secrets. `.env` is git-ignored. If you touch data access, review [`firestore.rules`](firestore.rules) / [`storage.rules`](storage.rules) — the client is **not** the trust boundary.
