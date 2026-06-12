# Project Context: Personal Portfolio — Daniel Romero

## Project name

**Portfolio** — Personal portfolio of Daniel Romero, senior software engineer.

---

## Main purpose

Showcase complex engineering projects in an interactive and highly polished way. The goal is to communicate deep technical expertise through a high-quality UI, with project detail modals, navigable architecture diagrams, image carousels, and smooth animations.

---

## Application type

Single Page Application (SPA) — no client-side router. Single route (`/`). "Routing" is scroll-based: each section is a vertical block.

---

## Primary languages

- **TypeScript** (TSX for React components)
- **CSS** (via Tailwind CSS v4 with tokens in `@theme {}`)

---

## Frameworks and libraries

| Package | Role |
|---|---|
| React 19 | Main UI framework |
| Vite 8 | Build tool and dev server |
| TypeScript ~6 | Type safety |
| Tailwind CSS v4 | Style utilities, configured as a Vite plugin |
| Framer Motion 12 | Animations (scroll-triggered, enter/exit, hover) |
| i18next + react-i18next | Internationalization (EN/ES) |
| i18next-browser-languagedetector | Automatically detects browser language |
| i18next-http-backend | Loads translation files from `/public/locales/` |
| Lucide React | Icons |
| Geist (npm) | Typeface (not used via npm package; loaded from `public/fonts/` with `@font-face`) |

---

## How to set up the environment

```bash
# Prerequisites: Node.js v18+
npm install
```

---

## How to run the project

```bash
# Dev server with HMR
npm run dev
# → http://localhost:5173 (Vite default port)

# Production build
npm run build
# → output in dist/

# Preview the production build
npm run preview

# Linting
npm run lint
```

---

## Environment variables

No `.env`, `.env.example`, or references to environment variables were detected in the code.

**Pending confirmation:** Are any environment variables used for API URL, CDN, or analytics in production?

---

## Main entry points

| File | Role |
|---|---|
| `index.html` | HTML shell that loads the root module |
| `src/main.tsx` | JS entry point; mounts `<App />` on `#root`, imports `i18n.ts` |
| `src/App.tsx` | Main orchestrator — renders sections in order |
| `src/i18n.ts` | Configures i18next with namespaces, languages, and HTTP backend |

---

## General structure

```
Portfolio/
├── public/
│   ├── ProfilePhotoExtended.png   # Profile photo (Hero)
│   ├── favicon.svg
│   ├── icons.svg
│   ├── fonts/                     # Geist, Geist Mono (.woff2)
│   ├── assets/                    # Project diagrams and images
│   └── locales/
│       ├── en/                    # English translations (common, hero, projects, techstack, footer)
│       └── es/                    # Spanish translations
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── i18n.ts
│   ├── index.css                  # Design tokens (@theme), fonts, global utilities
│   ├── App.css                    # (exists, minor role — verify if actively used)
│   ├── assets/                    # Assets imported directly in components
│   ├── components/
│   │   ├── sections/              # Main page blocks
│   │   │   ├── Hero.tsx
│   │   │   ├── ProjectsGallery.tsx
│   │   │   ├── TechStack.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── projects/          # Project modal sub-components
│   │   │       ├── ProjectCard.tsx
│   │   │       ├── ProjectModal.tsx
│   │   │       ├── DiagramViewer.tsx
│   │   │       └── ImageCarousel.tsx
│   │   └── ui/                    # Reusable atomic components
│   │       ├── Button.tsx
│   │       ├── Badge.tsx
│   │       ├── TextRotator.tsx
│   │       └── LanguageSwitcher.tsx
│   ├── data/
│   │   ├── projects.json          # Project content (source of truth for data)
│   │   └── types.ts               # TypeScript interfaces (Project, PortfolioData, EngineeringDetails)
│   └── hooks/
│       └── useProjects.ts         # Singleton fetch of projects.json (cached promise)
├── design/
│   └── tokens.json                # HISTORICAL design palette (warm/beige) — not active
├── index.html
├── vite.config.ts
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── eslint.config.js
├── package.json
└── .ai/                           # AI Development Harness (this directory)
```

---

## Current project status

- The project is **under active development** with the dev server running.
- Improvements and refinements are being made to the Hero section.
- Data in `projects.json` contains **2 real projects**: NodePay and Subtitler (AI Video Processor). The `videoUrl` fields are W3Schools placeholders and must be replaced with real URLs.
- The profile photo (`ProfilePhotoExtended.png`) is present and final.
- The current design theme is **high-contrast monochrome** (white, zinc, electric blue `#0070F3`). The `design/tokens.json` file reflects a previous (warm/beige) palette that was discarded.

---

## Pending confirmation

- `src/App.css` — Is it still actively used? It is not visibly imported in `App.tsx`. May be a leftover.
- `public/assets/` — Does it contain the diagram files (NodePayDiagram.jpg, SubtitlerDiagram.jpg) referenced in `projects.json`?
- Environment variables in production.
- Real video URLs for projects (currently placeholders).
- Whether additional sections beyond Hero, ProjectsGallery, TechStack, and Footer are planned.
- Whether a Blog, Testimonials, or downloadable CV section is planned.
