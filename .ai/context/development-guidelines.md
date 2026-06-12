# Development Guidelines: Portfolio SPA

Practical development rules for LLM agents and human developers. Based on the real project code.

---

## 1. Before implementing any change

**Mandatory rule:** Before implementing a feature, refactor, or significant change, a spec must first exist in `.ai/specs/`. If the spec does not exist, the agent must create it using `.ai/specs/spec-template.md` or request the necessary information to complete it.

A direct user prompt may require a context update even if no formal spec is being created (see section 11).

---

## 2. Code conventions

### TypeScript
- Use explicit interfaces in `src/data/types.ts` for any data structure that crosses module boundaries.
- Do not use `any`. If the type is unknown, use `unknown` and narrow it.
- Components exported as named exports (not default), except `App` in `App.tsx`.
- `.tsx` suffix for files with JSX, `.ts` for files without JSX.

### React
- **React 19**: The `use(Promise)` pattern is in use and is valid. Do not replace it with `useEffect + useState` unless there is a very specific reason.
- Functional components only. No classes.
- Props typed with `React.FC` or explicit interfaces (`interface Props {}`).
- Section components exported with the section's descriptive name (e.g., `export const Hero`, `export const Footer`).

### Styles (Tailwind CSS v4)
- **Design tokens in `src/index.css` inside `@theme {}`**. Do not create tokens in `tailwind.config.js` (it does not exist).
- Use semantic tokens with `var(--color-*)` when possible in custom CSS. In JSX, use the corresponding Tailwind classes (`bg-background`, `text-foreground`, etc.).
- Hardcoded colors in JSX (`bg-[#0070F3]`) are accepted for very specific and isolated cases. Always prefer semantic classes.
- Do not use inline `style={{}}` unless strictly necessary (e.g., dynamically calculated values in JS).
- The `.section-padding` class (`py-32 md:py-40`) must be used on all main sections for vertical consistency.
- `.grid-pattern` and its alias `.dot-pattern` are the standard background pattern. Do not delete either.

### Naming
- Components: `PascalCase` (e.g., `ProjectCard`, `TextRotator`).
- Hooks: `camelCase` with `use` prefix (e.g., `useProjects`).
- Utility functions: `camelCase`.
- Module constants: `UPPER_SNAKE_CASE` (e.g., `HERO_SOCIAL_LINKS`).
- Component files: `PascalCase.tsx`.
- Hook/util files: `camelCase.ts`.
- i18n namespaces: lowercase (e.g., `hero`, `projects`, `techstack`, `footer`, `common`).

---

## 3. How to add a new section

1. Create `src/components/sections/NewSection.tsx`.
2. Add the section to `src/App.tsx` in the correct order inside `<main>`.
3. Create translation files:
   - `public/locales/en/newsection.json`
   - `public/locales/es/newsection.json`
4. Register the new namespace in `src/i18n.ts` (the `ns` array).
5. Use `useTranslation(['newsection'])` in the component.
6. Apply `className="section-padding"` to the `<section>` element.
7. Add `id="new-section"` if needed as an anchor link target.
8. Update `.ai/context/file-map.md` and `.ai/context/architecture-design.md`.

---

## 4. How to add a new project to the portfolio

1. Prepare assets:
   - Architecture diagram → `public/assets/{ProjectName}Diagram.jpg` (or `.png`).
   - Project images → `public/assets/`.
   - Video → Cloudflare Stream URL, YouTube embed, or similar. Do not commit videos to the repo.
2. Add the entry to `src/data/projects.json` following exactly the `Project` structure defined in `types.ts`.
3. Verify all required fields are present in both languages (_en and _es).
4. If a new field is added to the structure, update `src/data/types.ts` first.

---

## 5. How to modify user-visible text

**All text must be in translation files**, not hardcoded in components.

1. Find the namespace corresponding to the section (`hero`, `projects`, etc.).
2. Add or edit the key in `public/locales/en/{namespace}.json`.
3. Add the equivalent key in `public/locales/es/{namespace}.json`.
4. Use `t('key')` in the component.
5. If the text is an array (e.g., word list for TextRotator), use `t('key', { returnObjects: true }) as string[]`.

**Known exception**: The email, phone, and location in `Hero.tsx` are partially hardcoded. If they change, edit directly in the component.

---

## 6. How to work with animations (Framer Motion)

- Section entrance animations: `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}`.
- Hover animations: prefer Framer Motion's `whileHover` or Tailwind `transition-*` classes.
- `AnimatePresence` required for exit animations.
- Keep `duration` between 0.3s and 0.8s for UI animations. Do not exceed 1s unless intentional.
- Do not animate non-transformable properties (avoid animating `height`, `width` directly if transform alternatives exist).

---

## 7. How to handle portfolio data

- The source of truth is `src/data/projects.json`.
- The fetch is a singleton cached in `hooks/useProjects.ts`. Do not duplicate fetch logic.
- If migrating to an API or CMS, the change must be made in `useProjects.ts` and the corresponding spec updated.

---

## 8. How to handle typography

- Geist and Geist Mono fonts are in `public/fonts/*.woff2`.
- Declared with `@font-face` in `src/index.css`.
- Font tokens are in `@theme {}`:
  - `--font-sans: 'Geist', 'Inter', system-ui, sans-serif`
  - `--font-mono: 'Geist Mono', 'JetBrains Mono', monospace`
- To add a new font: copy the `.woff2` files to `public/fonts/`, declare `@font-face`, and add to the corresponding variable stack.
- Do not use Google Fonts for new fonts unless strictly necessary (privacy and performance implications).

---

## 9. How to avoid breaking the architecture

- **Do not import sub-components from `sections/projects/` outside of `sections/`**.
- **Do not create global state** without first checking if state can remain local.
- **Do not add business logic** to `ui/` components.
- **Do not modify `types.ts`** without updating `projects.json` for all existing projects.
- **Do not delete `.dot-pattern`** from `index.css` — it is an active backward-compatibility alias.
- **Do not replace the `use(Promise)` pattern** with `useEffect` without a very specific documented reason.

---

## 10. How to document changes

For minor changes (UI bugfix, copy adjustment):
- Add a brief comment in code if the reason is not obvious.

For major changes (new section, refactor, new dependency):
- Create or update the spec in `.ai/specs/`.
- Update the affected context files.
- Record the decision in `.ai/context/decisions.md` if applicable.

---

## 11. Harness updates from direct prompts

If the user introduces information in a conversation that permanently affects the project (agreed new section, definitive visual theme change, installed new dependency, technical decision), the agent must:

1. Update the relevant context files (`.ai/context/*.md`).
2. If the decision is significant, record it in `decisions.md`.
3. Do not wait for a formal spec to complete before updating context.

---

## 12. Rules for keeping the harness up to date

The harness (`.ai/`) must be updated when:

| Event | Files to update |
|---|---|
| A section is added | `file-map.md`, `architecture-design.md`, `project-context.md` |
| A dependency is added | `project-context.md`, `decisions.md` |
| The design theme changes | `project-context.md`, `decisions.md` |
| The folder structure changes | `file-map.md`, `architecture-design.md` |
| A relevant technical decision is made | `decisions.md` |
| A spec is implemented | Change status in the spec + update context if there was an architectural change |
| A new code pattern is added | `development-guidelines.md`, `architecture-design.md` |

---

## 13. Build and linting

```bash
# Check types before committing
npx tsc --noEmit

# Code linting
npm run lint

# Production build (verifies it works)
npm run build
```

Do not commit if `tsc --noEmit` or `npm run lint` report unintentional errors.
