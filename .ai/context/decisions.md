# Decisions: Technical and Architectural Decision Log

Simplified ADR format. Update this file when:

- The architecture changes.
- An important dependency is added.
- A main convention changes.
- A critical decision is made.
- The organization of files or modules changes.
- The main execution flow changes.
- A conversation with the user introduces a permanent technical decision.

---

## DEC-0001: Adoption of React 19 with `use(Promise)` pattern

**Date:** 2026-06-12 (inferred from project state)
**Status:** Accepted

**Context:**
A way was needed to load project data from `projects.json` without blocking the initial render and without the complexity of an external data fetching library (React Query, SWR, etc.).

**Decision:**
Use React 19 with the `use()` hook (experimental in earlier versions, stable in v19) to consume the fetch promise directly in the component, together with `React.Suspense` for the loading state and a skeleton as fallback.

**Reason:**
React 19 makes `use(Promise)` the idiomatic pattern for data fetching without external libraries. It reduces dependencies and leverages the framework's native capabilities.

**Impact:**
- `hooks/useProjects.ts` exposes a promise singleton.
- `ProjectsGallery.tsx` wraps `ProjectsList` (inner component) in `<React.Suspense>`.
- `ProjectsList` consumes the promise with `use(fetchProjects())`.
- `useEffect` cannot be used for this pattern. Maintain consistency.

---

## DEC-0002: Tailwind CSS v4 via Vite plugin (no `tailwind.config.js`)

**Date:** 2026-06-12 (inferred from code)
**Status:** Accepted

**Context:**
Tailwind CSS v4 introduced a radically different integration approach: instead of an external configuration file, tokens are defined with native CSS using `@theme {}`.

**Decision:**
Use `@tailwindcss/vite` as a plugin in `vite.config.ts` and define all design tokens in `src/index.css` inside `@theme {}`.

**Reason:**
Tailwind v4 is the latest version and this is the recommended configuration flow. It eliminates the need for `tailwind.config.js`. Tokens are real CSS custom properties, accessible with `var(--color-*)` directly in CSS.

**Impact:**
- `tailwind.config.js` does not exist. Do not create it.
- To change colors, radii, or fonts in the design system, edit `@theme {}` in `src/index.css`.
- Tailwind semantic classes (`bg-background`, `text-foreground`, `font-sans`) work because tokens are declared with the correct names.

---

## DEC-0003: Internationalization with i18next (EN/ES)

**Date:** 2026-06-12 (inferred from code)
**Status:** Accepted

**Context:**
The portfolio targets both English and Spanish audiences (the owner is Salvadoran with international experience).

**Decision:**
Use `i18next` + `react-i18next` with:
- `i18next-browser-languagedetector` to automatically detect the browser's language.
- `i18next-http-backend` to load translation files from `/public/locales/`.
- Separate namespaces per section: `common`, `hero`, `projects`, `techstack`, `footer`.

**Reason:**
Allows maintaining translations as independent JSON files without recompiling the app. The HTTP backend loads only the necessary namespaces. The automatic detector improves UX.

**Impact:**
- All user-visible text must be in translation files.
- Adding new sections requires creating a new namespace and its JSON files in both languages.
- The `LanguageSwitcher` allows manual language switching.

---

## DEC-0004: Strict separation of content and presentation

**Date:** 2026-06-12 (inferred from code)
**Status:** Accepted

**Context:**
Portfolios often mix project data directly into components, making it difficult to update content without touching React code.

**Decision:**
All project content lives in `src/data/projects.json`. Types are in `src/data/types.ts`. Components receive only typed props.

**Reason:**
Allows updating projects, stacks, descriptions, images, and diagrams without modifying any React component. Makes it easier for an agent that only needs to edit JSON.

**Impact:**
- `projects.json` is the source of truth.
- Adding a new field requires updating `types.ts` + `projects.json` + the component that renders it.
- If migrating to a CMS, the change is made in `useProjects.ts`.

---

## DEC-0005: No client router (scroll-based navigation)

**Date:** 2026-06-12 (inferred from code)
**Status:** Accepted

**Context:**
A standard personal portfolio does not need multiple routes. Navigation is by scroll with anchor links (`#projects`, `#contact`).

**Decision:**
Do not use React Router or any routing system. A single `/` route with smooth scroll between sections.

**Reason:**
Simplicity. Reduces bundle size. Portfolios are inherently linear. Smooth scroll (`scroll-behavior: smooth`) on `html` is sufficient.

**Impact:**
- If a blog page or individual project pages are needed, React Router or migrating to a framework (Next.js, Remix) would be required. This would be a major architectural change requiring a spec.
- Anchor links function as a "router" for main sections.

---

## DEC-0006: High-contrast monochrome design theme (Monochrome + Electric Blue)

**Date:** 2026-06-12 (inferred from code)
**Status:** Accepted — replaces previous palette

**Context:**
A previous warm/beige palette (`design/tokens.json`) was discarded. A more modern, technical, and high-contrast theme was adopted.

**Decision:**
- Background: `#FFFFFF` (pure white).
- Foreground: `#09090B` (Zinc 950 — near black).
- Primary/Accent: `#0070F3` (electric blue — Vercel-style).
- Muted/Border: Zinc scale (100, 200, 500).
- Typography: Geist (sans) + Geist Mono (code) + Inter as fallback.

**Reason:**
Communicates technical competence, minimalism, and modernity. Similar to Vercel/Linear's design language. Appropriate for a high-end software engineering portfolio.

**Impact:**
- `design/tokens.json` is a historical artifact. Do not use as a reference.
- All active tokens are in `src/index.css → @theme {}`.
- Changing the theme requires only modifying tokens in `@theme {}` and updating this log.

---

## DEC-0007: Adoption of the AI Development Harness (`.ai/`)

**Date:** 2026-06-12
**Status:** Accepted

**Context:**
The project is maintained in collaboration with LLM agents. Without persistent context, each session requires rediscovering the architecture, conventions, and previous decisions.

**Decision:**
Implement an AI Development Harness in `.ai/` with:
- Project context, architecture, file map, development guidelines, and decisions.
- Spec Driven Development workflow for significant changes.
- Permanent agent instructions in `agent-instructions.md`.

**Reason:**
Improves consistency across agent sessions, reduces errors from incorrect assumptions, and accelerates onboarding time for new agents or developers.

**Impact:**
- Any LLM agent must read `.ai/agent-instructions.md` before modifying code.
- Context files must be kept up to date on significant changes.
- Specs in `.ai/specs/` document the reasoning behind each feature or major change.

---

## DEC-0008: React portal for modals (`createPortal`)

**Date:** 2026-06-12 (inferred from code)
**Status:** Accepted

**Context:**
`ProjectModal` is a fullscreen overlay. If mounted inside the normal `ProjectsGallery` tree, it can be affected by the `overflow-hidden` or `z-index` of parent containers.

**Decision:**
Use `createPortal` to mount the modal directly on `document.body`.

**Reason:**
Guarantees the modal is always at the top of the stacking context regardless of where the component is in the React tree.

**Impact:**
- The modal does not inherit styles from its DOM parents (though it does inherit React context).
- For adding new modals or drawers, follow the same portal pattern.
