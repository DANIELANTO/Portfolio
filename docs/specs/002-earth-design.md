---

## title: Portfolio Visual Implementation Spec
version: 1.0
date_created: 2026-06-08
owner: Daniel
tags: [ui-implementation, frontend, tailwind, design-system, portfolio]

# Portfolio Visual Implementation Spec

## Introduction

Este documento define las especificaciones técnicas para la implementación visual del portafolio personal de "Daniel Romero - Desarrollador Fullstack Senior". Se basa estrictamente en el mockup y la guía de estilos visuales proporcionada, estableciendo una estética "Minimalista Elegante" con tonos cálidos y tipografía de alto contraste.

## 1. Purpose & Scope

El propósito de este spec es traducir el diseño visual (mockup) a código frontend escalable y mantenible.

**Dentro del alcance:**

* Configuración del sistema de tokens de diseño (colores, tipografía, espaciado).
* Implementación de los tres layouts principales presentados: Hero clásico (Top Nav), Hero curvo y Hero con Sidebar.
* Desarrollo de componentes base UI: Tarjetas de "Proyectos y demos", Tarjetas de "Sobre mí", botones primarios/secundarios y detalles sutiles (íconos, patrones de puntos).
* Estilización de textos y jerarquía visual.

**Fuera del alcance:**

* Implementación de CMS o bases de datos para el contenido (el contenido será estático o manejado en un spec separado).
* Lógica de enrutamiento compleja (las vistas se asumen de una sola página o navegación estática básica).

## 2. Definitions

* **Paleta Tierra (Earth Palette)**: El espectro de colores definido en el diseño, que va desde cremas claros hasta marrones oscuros.
* **Layout Asimétrico**: Composición utilizada en la sección "Sobre mí" y los "Heros", donde la imagen del perfil y el texto ocupan proporciones de rejilla distintas (ej. 60/40).
* **Detalles Sutiles**: Elementos decorativos de bajo contraste mostrados en el diseño, como matrices de puntos (dot patterns) y líneas finas que aportan textura sin saturar la vista.

## 3. Requirements, Constraints & Guidelines

* **REQ-UI-001**: Implementar el sistema tipográfico dual: `Playfair Display` para títulos (h1, h2, h3) e `Inter` para cuerpo de texto y contenido general.
* **REQ-UI-002**: Replicar la paleta de colores exacta especificada en el diseño: `#F7F3EF` (Fondo claro principal), `#EAE0D4` (Fondo secundario), `#CBBCAB` (Acentos suaves), `#A68D68` (Acentos medios), `#8B6E4D` (Botones primarios) y `#2B2A28` (Texto principal/Fondos oscuros).
* **CON-UI-001**: Las imágenes de perfil y las tarjetas de contenido deben tener bordes redondeados pronunciados (equivalente a `rounded-2xl` o `rounded-3xl` en Tailwind). No se permiten esquinas completamente rectas en componentes contenedores.
* **CON-UI-002**: El contraste del texto sobre los botones primarios (`#8B6E4D` o oscuros) debe mantenerse en color claro/blanco para asegurar la legibilidad.
* **GUD-UI-001**: Mantener los espacios en blanco abundantes entre secciones y dentro de las tarjetas (paddings generosos) para preservar la sensación de "código limpio, resultados sólidos" y elegancia que transmite el diseño.

## 4. Interfaces & Data Contracts

El sistema de diseño debe traducirse en un archivo de configuración (ej. `tailwind.config.js` o variables CSS). A continuación, el contrato de las variables CSS base:

```css
:root {
  /* Paleta de colores basada en el diseño */
  --color-bg-primary: #F7F3EF;
  --color-bg-secondary: #EAE0D4;
  --color-accent-light: #CBBCAB;
  --color-accent-base: #A68D68;
  --color-accent-dark: #8B6E4D;
  --color-text-primary: #2B2A28;
  --color-text-inverted: #F7F3EF;

  /* Tipografía */
  --font-serif: 'Playfair Display', serif;
  --font-sans: 'Inter', sans-serif;

  /* Radios de borde (Curvas) */
  --radius-card: 1.5rem;   /* Para tarjetas de proyectos */
  --radius-image: 2rem;    /* Para la foto principal */
}

```

## 5. Acceptance Criteria

* **AC-UI-001**: Los botones primarios deben renderizarse con el color de fondo `#8B6E4D` y texto en color claro, y deben incluir el ícono de flecha (→) cuando se especifique, alineado verticalmente con el texto.
* **AC-UI-002**: La tarjeta de "Proyectos y demos" debe incluir una imagen superior con radio de borde suave, un título en `Inter` en negrita, una breve descripción, y "pills" (etiquetas) para las tecnologías (React, Node.js, etc.) en la parte inferior.
* **AC-UI-003**: Los encabezados principales (ej. "Transformo procesos repetitivos...") deben utilizar la fuente `Playfair Display` y mostrar variaciones de color/énfasis en palabras clave (ej. "repetitivos" en un tono acento claro).
* **AC-UI-004**: Los íconos en la sección "Sobre mí" (Enfoque en resultados, Arquitectura escalable) deben ser de trazo fino (light/thin) para coincidir con la estética minimalista del diseño.

## 6. Test Automation Strategy

* **Regresión Visual (Visual Regression Testing)**: Configurar capturas automatizadas de los componentes base (Botones, Tarjetas, Heros) usando Storybook + Chromatic o Playwright para asegurar que los tonos cálidos y las fuentes no se alteren en futuros commits.
* **Pruebas de Responsive Design**: Automatizar vistas en anchos de 375px (mobile), 768px (tablet) y 1440px (desktop) para verificar que las curvas de fondo y los layouts asimétricos se adapten o apilen correctamente.

## 7. Rationale & Context

La transición a este diseño específico busca elevar el posicionamiento de la marca personal a "Senior". El uso de `Playfair Display` aporta un peso clásico y editorial, mientras que `Inter` asegura que la información técnica (tecnologías, descripciones de arquitectura) siga siendo altamente legible y moderna. La paleta tierra escapa del clásico azul/gris tecnológico, aportando calidez, humanidad y diferenciación en un mercado saturado.

## 8. Dependencies & External Integrations

* **Google Fonts**: Para la carga de `Playfair Display` (pesos 400, 600) e `Inter` (pesos 300, 400, 500, 600).
* **Librería de Íconos**: Se requiere integrar una librería de íconos minimalistas de línea fina, como *Lucide React* o *Phosphor Icons* (configurados con un `stroke-width` de 1 o 1.5).
* **Framework de CSS**: Preferiblemente *Tailwind CSS* para mapear rápidamente la paleta de colores personalizada y los bordes redondeados a través del archivo de configuración.

## 9. Examples & Edge Cases

**Componente: Píldoras de Tecnología (Tech Pills)**
En las tarjetas de proyectos, las tecnologías se muestran de forma muy limpia.

```jsx
// Ejemplo de UI para Tech Pill
<span className="px-3 py-1 bg-white/50 text-[#2B2A28] text-xs font-sans rounded-md border border-[#EAE0D4]">
  Node.js
</span>

```

**Edge Case: Contraste del Hero Curvo en resoluciones extremas**
En pantallas ultrawide (>1920px), la forma curva del fondo del Hero (variación 2) podría deformarse o cortarse si se implementa como una imagen estática. Se debe implementar utilizando CSS `border-radius`, SVG escalar o `clip-path` para garantizar que la curva se adapte al 100% del contenedor ancho sin perder resolución ni la proporción áurea.

## 10. Validation Criteria

* [ ] La paleta de 6 colores base está implementada como variables globales.
* [ ] La fuente `Playfair Display` está activa en los H1 y H2.
* [ ] La fuente `Inter` está activa en los párrafos y botones.
* [ ] Los bordes de las imágenes (radio grande) coinciden con la proporción del diseño.
* [ ] Las 3 variaciones de Layout (Clásico, Curvo, Sidebar oscuro) son accesibles o están implementadas como componentes intercambiables.
* [ ] Los detalles sutiles (matrices de puntos) están presentes sin interferir en la lectura del texto.