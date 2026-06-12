# Permanent Instructions for LLM Agents

You are an LLM assistant/agent working on the **Daniel Romero Personal Portfolio** project. Your responsibility is to keep the project's operational memory up to date and act consistently with the real architecture.

---

## 1. Mandatory context reading

Before modifying any code file, you must read, if they exist:

- `.ai/context/project-context.md`
- `.ai/context/architecture-design.md`
- `.ai/context/file-map.md`
- `.ai/context/development-guidelines.md`
- `.ai/context/decisions.md`

Do not assume anything not documented in these files or visible in the current code.

---

## 2. Spec workflow

Before implementing a new feature, refactor, or significant change:

1. Check if a related spec exists in `.ai/specs/`.
2. If not, create a new one using `.ai/specs/spec-template.md` as a base.
3. If there is ambiguous or critical information, mark it as `Pending confirmation` or ask the user.
4. Every implementation must follow its corresponding spec.
5. If during implementation you find the spec is incomplete, update the spec before continuing.

---

## 3. Critical changes

If a change modifies architecture, folder structure, module responsibilities, dependencies, patterns, or technical decisions, also update:

- `.ai/context/architecture-design.md`
- `.ai/context/file-map.md`
- `.ai/context/decisions.md`
- `.ai/context/project-context.md`, if applicable
- `.ai/context/development-guidelines.md`, if applicable

---

## 4. Direct user prompts

If a direct user prompt introduces information relevant to the project context (new section, new feature, design change, new dependency, technical decision), the agent must update the relevant context files even if no formal spec is being created.

---

## 5. Change transparency

Every significant change must make clear:

- What was changed.
- Why it was changed.
- Which files were affected.
- What impact it has on future modifications.

---

## 6. Assumptions and doubts

Do not assume critical information.  
If something is unclear, mark it explicitly as `Pending confirmation`.

Examples of things NOT to assume without confirmation:
- That new sections should be added to the portfolio.
- That the color scheme or visual theme should be changed.
- That contact details or social links should be modified.
- That the current projects in `projects.json` are final.

---

## 7. Automatic context updates

Update context when:

- A new section is added to the portfolio.
- A section is removed.
- A key dependency is changed.
- The architecture or data flow changes.
- The folder structure is altered.
- An important module is renamed.
- New patterns or conventions are introduced.
- A relevant technical decision is made.
- An implemented spec changes business rules or expected behavior.
- A direct user prompt introduces information relevant to future agents.

---

## 8. Handling changes to existing specs

Do not create new specs unnecessarily.

**Update an existing spec when the change:**
- Maintains the same main objective.
- Expands the original scope.
- Fixes an omission.
- Adjusts criteria without changing the main intent.
- Affects modules related to the same feature.

**Create a new spec when the change:**
- Introduces a different feature.
- Has independent acceptance criteria.
- Requires new architecture.
- Affects an unrelated area.
- Introduces a separate technical decision.

If an implemented spec needs to be expanded, change its status to:

```
Implemented - requires expansion
```

or add a section:

```
## Subsequent Changes / Expansions
```

Each expansion must document: date, reason, new scope, affected files, acceptance criteria, and impact on architecture or context.

---

## 9. Project-specific rules

- **Do not modify** `src/data/projects.json` to change real project data without user confirmation. The file has placeholder/demo data.
- **Do not delete** the `.dot-pattern` alias in `src/index.css` — it exists as a backward-compatibility alias for `.grid-pattern`.
- **Tailwind CSS v4** is active via Vite plugin (`@tailwindcss/vite`). Token configuration lives in `@theme {}` inside `src/index.css`, **not** in `tailwind.config.js`.
- **i18n**: All user-visible text must be internationalized. Translations live in `public/locales/{en,es}/{namespace}.json`.
- **React 19** is active. The `use(Promise)` pattern for data fetching is valid and in use (`ProjectsGallery.tsx`).
- Custom fonts (Geist, Geist Mono) are in `public/fonts/` and declared in `src/index.css` with `@font-face`.
- The `design/tokens.json` file exists as a historical reference for a previous palette (warm/beige). **It is not active**. Current tokens are in `src/index.css`.
