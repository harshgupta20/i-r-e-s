<div align="center">

# I‑R‑E‑S

### Prove your documents are authentic on the internet.

I‑R‑E‑S fingerprints documents with SHA‑256, publishes a tamper‑evident record, and lets **anyone** verify authenticity in seconds — no middlemen, no guesswork.

`React 18` · `TypeScript` · `Vite` · `Tailwind` · `Radix UI` · `TanStack Query` · `Firebase`

</div>

---

## ✨ What it does

- **Verify** — drop any file into the public verifier. It's hashed **locally in your browser**; a matching fingerprint confirms the document is genuine and shows who published it.
- **Publish** — signed‑in members upload a document; its SHA‑256 fingerprint + metadata are registered.
- **Authorize** — users with the `authorizer` role review submissions and vouch for authenticity, recording an immutable verification record.

Because the fingerprint is derived from the file's exact bytes, changing a single byte changes the fingerprint — so forgeries simply don't match.

## 🧱 Tech stack

| Concern | Choice |
| --- | --- |
| Build tool | **Vite 5** (migrated from Create React App) |
| Language | **TypeScript** (strict) |
| UI | **Tailwind CSS** + **Radix UI** primitives (a bespoke design system) |
| Animation | **Framer Motion** |
| Server state | **TanStack Query** |
| Client state | **Zustand** (theme, command menu) |
| Forms | **React Hook Form** + **Zod** |
| Backend | **Firebase** — Auth + Firestore |
| File storage | **Cloudinary** — unsigned uploads (no server) |
| Icons / toasts | **lucide-react** / **sonner** |
| Testing | **Vitest** + Testing Library |

## 🚀 Getting started

```bash
# 1. Install dependencies (Node 18+)
npm install

# 2. Configure environment
cp .env.example .env
#    then fill in your Firebase web config (and, optionally, EmailJS)

# 3. Run the dev server
npm run dev
```

The app runs in **demo mode** without Firebase config — the UI is fully browsable, and a banner explains that data features are disabled until `.env` is filled in.

### Environment variables

All client env vars are prefixed `VITE_` (see [`.env.example`](.env.example)):

| Variable | Purpose |
| --- | --- |
| `VITE_FIREBASE_*` | Firebase web SDK config (required for auth/data) |
| `VITE_CLOUDINARY_CLOUD_NAME` / `VITE_CLOUDINARY_UPLOAD_PRESET` | Cloudinary file storage (required for uploads) |
| `VITE_EMAILJS_*` | EmailJS config for the contact form (optional) |

> **Cloudinary setup (one-time, no server):** in the Cloudinary console go to
> **Settings → Upload → Upload presets**, add a preset with **Signing mode: Unsigned**,
> then put your cloud name and the preset name in `.env`. Uploads post directly from the browser.

> Firebase **web** keys are public identifiers — safe to ship to the browser. Real security is enforced by the [Firestore & Storage rules](#-security) in this repo, not by hiding the keys.

## 📜 Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build for production (`dist/`) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | ESLint (zero warnings enforced) |
| `npm run typecheck` | TypeScript, no emit |
| `npm run test` | Run the Vitest suite |
| `npm run format` | Prettier |

## 🔐 Security

- **Secrets** — `.env` is git‑ignored. If real keys were committed previously, rotate them and scrub history (see below).
- **Trust boundary** — [`firestore.rules`](firestore.rules) enforce that only `authorizer` accounts can change a document's verification status, uploads always start unverified, and users can't self‑promote their role. File uploads go to Cloudinary via an unsigned preset (scope it to a folder / limit formats in the Cloudinary console).
- **Hashing** — fingerprints are computed with the Web Crypto API over the file's raw bytes (`crypto.subtle`), so they're correct for binary files like PDFs and images.

### Rotating leaked keys (one‑time)

```bash
# In the Firebase console: regenerate the web API key / restrict it by referrer.
# Then scrub .env from git history (choose one):
pipx run git-filter-repo --path .env --invert-paths     # recommended
# or: java -jar bfg.jar --delete-files .env && git reflog expire --expire=now --all && git gc --prune=now
```

## 🚢 Deployment

The app is a static SPA. With the Firebase CLI:

```bash
npm run build
firebase deploy --only hosting,firestore:rules
```

`firebase.json` serves `dist/`, rewrites all routes to `index.html`, applies immutable caching to hashed assets, and deploys the security rules.

## 📚 More docs

- [`ARCHITECTURE.md`](ARCHITECTURE.md) — folder structure, layering, and data flow
- [`COMPONENT_GUIDE.md`](COMPONENT_GUIDE.md) — the design system
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — conventions and workflow
- [`AUDIT.md`](AUDIT.md) — the V1 → V2 audit that motivated this rebuild
