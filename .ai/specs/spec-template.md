# Spec: [Feature or Change Name]

## Status

<!-- Choose one: Proposed | In Progress | Implemented | Implemented - requires expansion | Cancelled -->
Proposed

---

## Context

<!-- Explain why this change is needed. What problem it solves, what opportunity it takes advantage of, or what technical debt it addresses. Be specific. -->

---

## Objective

<!-- Describe what should be achieved when this spec is complete. One or two clear sentences. -->

---

## Scope

<!-- What is included in this change. Be specific about sections, components, or files. -->

- ...

---

## Out of scope

<!-- What must NOT be modified in this implementation. Prevent scope creep. -->

- ...

---

## Functional requirements

<!-- What the end user must be able to do or see when done. -->

- [ ] Requirement 1
- [ ] Requirement 2
- [ ] Requirement 3

---

## Technical requirements

<!-- Implementation constraints or requirements. E.g., must be compatible with React 19, must not add dependencies, must pass the linter. -->

- [ ] Technical requirement 1
- [ ] Technical requirement 2

---

## Affected files or modules

<!-- List the files, folders, or modules that will likely be modified. Use paths relative to the repo root. -->

| File | Change type |
|---|---|
| `src/components/sections/Example.tsx` | New file |
| `src/App.tsx` | Modify — add section |
| `public/locales/en/example.json` | New file |
| `public/locales/es/example.json` | New file |
| `src/i18n.ts` | Modify — add namespace |

---

## Proposed design

<!-- Technical explanation of the solution. May include pseudocode, component structure, data flow, etc. This is not a step-by-step guide (that goes in the Implementation plan), but the architectural vision of the change. -->

---

## Architectural impact

<!-- Does this change affect the project architecture? -->

- [ ] **No** architectural impact. Isolated change.
- [ ] **Yes** affects the architecture. See details below.

If it affects the architecture, update on completion:

- `.ai/context/architecture-design.md`
- `.ai/context/file-map.md`
- `.ai/context/decisions.md`
- `.ai/context/project-context.md` (if applicable)
- `.ai/context/development-guidelines.md` (if applicable)

---

## Implementation plan

<!-- Ordered steps to implement the change. The agent must follow them in order. -->

1. Step 1
2. Step 2
3. Step 3

---

## Acceptance criteria

<!-- List of conditions that must be met to consider the spec "Implemented". Must be verifiable. -->

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

---

## Suggested tests

<!-- How to validate that the change works correctly. Visual verification, lint, tsc, expected behavior, etc. -->

- Open the dev server (`npm run dev`) and visually verify that...
- Run `npx tsc --noEmit` without errors.
- Verify in both languages (EN and ES) that...

---

## Risks

<!-- Technical, business, or compatibility risks. Can be empty if no risks are identified. -->

- **Risk 1**: Description and proposed mitigation.

---

## Subsequent Changes / Expansions

<!-- Use this section ONLY if the spec is already implemented and needs to be expanded. Do not fill this section for new specs. -->

### Expansion 1

**Date:** YYYY-MM-DD
**Reason:** ...
**New scope:** ...
**Additional files affected:** ...
**New acceptance criteria:**
- [ ] ...
**Architectural impact:** ...

---

## Notes for future agents

<!-- Useful information for another LLM or developer picking up this work. Include gotchas, additional context, or non-obvious decisions. -->

- ...
