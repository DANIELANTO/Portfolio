---

## title: Portfolio Redesign - Serif Design System
version: 1.0
date_created: 2026-06-08
owner: Daniel
tags: [portfolio, design-system, ui-ux, frontend, tailwind]

# Portfolio Redesign - Serif Design System

## Introduction

Este documento define las especificaciones técnicas y visuales para el rediseño del portafolio personal de Daniel. El nuevo sistema visual adopta una filosofía de "Elegancia tipográfica" inspirada en publicaciones editoriales clásicas y marcas de lujo, utilizando el sistema de diseño "Serif" para crear una experiencia atemporal, cálida y refinada.

## 1. Purpose & Scope

El propósito principal es reemplazar la interfaz actual del portafolio por una estética editorial que destaque el contenido mediante tipografía refinada, espacios generosos y simplicidad deliberada.

**Dentro del alcance (In-Scope):**

* Implementación de nueva arquitectura de *Design Tokens* (colores, tipografía, espaciado).
* Rediseño de componentes base: Botones, Tarjetas (Cards), Inputs y Etiquetas de Sección (Section Labels).
* Actualización de la tipografía global a un sistema jerárquico (Serif para encabezados, Sans-serif para cuerpo).
* Ajustes de responsividad y accesibilidad (WCAG AA, áreas de toque de 44px).

**Fuera del alcance (Out-of-Scope):**

* Creación de nuevo contenido para el portafolio (textos de proyectos, imágenes).
* Migración de framework o cambios en la arquitectura de backend/bases de datos.

## 2. Definitions

* **Playfair Display**: Tipografía Serif principal con alto contraste, utilizada para establecer el carácter y la identidad visual del portafolio.
* **Burnished Gold (#B8860B)**: El único color de acento del sistema, utilizado con extrema moderación para enfatizar elementos interactivos o decorativos clave.
* **Small Caps Pattern**: Patrón tipográfico que utiliza fuente monoespaciada en mayúsculas pequeñas, con un tracking (espaciado de letras) de 0.15em para metadatos y etiquetas.
* **Asymmetric Layout**: Composición de diseño donde las columnas no son equitativas (ej. `1.3fr / 0.7fr`) para prevenir rigidez visual manteniendo la elegancia.

## 3. Requirements, Constraints & Guidelines

* **REQ-PRT-001**: El sistema debe implementar una paleta monocromática cálida como base, utilizando Ivory (`#FAFAF8`) para el fondo principal y Rich Black (`#1A1A1A`) para el texto primario.
* **REQ-PRT-002**: Toda la jerarquía de encabezados (H1, H2, H3, números de display) debe utilizar la fuente `Playfair Display`.
* **REQ-PRT-003**: Los componentes tipo "Card" (Tarjetas) deben tener un borde delgado (`1px solid #E8E4DF`) y utilizar el color puro blanco (`#FFFFFF`) para generar contraste con el fondo Ivory.
* **CON-PRT-001**: (Accesibilidad Móvil) Todos los elementos interactivos (botones, enlaces, inputs, accordions) deben tener un tamaño mínimo de interacción de 44x44px.
* **CON-PRT-002**: (Contraste) Todas las combinaciones de color de texto y fondo deben cumplir o superar el estándar WCAG AA.
* **GUD-PRT-001**: Las animaciones y transiciones deben ser sutiles. Se recomienda utilizar `transition-all duration-200 ease-out`. Se prohíben efectos de "bouncing" o elevaciones dramáticas en el hover.
* **GUD-PRT-002**: Utilizar el espacio en blanco como elemento activo de diseño. Los paddings de sección deben mantenerse entre `py-32` y `py-44` en desktop.

## 4. Interfaces & Data Contracts

El sistema se basará en un contrato estricto de variables CSS (Design Tokens) que deberán integrarse en el framework actual (ej. Tailwind CSS).

```css
:root {
  /* Colors */
  --background: #FAFAF8;
  --foreground: #1A1A1A;
  --muted: #F5F3F0;
  --muted-foreground: #6B6B6B;
  --accent: #B8860B;
  --accent-secondary: #D4A84B;
  --accent-foreground: #FFFFFF;
  --border: #E8E4DF;
  --card: #FFFFFF;
  --ring: #B8860B;

  /* Typography Fonts */
  --font-serif: "Playfair Display", Georgia, serif;
  --font-sans: "Source Sans 3", system-ui, sans-serif;
  --font-mono: "IBM Plex Mono", monospace;
}

```

## 5. Acceptance Criteria

* **AC-PRT-001**: Al navegar por el portafolio en resoluciones superiores a 768px, el contenedor principal no debe exceder `max-w-5xl` (64rem) para garantizar una lectura cómoda.
* **AC-PRT-002**: Al hacer hover sobre un botón primario, el fondo debe cambiar a `--accent-secondary`, la sombra debe intensificarse y debe haber un desplazamiento vertical de `-translate-y-0.5` en 200ms.
* **AC-PRT-003**: Al navegar usando el teclado (`Tab`), todos los elementos interactivos deben mostrar un anillo de enfoque visible configurado como `ring-2 ring-accent ring-offset-2`.
* **AC-PRT-004**: En dispositivos móviles (< 768px), el Hero debe cambiar a una sola columna, centrando el texto y reduciendo el tamaño del titular a un máximo de `2.5rem`.

## 6. Test Automation Strategy

* **Visual Regression Testing**: Implementar herramientas (como Percy o Chromatic) para asegurar que las reglas de líneas de 1px y los bordes sutiles no se rompan en diferentes navegadores.
* **Accessibility Testing**: Integrar `axe-core` en el pipeline de CI/CD para automatizar la verificación de contraste de color y presencia de etiquetas semánticas.
* **Unit/Component Testing**: Utilizar Jest y React Testing Library (o el framework equivalente del stack) para verificar que los componentes interactivos exponen los estados correctos (`hover`, `focus`, `active`).

## 7. Rationale & Context

La mayoría de los portafolios minimalistas eliminan tantos elementos que terminan siendo genéricos y carentes de personalidad. El enfoque "Serif" se eligió para demostrar madurez en diseño: introduce interés visual sin recurrir a decoraciones excesivas, aporta calidez sin depender de una paleta multicolor compleja y establece un tono atemporal mediante el uso de convenciones editoriales clásicas (Small Caps, reglas finas, tipografía Serif).

## 8. Dependencies & External Integrations

* **Google Fonts / Fontsource**: Proveedor para cargar las tipografías "Playfair Display", "Source Sans 3" e "IBM Plex Mono".
* **Tailwind CSS**: (Asumido por las clases mencionadas en el requerimiento). Se requerirá extender el archivo `tailwind.config.js` para incluir los tokens personalizados de colores, fuentes y sombras sutiles.
* **Lucide Icons / Radix Icons** (Opcional): Para íconos de la interfaz que coincidan con el grosor de línea de 1px (editorial).

## 9. Examples & Edge Cases

**Componente: Section Label**
El patrón de etiqueta de sección requiere líneas divisorias flexibles que acompañen al texto en monoespacio.

```jsx
// Ejemplo de implementación en React/Next.js
export const SectionLabel = ({ title }) => (
  <div className="mb-6 flex items-center gap-4">
    <span className="h-px flex-1 bg-[var(--border)]" />
    <span className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-[var(--accent)]">
      {title}
    </span>
    <span className="h-px flex-1 bg-[var(--border)]" />
  </div>
);

```

**Edge Case: Contenido largo en botones móviles**
En dispositivos con anchos reducidos (ej. iPhone SE), el texto largo de un botón CTA no debe desbordarse horizontalmente. Debe ajustar su padding y permitir el wrapping del texto si es necesario, asegurando siempre mantener la altura mínima requerida de 44px (`min-h-[44px]`) configurando la clase `touch-manipulation` para evitar el zoom de doble toque accidental.

## 10. Validation Criteria

* [ ] Los design tokens globales han sido configurados centralizadamente.
* [ ] La tipografía Playfair Display se carga y renderiza correctamente en todas las etiquetas H1-H3.
* [ ] Los estados interactivos (hover, active, focus) están presentes y operan en 200ms.
* [ ] Las métricas de Lighthouse reportan >95 en Accesibilidad.
* [ ] Revisión manual de responsividad aprobada en anchos de 320px, 768px y 1024px+.
* [ ] El portafolio mantiene una altura mínima táctil de 44px para enlaces y botones.