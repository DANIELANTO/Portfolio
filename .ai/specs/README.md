# Spec Driven Development: Workflow Guide

This file explains how the spec workflow works in this project. Any LLM agent or human developer must follow this workflow before implementing significant changes.

---

## What is a spec?

A spec is a technical document that describes **what is to be changed, why, and how**, before writing a single line of code. It is the memory of the reasoning behind a change.

A spec is NOT:
- A Jira ticket or Trello card.
- API documentation (that goes in the code itself).
- A development diary.

A spec IS:
- A contract between the user's intent and the agent's implementation.
- A document that allows auditing why certain decisions were made.
- A source of truth to validate whether the implementation was correct.

---

## When to create a spec?

Create a spec **before** implementing when the change involves:

- A new section or visible feature in the portfolio.
- A significant refactor of a component or module.
- An architectural change (adding routing, migrating to CMS, etc.).
- A heavy new dependency (new library, framework, etc.).
- A global visual design change (new theme, new typography, etc.).
- A change in the project data structure.
- Any change with impact on multiple files.

**A formal spec is NOT required** for:
- Fixing a typo in translation text.
- Adjusting a minor padding or margin.
- Low-impact linting or TypeScript corrections.

---

## Naming convention

```
YYYY-MM-DD-descriptive-name.md
```

Examples:
```
2026-06-12-add-blog-section.md
2026-06-13-migrate-projects-to-api.md
2026-06-14-dark-mode-theme.md
2026-06-15-add-cv-download-button.md
2026-06-16-refactor-project-modal-tabs.md
```

Use kebab-case. Be descriptive but concise. Always include the creation date.

---

## How to use a spec for implementation?

1. **Read the spec completely** before writing code.
2. Verify that the **Scope** and **Out of scope** are clear.
3. Follow the **Implementation plan** in order.
4. Validate against the **Acceptance criteria** when done.
5. If during implementation something not covered by the spec arises, **update the spec first**, then continue.
6. When finished, change the spec status to `Implemented`.

---

## How to validate acceptance criteria?

- Review each criterion visually in the browser (dev server).
- If there are technical criteria (correct TypeScript types, no lint errors), check with `npx tsc --noEmit` and `npm run lint`.
- Mark each criterion with `[x]` in the spec file when verified.

---

## How to close a spec?

1. Change `## Status` to `Implemented`.
2. Ensure all acceptance criteria are marked with `[x]`.
3. If the spec generated architectural changes, update the corresponding context files.
4. Do not delete the spec file — it remains as a historical record.

---

## How to update context after implementing?

If the implemented spec affected the architecture, file structure, dependencies, or conventions, update:

- `.ai/context/architecture-design.md` — if the architecture or data flow changed.
- `.ai/context/file-map.md` — if files/folders were added, moved, or removed.
- `.ai/context/decisions.md` — if a new technical decision was made.
- `.ai/context/project-context.md` — if the stack, purpose, or project status changed.
- `.ai/context/development-guidelines.md` — if new conventions or patterns were introduced.

---

## Rule for bugs and fixes

### Update an existing spec when:
- The bug was introduced by that same spec.
- The bug is a direct consequence of a recent feature.
- The fix is part of the same functional objective.
- The change does not represent a new initiative.

### Create a new spec when:
- The bug is independent of current specs.
- The bug requires architectural changes.
- The bug affects multiple unrelated modules.
- The fix requires its own technical strategy.
- The bug represents an independent work initiative.

**General rule:** If the fix is still part of the same objective, update the existing spec. If it deserves its own planning, analysis, and acceptance criteria, create a new spec.

---

## Rule for subsequent expansions

### Update an existing spec when:
- The change maintains the same main objective.
- It only expands the scope.
- It affects screens, modules, or components related to the same feature.
- It seeks visual, functional, or technical consistency.
- It corrects an omission from the original spec.
- It adjusts acceptance criteria without changing the main intent.

### Create a new spec when:
- The change introduces a different feature.
- It requires new architecture.
- It has independent acceptance criteria.
- It affects another unrelated area of the system.
- It introduces a separate important technical decision.
- It is large enough to be implemented and reviewed independently.

If a spec was already implemented but needs to be expanded, change its status to:

```
Implemented - requires expansion
```

or add a section:

```
## Subsequent Changes / Expansions
```

Each expansion must document:
- Date.
- Reason for the change.
- New scope.
- Additional files or modules affected.
- New acceptance criteria.
- Impact on context or architecture.
