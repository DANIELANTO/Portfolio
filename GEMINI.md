# Project Instructions: Personal Portfolio

This document defines the foundational mandates, architecture, and workflows for the Portfolio project. It is the source of truth for all AI agents working on this codebase.

## 🧠 Project Perspective
For a high-level overview of the project's goals, tech stack, and strategic intent, refer to:
👉 **[docs/CONTEXT.md](./docs/CONTEXT.md)**

---

## 🏗️ Architectural Mandates
1.  **Strict Data Separation**: All project content MUST live in `src/data/projects.json`. Components must consume this data via hooks or props.
2.  **Sophisticated Industrial Aesthetic**:
    - High contrast: Dark backgrounds (`#0A0A0A`), Acid Green accents (`#C0FF00`).
    - Sharp edges: `rounded-none` is the default.
    - Technical details: Use mono fonts and technical labels for a "mechanical" feel.
    - Motion: Framer Motion is the standard for all interactive transitions.
3.  **Type Safety**: TypeScript is mandatory. Avoid `any`. Interfaces for all data structures must be defined in `src/data/types.ts`.

## 📜 Spec-Driven Design Workflow (Docs as Code)
We follow a strict **Specification -> Implementation -> Validation** lifecycle for all non-trivial changes.

### 1. The Specification Phase
Before implementing a new feature or major change, you MUST create a specification.
- **Tool**: Use the `create-specification` skill.
- **Location**: `docs/specs/spec-[type]-[name].md`
- **Review**: The spec must be self-contained and AI-ready, following the established template.

### 2. Implementation Phase
- Follow the approved specification exactly.
- Maintain consistency with existing components in `src/components/ui`.

### 3. Validation Phase
- Verify behavior against the "Acceptance Criteria" defined in the spec.
- Ensure the "Sophisticated Industrial" aesthetic is maintained.

---

## 🛠️ Workflows & Tools
- **Project Context**: Always read `docs/CONTEXT.md` at the start of a deep session.
- **Styling**: Use Tailwind CSS v4 where possible. For complex effects (like noise or scanlines), use custom CSS in `src/index.css`.
- **Localization**: All UI text must be externalized in `public/locales/`.

---

## 📁 Directory Structure
- `src/components/sections/`: Major page components.
- `src/components/ui/`: Atomic, reusable UI elements.
- `src/data/`: Static content and types.
- `docs/specs/`: Specification documents.
- `.agents/`: Local agent skills and configurations.
