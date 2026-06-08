---
title: Tech-Minimalist Visual Refresh Spec
version: 1.2
date_created: 2026-06-08
owner: Daniel
status: implemented
tags: [ui-refresh, tech-aesthetic, frontend, minimalism, design-system]
---

# Tech-Minimalist Visual Refresh Spec

## Introduction

This document specifies the visual overhaul of the portfolio (previously based on an "Earth/Interior" design language). The goal is to migrate the visual identity toward a **Tech-Minimalist** aesthetic that projects precision, engineering, and modern software development — while keeping all existing functionality, component structure, and content intact.

---

## 1. Purpose & Scope

Refactor the presentation layer (CSS/design tokens) to remove interior-design connotations and adopt a visual language native to the technology development ecosystem.

**In scope:**

- Complete color palette replacement (warm/earth tones → neutral/cool/high-contrast).
- Typography hierarchy overhaul (remove Serif fonts; adopt geometric Sans-serif and Monospace).
- Geometric primitive adjustments (reduce `border-radius` for sharper, more precise corners).
- Visual detail updates (replace dot patterns with wireframe-style grids or subtle code-texture backgrounds).

**Out of scope:**

- DOM structure changes, navigation flows, or copywriting edits.
- Layout restructuring (existing container proportions are preserved).

---

## 2. Definitions

| Term | Definition |
|------|-----------|
| **Tech Neo-Minimalism** | A visual style defined by high contrast (white/black/grayscale), a single vibrant accent color (typically electric blue or violet), and subtle `1px solid` borders to delimit areas — evoking the interface of an IDE or developer toolchain. |
| **Monospace Accent** | Strategic use of fixed-width (code) typography in labels, metadata, and buttons to reinforce an engineering identity. |
| **Geist / Inter** | UI-optimized sans-serif typefaces delivering a clean, technical readability aligned with the tech aesthetic. |

---

## 3. Requirements, Constraints & Guidelines

### Requirements

| ID | Description |
|----|-------------|
| **REQ-TEC-001** | Replace the warm color palette with a monochromatic palette based on Tailwind's *Zinc* or *Slate* scale, using `#09090B` for primary text and `#FAFAFA` for backgrounds. |
| **REQ-TEC-002** | Use a Sans-serif primary typeface (`Geist` or `Inter`) for all headings and body copy. Serif fonts are **prohibited**. |
| **REQ-TEC-003** | Use a Monospace typeface (`JetBrains Mono`, `Fira Code`, or `Geist Mono`) for Tech Pills (technology labels), overlines, and small UI elements. |

### Constraints

| ID | Description |
|----|-------------|
| **CON-TEC-001** | Reduce all border radii. Profile images and cards must not exceed `rounded-md` (0.375rem) or `rounded-lg` (0.5rem). Extreme curves (`rounded-2xl` or higher) are prohibited — structural precision must be conveyed. |

### Guidelines

| ID | Description |
|----|-------------|
| **GUD-TEC-001** | Replace or supplement soft shadows with subtle `1px` borders. In tech interfaces, hard boundaries (borders) are preferred over soft elevation (drop-shadows). |

---

## 4. Design Token Contract

Update the token system in your framework's configuration (e.g., `tailwind.config.js`).

```css
:root {
  /* --- Color Palette: High-Contrast Monochrome + Accent --- */
  --color-bg-primary:     #FFFFFF;
  --color-bg-secondary:   #F4F4F5; /* Zinc 100 */
  --color-border-subtle:  #E4E4E7; /* Zinc 200 */
  --color-border-strong:  #27272A; /* Zinc 800 */
  --color-text-primary:   #09090B; /* Zinc 950 */
  --color-text-muted:     #71717A; /* Zinc 500 */

  /* --- Accent: Electric Blue (evokes terminals, links, CLI output) --- */
  --color-accent-tech:    #0070F3;

  /* --- Typography --- */
  --font-sans: 'Geist', 'Inter', system-ui, sans-serif;
  --font-mono: 'Geist Mono', 'JetBrains Mono', monospace;

  /* --- Radii: Sharp and precise --- */
  --radius-card:   0.5rem;   /* 8px  */
  --radius-button: 0.375rem; /* 6px  */
}
```

> **Note:** Map all colors to abstract semantic tokens (e.g., `bg-background` instead of `bg-white`) from the start. This makes a future Dark Mode implementation a straightforward palette inversion.

---

## 5. Acceptance Criteria

| ID | Criterion |
|----|-----------|
| **AC-TEC-001** | All H1, H2, and H3 elements render in the primary Sans-serif typeface with `tracking-tight` (slightly negative letter-spacing) for a condensed, modern appearance. |
| **AC-TEC-002** | Primary buttons have a dark background (`#09090B`), white text (`#FAFAFA`), and on hover transition to an accent-colored border or slight opacity shift — no scaling, no gold/earth tones. |
| **AC-TEC-003** | Technology labels (e.g., "React", "Node.js") render in the Monospace typeface (`var(--font-mono)`), `text-xs` size, optionally uppercased, inside a container with `1px solid var(--color-border-subtle)`. |
| **AC-TEC-004** | Asymmetric curved backgrounds inherited from the previous design are replaced with straight geometric dividers or subtle SVG grid patterns (`1px` lines at low opacity). |

---

## 6. Component Reference

### Tech Pill

Applying monospace type and crisp borders transforms the element from a generic blog tag into a code-block-style badge.

```jsx
<span className="px-2.5 py-1 bg-[#F4F4F5] text-[#71717A] text-[11px] font-mono uppercase tracking-wider rounded-md border border-[#E4E4E7] shadow-sm">
  Node.js
</span>
```

### Primary Button

```jsx
<button className="px-4 py-2 bg-[#09090B] text-[#FAFAFA] text-sm font-sans rounded-[6px] border border-transparent hover:border-[#0070F3] transition-colors duration-150">
  View Project
</button>
```

### Section Divider (replaces curved backgrounds)

```jsx
// SVG grid pattern — subtle wireframe texture
<div
  className="w-full h-px bg-[#E4E4E7]"
  style={{ backgroundImage: 'url("data:image/svg+xml,...")' }}
/>
```

---

## 7. Test & Validation Strategy

### Visual Regression

Run a snapshot pass using **Chromatic** or **Percy** to confirm that all warm RGB values (reds, yellows, earth tones) have been purged from the DOM and replaced with the Zinc/Blue palette.

### Font Verification

Add a pipeline unit test that checks no references to `"Playfair Display"` or any `serif` font family exist in the computed styles of the `<body>` element.

### Manual Validation Checklist

- [ ] Serif fonts have been fully removed from the project.
- [ ] Warm/beige color palette replaced entirely by neutral/cool gray scales.
- [ ] Monospace fonts are active for labels, code snippets, and technical metadata.
- [ ] All container and button border radii are capped at `8px` (`0.5rem`).
- [ ] Page functionality shows no regressions after the CSS refactor.

---

## 8. Rationale

Curved, serif, and warm designs communicate *craftsmanship, tradition, and comfort*. Software engineering must communicate *precision, efficiency, logic, and modernity*.

By shifting to straight/semi-straight borders (logic), monospace type (code), and high-contrast cool colors (screens, terminals), the viewer's brain immediately associates the portfolio with developer ecosystem tools like GitHub, Vercel, or AWS — positioning the profile as a purely technical entity.

---

## 9. Dependencies & Integrations

### Typography

Replace existing Google Fonts imports with:

- **`geist`** npm package (by Vercel) — preferred for its ecosystem alignment.
- **`Inter`** + **`JetBrains Mono`** — strong fallback combination.

```bash
npm install geist
```

### Iconography

Retain thin-line icons, but ensure they are geometric (e.g., **Lucide React**). Remove any icons that appear hand-drawn or organic.

---

## 10. Edge Cases

### Dark Mode Readiness

Since the palette is built on Zinc grayscale, a future Dark Mode implementation is straightforward. All colors should be referenced via abstract CSS variables (Section 4) so palette inversion requires only token overrides, with no component-level changes.

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg-primary:    #09090B;
    --color-bg-secondary:  #18181B;
    --color-text-primary:  #FAFAFA;
    --color-text-muted:    #A1A1AA;
    --color-border-subtle: #27272A;
    --color-border-strong: #E4E4E7;
  }
}
```

### Low-Contrast Risk

`#71717A` (Zinc 500) on `#FFFFFF` yields a contrast ratio of ~4.6:1, which meets WCAG AA for normal text but fails AAA. Avoid using this color for body copy or interactive labels; restrict it to purely decorative or supplementary text (timestamps, captions).