---

## title: Luxury Editorial Design System Implementation Spec
version: 1.0
date_created: 2026-06-08
owner: Frontend Team
tags: [design-system, luxury, editorial, ui-architecture, tailwind]

# Luxury Editorial Design System Implementation Spec

## Introduction

Este spec define las reglas técnicas y arquitectónicas para la integración del sistema de diseño "Luxury / Editorial" en nuestra base de código actual. Este sistema busca emular revistas de alta costura y marcas de lujo (ej. Vogue, Kinfolk, Hermès) a través de una jerarquía tipográfica exquisita, espacios negativos amplios, movimiento cinemático lento y asimetría intencional.

## 1. Purpose & Scope

El propósito es refactorizar la interfaz de usuario existente para adoptar la estética de lujo, priorizando la precisión arquitectónica y eliminando decoraciones innecesarias.

**Dentro del alcance:**

* Implementación de tokens de diseño centralizados (colores, espaciado, tipografía).
* Creación y refactorización de componentes base (Botones, Tarjetas, Inputs) con bordes estrictamente rectangulares (0px radius).
* Implementación de animaciones cinemáticas y transiciones de estado (hover/focus).
* Inclusión de texturas de ruido sutil (paper grain) y líneas de cuadrícula visibles.

**Fuera del alcance:**

* Cambios en la lógica de negocio subyacente.
* Modificaciones a la arquitectura de la base de datos o APIs.
* Creación de nuevo contenido multimedia (se aplicarán filtros CSS a las imágenes existentes).

## 2. Definitions

* **Cinematic Motion**: Animaciones intencionalmente lentas (500ms para UI, 1500-2000ms para imágenes) que emulan movimientos de cámara en producciones de lujo.
* **Asymmetric Grid**: Composiciones que evitan intencionalmente las divisiones 50/50, utilizando desplazamientos (`col-start`) para crear tensión visual.
* **Drop Cap**: Letra capitular gigante utilizada al inicio de párrafos introductorios para aportar una sensación editorial clásica.
* **Paper Noise**: Superposición (overlay) en toda la página de un SVG fractal al 2% de opacidad para imitar la textura de papel costoso.

## 3. Requirements, Constraints & Guidelines

* **REQ-LUX-001**: Todos los componentes interactivos y contenedores deben tener un `border-radius` de `0px` sin excepciones.
* **REQ-LUX-002**: Las imágenes deben renderizarse por defecto en escala de grises (`grayscale`) y transicionar a color completo solo en el estado `hover`.
* **REQ-LUX-003**: El fondo principal de la aplicación debe ser Alabaster Cálido (`#F9F8F6`) y el texto principal debe ser Carbón Rico (`#1A1A1A`).
* **CON-LUX-001**: Las transiciones de imágenes no deben durar menos de 1500ms. Las transiciones de interfaz (botones, inputs) no deben durar menos de 500ms.
* **CON-LUX-002**: Se prohíbe el uso de sombras duras. Todas las sombras (`box-shadow`) deben utilizar valores RGBA extremadamente sutiles (ej. opacidad entre 0.02 y 0.15).
* **GUD-LUX-001**: Utilizar el espacio vertical generosamente. Las secciones principales deben estar separadas por paddings de `py-24` a `py-32` en desktop.
* **GUD-LUX-002**: Alternar pesos tipográficos (Regular a *Italic*) dentro del mismo titular para crear énfasis y cadencia visual.

## 4. Interfaces & Data Contracts

El sistema se implementará extendiendo la configuración del framework CSS (ej. Tailwind CSS v4) con las siguientes variables y tokens fundamentales:

```css
@theme {
  /* Colors */
  --color-background: #F9F8F6;
  --color-foreground: #1A1A1A;
  --color-muted-bg: #EBE5DE;
  --color-muted-fg: #6C6863;
  --color-accent: #D4AF37;
  --color-white: #FFFFFF;

  /* Typography */
  --font-serif: "Playfair Display", serif;
  --font-sans: "Inter", sans-serif;

  /* Easing */
  --ease-luxury: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

```

## 5. Acceptance Criteria

* **AC-LUX-001**: Al hacer hover sobre una imagen, esta transiciona suavemente de `grayscale` a full color, incrementando ligeramente su escala (`scale-105`) y profundizando su sombra, en un lapso de 1500ms a 2000ms.
* **AC-LUX-002**: Los botones primarios muestran un efecto de "deslizamiento dorado" en el estado hover, donde una capa dorada (`#D4AF37`) cubre el botón desde la izquierda con una duración de 500ms.
* **AC-LUX-003**: En resoluciones de escritorio (>1024px), se visualizan 4 líneas de cuadrícula verticales a lo largo de toda la altura de la página, con un grosor de `1px` y una opacidad del `20%`.
* **AC-LUX-004**: Los inputs de formulario solo muestran un borde inferior (`border-b`) de `1px`, cambiando su color a dorado (`#D4AF37`) cuando están en estado de `focus`. El `placeholder` debe usar fuente serif en cursiva.

## 6. Test Automation Strategy

* **Visual Regression**: Utilizar herramientas automatizadas (ej. Percy o Playwright) para validar que no existen radios de borde (`border-radius > 0`) renderizados en el DOM y que la asimetría del grid se mantiene entre resoluciones.
* **E2E Motion Testing**: Implementar tests que verifiquen el cumplimiento de los tiempos de transición requeridos (min 500ms para UI, min 1500ms para imágenes).
* **Accessibility (a11y)**: Validar mediante `axe-core` que el contraste entre Alabaster (`#F9F8F6`) y Carbón (`#1A1A1A`) se mantenga por encima de 12.6:1, y que el sistema respete la media query `prefers-reduced-motion` anulando las transiciones cinemáticas.

## 7. Rationale & Context

La decisión de usar un radio de borde de 0px y transiciones ultra-lentas se basa en los principios de diseño de marcas de alta costura, donde la precisión arquitectónica y el "retraso" intencional transmiten exclusividad, confianza y valor táctil. La escala de grises predeterminada en imágenes estandariza la dirección de arte, convirtiendo el color en una "recompensa" que el usuario obtiene al interactuar con el contenido.

## 8. Dependencies & External Integrations

* **Tailwind CSS v4**: Para la gestión utilitaria de los tokens de diseño y transiciones arbitrarias.
* **Google Fonts**: Para la importación de `Playfair Display` e `Inter`.
* **Lucide React** *(Opcional)*: Para iconografía extremadamente sutil, forzando un `stroke-width` de `1px` a `1.5px`.
* **SVG Data URI**: Un asset base64 ligero para generar el *Paper Noise* vía CSS pseudo-elementos o un div fijo superpuesto.

## 9. Examples & Edge Cases

**Edge Case: Botón Primario Animado**
La animación deslizante dorada requiere una estructura anidada para asegurar que el texto se mantenga visible y el fondo fluya de izquierda a derecha sin desbordar el contenedor estricto del botón.

```jsx
<button className="relative overflow-hidden bg-[#1A1A1A] text-white h-12 px-10 text-xs uppercase tracking-[0.2em] font-medium transition-shadow duration-500 hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)] group">
  <span className="absolute inset-0 bg-[#D4AF37] translate-x-[-100%] transition-transform duration-500 ease-[var(--ease-luxury)] group-hover:translate-x-0" />
  <span className="relative z-10 transition-colors duration-500">
    Discover Collection
  </span>
</button>

```

**Edge Case: Textos Verticales (Vertical Labels)**
Los metadatos decorativos laterales deben ocultarse en pantallas móviles y mostrarse en pantallas de escritorio mediante el uso de la propiedad `writing-mode`.

```css
.vertical-label {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  @apply hidden md:block absolute text-[10px] uppercase tracking-[0.3em] text-[#6C6863];
}

```

## 10. Validation Criteria

* [ ] La paleta de colores monocromática con acentos dorados está centralizada correctamente.
* [ ] Todo el sistema renderiza bordes ortogonales (0px radius) y separadores de `1px` de grosor.
* [ ] Las imágenes aplican el filtro de escala de grises predeterminado y la animación dura al menos 1500ms al hacer hover.
* [ ] Los encabezados H1-H3 combinan `Playfair Display` con variaciones en *Italic* donde corresponda semánticamente.
* [ ] El *Paper Noise* cubre el documento global sin bloquear los eventos de cursor (`pointer-events: none`).
* [ ] Los layouts implementan una cuadrícula asimétrica verificable en tamaños de escritorio (>1024px).