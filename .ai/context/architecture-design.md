# Architecture Design: Portfolio SPA

> This file must be updated when:
> - The general application architecture changes.
> - The data flow between layers changes.
> - An important dependency is added.
> - Responsibilities between modules or components change.
> - A relevant technical decision is made.

---

## General description

The portfolio is a **monolithic React 19-based SPA**, built with Vite. It has no own backend, client routing, or global state (no Redux, Zustand, Context, etc.). All business logic is minimal and lives on the client side. The stack is deliberately simple: the architectural complexity the site exposes belongs to the *showcased projects*, not to the portfolio itself.

---

## System layers

```
┌─────────────────────────────────────────────────────────┐
│                     index.html                           │
│              (HTML Shell + entry point)                  │
└────────────────────────┬────────────────────────────────┘
                         │ mounts
┌────────────────────────▼────────────────────────────────┐
│                      main.tsx                            │
│         (React DOM render + i18n bootstrap)              │
└────────────────────────┬────────────────────────────────┘
                         │ renders
┌────────────────────────▼────────────────────────────────┐
│                       App.tsx                            │
│         (Section orchestrator — layout root)             │
│  Hero → ProjectsGallery → TechStack → Footer             │
│  + LanguageSwitcher (fixed overlay)                      │
└────────┬───────────────┬────────────────┬───────────────┘
         │               │                │
         ▼               ▼                ▼
    sections/         sections/       sections/
    Hero.tsx     ProjectsGallery   TechStack.tsx
                      .tsx          Footer.tsx
                       │
              ┌────────┴─────────┐
              ▼                  ▼
         ProjectCard.tsx    ProjectModal.tsx
                                 │
                    ┌────────────┴─────────────┐
                    ▼                          ▼
            DiagramViewer.tsx       ImageCarousel.tsx
```

---

## Layer responsibilities

| Layer | Files | Responsibility |
|---|---|---|
| Shell | `index.html`, `main.tsx` | Mount the React app, configure i18n, load external fonts |
| Orchestrator | `App.tsx` | Compose sections in order, define the root layout |
| Sections | `sections/*.tsx` | Vertical page blocks (Hero, Projects, TechStack, Footer) |
| Sub-components | `sections/projects/*.tsx` | Complex components for the project modal |
| Atomic UI | `ui/*.tsx` | Reusable components without business state (Button, Badge, TextRotator, LanguageSwitcher) |
| Data | `data/projects.json`, `data/types.ts` | Source of truth for project content and its types |
| Hooks | `hooks/useProjects.ts` | Singleton fetch with promise caching (pattern for React 19 `use()`) |
| Styles | `src/index.css` | Design tokens, global fonts, utilities, base styles |
| i18n | `src/i18n.ts`, `public/locales/` | Internationalization configuration and translation files |

---

## Data flow

### Project content

```
public/src/data/projects.json
    ↓ cached fetch() (singleton promise)
hooks/useProjects.ts → fetchProjects()
    ↓ use(Promise) — React 19
ProjectsGallery.tsx → ProjectsList (inner component)
    ↓ prop: project
ProjectCard.tsx           (click → setSelectedProject)
    ↓ portal to document.body
ProjectModal.tsx
    ├── DiagramViewer.tsx  (prop: diagramUrl)
    └── ImageCarousel.tsx  (prop: images[])
```

### Text content (i18n)

```
public/locales/{en,es}/{namespace}.json
    ↓ HTTP backend (at runtime)
i18n.ts (initialized in main.tsx)
    ↓ useTranslation(['namespace'])
Components (Hero, ProjectsGallery, TechStack, Footer)
    ↓ t('key')
Rendered UI
```

### Language detection

```
Browser navigator.language
    ↓ LanguageDetector plugin
i18next (en/es → fallback: en)
    ↓ reactive
LanguageSwitcher.tsx (manual EN/ES toggle)
```

---

## Main modules and components

### Hero.tsx
- Main presentation section.
- Asymmetric grid: `[1.3fr_0.7fr]` (text | profile photo).
- Animated contact overlay (hover over the photo).
- `TextRotator` for animated dynamic words.
- Links to LinkedIn, GitHub and Email hardcoded (with i18n for labels).
- Contact info (`mail`, `location`) hardcoded in the component.

### ProjectsGallery.tsx
- Uses `React.Suspense` + `use(fetchProjects())` for data fetching without useEffect.
- Renders skeleton cards while loading.
- Project modal mounted with `createPortal` on `document.body`.

### ProjectModal.tsx
- Fullscreen overlay with backdrop blur.
- Internal tabs: Challenge/Solution, Images, Architecture Diagram.
- `DiagramViewer` with interactive pan/zoom.
- `ImageCarousel` to navigate images.

### TechStack.tsx
- Stylized list of technologies organized by domain.
- Scroll-triggered animations with Framer Motion.

### Footer.tsx
- Closing section with contact links and external links.
- Accessible via `id="contact"` (target of the Hero "Contact Me" link).

---

## Identified design patterns

1. **Promise singleton + React 19 `use()`**: The `useProjects.ts` hook caches the promise and the inner `ProjectsList` component consumes it with `use()`. Recommended pattern for React 19 without external fetching libraries.
2. **Portal for modals**: `ProjectModal` uses `createPortal` to break the DOM stacking context. Correct for fullscreen overlays.
3. **Tailwind CSS v4 with `@theme {}`**: Design tokens live as CSS custom properties inside `@theme {}` in `index.css`. No `tailwind.config.js`.
4. **Content/presentation separation**: All project content is in `data/projects.json`. Components only receive typed props.
5. **Namespace-based internationalization**: Each section has its own i18n namespace (`hero`, `projects`, `techstack`, `footer`, `common`).
6. **CSS backward-compatibility alias**: `.dot-pattern` is an alias for `.grid-pattern` to avoid breaking existing JSX during a name migration.

---

## Inferred architectural decisions

- **No router**: Deliberate design. The portfolio is a single page with smooth scroll. If routing were needed (blog, individual project pages), adding React Router or a framework like Next.js would be required.
- **No global state**: No Context, Redux, or Zustand. State is local to each component. Sufficient for the current scale.
- **No own server**: 100% static application. Deployable on any CDN or static hosting (Vercel, Netlify, GitHub Pages).
- **React 19**: Adoption of the latest React version, enabling `use()` for data fetching.
- **Vite 8**: Current-generation build tool with ultra-fast HMR.

---

## Technical risks and points of care

| Risk | Description |
|---|---|
| `use(Promise)` without error boundary | If `fetchProjects()` throws, there is no explicit `ErrorBoundary`. The app may fail silently. |
| `projects.json` fetched via relative URL | `fetch('/src/data/projects.json')` — this works in dev (Vite serves `src/`), but in production the file may not be at that path. Verify build output. |
| Outdated `design/tokens.json` | Colors here do not match those in `index.css`. May confuse future agents. |
| Hardcoded contact data | The email and phone are hardcoded in `Hero.tsx`, not in i18n or data files. If they change, the component must be edited directly. |

---

## Pending confirmation

- Is React Router planned for individual project routes?
- Will a CMS or headless CMS be used to manage projects instead of `projects.json`?
- Does the `/src/data/projects.json` path work correctly in production (Vite build)?
- Does an `ErrorBoundary` exist or is one planned for the projects block?
