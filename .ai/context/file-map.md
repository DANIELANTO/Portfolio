# File Map: Portfolio SPA

Operational map of the repository. Use it to orient changes without having to rediscover the entire structure.

---

## Project root

| File / Folder | Purpose | Editable |
|---|---|---|
| `index.html` | Main HTML shell. Loads Google fonts, defines `<title>`. | Yes — for meta tags, external fonts, title |
| `vite.config.ts` | Vite configuration: plugins (React, Tailwind CSS v4). | Only when adding a new plugin |
| `tsconfig.json` | References `tsconfig.app.json` and `tsconfig.node.json`. | Rarely |
| `tsconfig.app.json` | TS config for app code (`src/`). | If compiler options change |
| `tsconfig.node.json` | TS config for Node configuration files. | Rarely |
| `eslint.config.js` | Linting rules. | Only to adjust rules |
| `package.json` | Dependencies, scripts, project metadata. | To add/remove dependencies |
| `package-lock.json` | npm lock file. | **Do not edit manually** |
| `skills-lock.json` | **Pending confirmation** — unknown file. Possibly related to skill tracking or an AI tool. | Verify before modifying |
| `design/tokens.json` | **Historical** design palette (warm/beige). **Not active.** | Do not use as a design reference |
| `.gitignore` | Files excluded from git. | Only when adding new artifacts |

---

## `src/` — Main source code

### Root files of `src/`

| File | Purpose | When to modify |
|---|---|---|
| `src/main.tsx` | Entry point: mounts `<App />`, imports i18n. | If a global Provider is added (Context, etc.) |
| `src/App.tsx` | Orchestrator: composes sections and `LanguageSwitcher`. | To add/reorder page sections |
| `src/i18n.ts` | i18next config: supported languages (en/es), namespaces, fallback. | To add languages or new namespaces |
| `src/index.css` | **Style source of truth**: design tokens (`@theme {}`), fonts (`@font-face`), global classes (`.section-padding`, `.grid-pattern`, `.dot-pattern`). | To change colors, typography, spacing, background patterns |
| `src/App.css` | **Pending confirmation** — exists but possibly not actively used. | Verify before modifying |

---

### `src/components/sections/` — Main page sections

| File | Section | When to modify |
|---|---|---|
| `Hero.tsx` | Landing/presentation. Profile photo, animated copy, contact overlay, social links. | To change copy, photo, social links, or section layout |
| `ProjectsGallery.tsx` | Projects grid. Suspense boundary + skeleton. | To change gallery layout or loading logic |
| `TechStack.tsx` | Technology list by domain. Scroll animations. | To add/remove technologies or change the design |
| `Footer.tsx` | Page footer. Contact and external links. Accessible at `#contact`. | To change footer links or design |

---

### `src/components/sections/projects/` — Project modal sub-components

| File | Purpose | When to modify |
|---|---|---|
| `ProjectCard.tsx` | Project preview card in the gallery. | To change card design/content |
| `ProjectModal.tsx` | Fullscreen modal with project detail: Challenge, Solution, images, diagram. | To add tabs, change modal layout, or add new detail sections |
| `DiagramViewer.tsx` | Interactive diagram viewer with pan and zoom. | To change diagram interaction |
| `ImageCarousel.tsx` | Image carousel inside the modal. | To change image navigation |

**Rule**: These sub-components should only be imported by `ProjectModal.tsx` or `ProjectsGallery.tsx`. Do not create circular dependencies.

---

### `src/components/ui/` — Reusable atomic components

| File | Purpose | When to modify |
|---|---|---|
| `Button.tsx` | Button with variants (primary, secondary, ghost). | To add variants or change base style |
| `Badge.tsx` | Small label/chip. Used for the technology stack. | To change badge style |
| `TextRotator.tsx` | Animated text component that rotates between words. Used in Hero. | To change the rotation animation |
| `LanguageSwitcher.tsx` | Floating EN/ES toggle. Likely positioned fixed/absolute. | To change design or behavior of the switcher |

**Rule**: `ui/` components must not have domain knowledge (projects, sections). They are content-agnostic.

---

### `src/data/` — Data and types

| File | Purpose | When to modify |
|---|---|---|
| `projects.json` | **Source of truth for project content**. Each project has: id, title, category, stack, description (EN/ES), challenge (EN/ES), solution (EN/ES), images, videoUrl, githubUrl, engineering (diagram + architectural explanation EN/ES + keypoints). | To add, edit, or remove portfolio projects |
| `types.ts` | TypeScript interfaces: `Project`, `PortfolioData`, `EngineeringDetails`. | If a new field is added to the project structure |

**Critical rule**: If a field is added to `types.ts`, it must also be added in `projects.json` for all existing projects.

---

### `src/hooks/` — Custom hooks

| File | Purpose | When to modify |
|---|---|---|
| `useProjects.ts` | Singleton fetch of `projects.json`. The promise is cached at module level to avoid multiple fetches. Returns `Promise<Project[]>`. | If the data source changes (API, CMS) |

---

### `src/assets/` — Assets imported in components

- Assets imported directly via `import` in TypeScript (optimized by Vite on build).
- **Pending confirmation**: What files are currently here?

---

## `public/` — Static assets (served directly)

| Path | Content | Notes |
|---|---|---|
| `public/ProfilePhotoExtended.png` | Daniel's profile photo (Hero). | Final image. Do not replace without confirmation. |
| `public/favicon.svg` | Site favicon. | |
| `public/icons.svg` | SVG icon sprite. **Pending confirmation** if actively used. | |
| `public/fonts/` | Geist and Geist Mono `.woff2` files. | Do not delete. Declared in `@font-face` in `index.css`. |
| `public/assets/` | Project diagrams and images (NodePayDiagram.jpg, SubtitlerDiagram.jpg). | Referenced in `projects.json`. |
| `public/locales/en/` | English translations (common.json, hero.json, projects.json, techstack.json, footer.json). | To change visible English text |
| `public/locales/es/` | Spanish translations. | To change visible Spanish text |

---

## `.ai/` — AI Development Harness

| File | Purpose |
|---|---|
| `.ai/agent-instructions.md` | **Read first**. Permanent instructions for LLM agents. |
| `.ai/context/project-context.md` | General project context. |
| `.ai/context/architecture-design.md` | Architecture, layers, data flow, patterns. |
| `.ai/context/file-map.md` | This file. File map and purpose. |
| `.ai/context/development-guidelines.md` | Development rules and conventions. |
| `.ai/context/decisions.md` | ADR log of technical decisions. |
| `.ai/specs/README.md` | Spec Driven Development flow. |
| `.ai/specs/spec-template.md` | Template for new specs. |
| `.ai/specs/*.md` | Active and historical specs. |

---

## Files that must NOT be edited manually

- `package-lock.json` — Generated by npm.
- `dist/` — Build output. Regenerated with `npm run build`.
- `node_modules/` — Installed dependencies.
- `public/fonts/*.woff2` — Binary font files.

---

## Where to work depending on the task

| Task | Main files |
|---|---|
| Change colors or typography | `src/index.css` → `@theme {}` |
| Add a project to the portfolio | `src/data/projects.json` + `public/assets/` (images/diagram) |
| Change Hero copy | `public/locales/en/hero.json` and `public/locales/es/hero.json` |
| Change any section copy | `public/locales/{en,es}/{namespace}.json` |
| Add a new section | Create `src/components/sections/NewSection.tsx` + register in `App.tsx` + create i18n namespace |
| Change project modal layout | `src/components/sections/projects/ProjectModal.tsx` |
| Add a new field type to projects | `src/data/types.ts` + `src/data/projects.json` + the component that renders it |
| Add a new dependency | `package.json` via `npm install`, then update `.ai/context/decisions.md` |
| Change the language toggle icon or font | `src/components/ui/LanguageSwitcher.tsx` |
| Add a new typeface | `public/fonts/` + `@font-face` in `src/index.css` + token in `@theme {}` |
