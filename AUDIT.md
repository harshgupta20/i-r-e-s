# I‑R‑E‑S — Phase 1 Audit Report

> **Owner:** Frontend Platform
> **Scope:** Full-repository audit prior to the V2.0 rebuild.
> **Verdict:** Functionally interesting product, but the implementation is a prototype. It needs a greenfield rebuild, not a patch.

---

## 1. What the product actually is

I‑R‑E‑S is a **document authenticity platform**. The mental model:

- A user signs in with Google, completes a profile, and **uploads a document**. The app computes a **SHA‑256 hash of the file** and stores the hash + a Storage download URL + metadata in Firestore.
- An **Authorizer** (elevated role) reviews uploaded documents and flips their `verified_status`.
- **Anyone** can drop a file into *Verify Docs*; the app hashes it, looks the hash up in Firestore, and reports whether it is a known, verified document and who uploaded it.

It is "blockchain-inspired" in the marketing copy but is in practice a **Firestore hash-lookup** system.

### Roles & surfaces
| Role | Surfaces |
|------|----------|
| Anonymous | Home, About, Contact, Verify Docs |
| `user` | + My Account → Profile, Upload Documents, History, Contact, Personal Information, Help Center |
| `authorizer` | + My Account → Authorize Documents (replaces Upload/History) |

### Firestore data model (as-built)
- `users/{uid}` — name, email, age, college_name, roll_number, social_profile, `verified_status` (`"user"｜"authorizer"`), detail_filled
- `all_docs/{autoId}` — name, email, social_link, doc_hash, doc_link, comment, `verified_status` (`"true"｜"false"`), verified_by, published_date
- `user_docs/{email}` — name, email, uid
- `user_docs/{email}/doc_history/{autoId}` — doc_link, doc_hash, published_date, verified_status, comment
- Storage: `images/{hash}` — the raw uploaded file

---

## 2. What's good (keep the ideas, not the code)

- **The product concept is solid** and demoable — hash-based verification is a clean, understandable value prop.
- **Auth is wired correctly** — Google popup via Firebase, `useAuthState` gate on the account route.
- **The data model is basically right** — separating `all_docs` (global registry) from `user_docs/{email}/doc_history` (per-user view) is a reasonable denormalization.
- **Env-based Firebase config** exists (`process.env.REACT_APP_*`) — the intent to keep secrets out of code was there…

---

## 3. What's bad (blocking)

### 🔴 Security
1. **`.env` is committed to git** with live Firebase keys (`git ls-files` confirms it's tracked). Must be purged from history and rotated.
2. **No trust boundary.** `verified_status` is flipped by a **client-side `updateDoc`**. Anyone with the web keys can mark any document "verified." Verification integrity — the entire point of the product — lives in the client. Needs Firestore Security Rules + ideally a callable/Cloud Function.
3. **Hard-coded EmailJS credentials** (`service_…`, `template_…`, public key) inline in `Contact.jsx` and `ConactPage.jsx`.

### 🔴 Correctness
4. **The hash is computed with `FileReader.readAsText()`.** For binary files (PDF, images — the actual use case) `readAsText` is lossy and encoding-dependent, so **the same file can produce different hashes**. The core feature is unreliable. Must use `readAsArrayBuffer` + `crypto.subtle.digest`.
5. **State refresh via `window.location.reload()`** after verifying a document (`DocsTable.jsx:88`).
6. **Stringly-typed booleans** (`verified_status === "true"`) and **loose `==` equality** throughout.
7. **Module-scoped mutable state** inside components (`let hashValue = []`, `var imageURL = ""` in `UploadDocs.jsx`) — data races; `imageURL` is reassigned but React never re-reads it reliably.
8. `useEffect(… , [])` fetchers reference `user`/`db` without deps and without null-guards — crashes if `user` is briefly undefined.

### 🔴 Architecture
9. **No layering.** Firestore queries, business logic, and JSX are interleaved in every page. No service layer, no data hooks, no types.
10. **Duplicated logic**: file-hashing (Upload + Verify), EmailJS send (Contact + ContactPage), MUI `Box`/`TextField` form scaffolding copy-pasted ~6×.
11. **Dead / stub code**:
    - `components/VerifyDocDetailList.jsx` — **0 bytes**.
    - `pages/OrganisationProfile.jsx` — returns `<div>OrganisationProfile</div>`.
    - `pages/common/Project.jsx` — debug page dumping `uid`/email; route commented out.
    - **Nested routes** in `App.jsx` (`user-profile`, `org-profile`, `personal-detail`) are never rendered — `MyAccount` uses MUI `Tabs`, not `<Outlet>`. Pure dead routing.
    - `pages/common/Contact.jsx` **and** `common/ConactPage.jsx` (note the typo) are two separate contact forms.
    - `src/img/*` duplicates `public/assets/img/*`; commented-out EmailJS blocks in `DocsTable`.
12. **Fragile tab index math** in `MyAccount.jsx` — panel indices are computed from role (`!userRegistered ? 1 : userAuthStatus ? 2 : 3`). One of the most bug-prone patterns in the codebase.

### 🟠 State management
13. All server data is fetched ad-hoc into `useState`, never cached, and refreshed by reloading the page. **`DocsTable` fires one Firestore query *per row*** (N+1) to resolve the history doc id.
14. `react-toastify` is a **dependency but never used** — every success/error path uses `alert()`.

### 🟠 UI / UX
15. **Debug borders shipped to prod**: `border: 2px solid red/green/blue` in `Home.css`, `MyAccount.css`, `VerifyDoc.css`.
16. **Not responsive** — fixed `500px`/`560px` widths, `padding: 0 100px`, hard-coded `height: 624`/`200px` iframe.
17. **No loading, skeleton, or empty states** (best case: `<h1>No Data to Display</h1>`).
18. `alert()` for all feedback; generic MUI default theme → looks like a tutorial, not a product.
19. **Pervasive typos** in user-facing copy: "Platfrom", "Commets", "occured", "consistantly", "eligile", "submmited".

### 🟠 Accessibility
20. `<img src="" alt="">` in About; icon-only buttons without labels; non-semantic `div id="..."` layout; invalid React attrs (`frameborder`, `allowfullscreen`); missing `rel="noopener"` on some `target="_blank"` links.

### 🟠 Performance & tooling
21. **Create React App (react-scripts 5)** — unmaintained, slow, no route-level code splitting; everything eager-imported.
22. **Three styling engines** installed simultaneously: `@emotion`, `styled-components`, `@mui/styled-engine-sc`. Redundant bundle weight.
23. No TypeScript, no Prettier, no real ESLint config, no tests (the `@testing-library/*` deps are unused).

---

## 4. Severity summary

| Area | Severity | Effort to fix |
|------|:--------:|:-------------:|
| Committed secrets / no security rules | 🔴 Critical | Low (rotate) + Med (rules) |
| Unreliable hashing (readAsText) | 🔴 Critical | Low |
| No architecture / layering | 🔴 High | High |
| Dead code & duplication | 🟠 Med | Low |
| State mgmt (no caching, reloads, N+1) | 🟠 High | Med |
| UI/UX quality & responsiveness | 🟠 High | High |
| a11y | 🟠 Med | Med |
| Tooling (CRA, no TS) | 🟠 Med | Med |

**Conclusion:** Preserving this code is not worth it. The product logic fits on one page; the value is in the *concept and data model*, both of which we keep. Everything else is rebuilt. This is a **V2.0**, not a V1.1.

---

## 5. Target architecture (V2.0)

See `ARCHITECTURE.md` (added during the rebuild). Headline decisions proposed:

- **Vite + React 18 + TypeScript** (strict) — replaces CRA.
- **Tailwind + Radix-based design system** (shadcn/ui pattern) + **Framer Motion** — bespoke, premium UI matching the Linear/Vercel/Stripe references. Replaces MUI + the three styling engines.
- **TanStack Query** for all server state (Firebase), thin **Zustand** slice for the little client state (command menu, theme). Removes `window.location.reload()` and manual `useState` fetching.
- **Layered `src/`**: `app/ · components/ui · features/ · hooks/ · layouts/ · pages/ · services/api · lib/ · types/ · constants/ · theme/`. No Firebase calls inside components.
- **react-hook-form + zod** for forms and validation.
- **lucide-react** icons, **sonner** toasts.
- Firestore **Security Rules** + typed converters; hashing via **`crypto.subtle` over an ArrayBuffer**.
- Docs: `README`, `ARCHITECTURE`, `COMPONENT_GUIDE`, `CONTRIBUTING`.
