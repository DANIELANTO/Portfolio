# Personal Portfolio

A modern, high-end personal portfolio built with React, Vite, TypeScript, and Tailwind CSS. The project is designed to showcase complex engineering projects through an interactive and highly polished user interface.

## 🏗️ Architecture & Tech Stack

### Core Technologies
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite (for fast HMR and optimized builds)
- **Styling**: Tailwind CSS v4, custom utility classes, and custom CSS for specific UI effects.
- **Animations**: Framer Motion for scroll-triggered and interactive UI animations.
- **Icons**: Lucide React.

### Project Structure
The repository follows a clean, component-based architecture with a clear separation of concerns between UI components, layout sections, and data.

```text
src/
├── assets/         # Static assets (images, videos, diagrams)
├── components/
│   ├── sections/   # Major page blocks
│   │   ├── Hero.tsx
│   │   ├── ProjectsGallery.tsx
│   │   ├── TechStack.tsx
│   │   ├── Footer.tsx
│   │   └── projects/ # Complex subcomponents for the gallery
│   │       ├── ProjectCard.tsx
│   │       ├── ProjectModal.tsx
│   │       ├── DiagramViewer.tsx
│   │       └── ImageCarousel.tsx
│   └── ui/         # Reusable atomic UI elements (Button, Badge, etc.)
├── data/           # Static content and type definitions
│   ├── projects.json
│   └── types.ts
├── App.tsx         # Main application orchestrator
├── index.css       # Global styles and Tailwind configuration
└── main.tsx        # Application entry point
```

### Component Breakdown
1. **Hero**: The landing section featuring a dynamic introduction and a text rotator component.
2. **ProjectsGallery**: The core feature of the portfolio. It dynamically loads projects from `projects.json`. It utilizes several complex subcomponents:
   - **ProjectCard**: A summarized preview of a project.
   - **ProjectModal**: A detailed deep-dive overlay displaying the challenge, solution, and engineering specifics.
   - **DiagramViewer**: An interactive architectural diagram viewer with zooming and panning capabilities.
   - **ImageCarousel**: For navigating through project media and screenshots.
3. **TechStack**: A stylized list of mastered technologies categorized by domain (Frontend, Backend, DevOps, etc.), leveraging scroll-triggered Framer Motion animations.
4. **Footer**: A sophisticated closing section incorporating contact capabilities and external links.

### Data Management
Content is strictly separated from presentation. All project details are stored in `src/data/projects.json` and typed using TypeScript interfaces defined in `src/data/types.ts`. This configuration allows easy updates to the portfolio content without modifying React component logic.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm, yarn, or pnpm

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd Portfolio
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
To start the development server with Hot Module Replacement (HMR):
```bash
npm run dev
```

### Building for Production
To build the application for deployment:
```bash
npm run build
```
This command runs the TypeScript compiler and bundles the app using Vite. To preview the production build locally:
```bash
npm run preview
```

## 🎨 Design Philosophy
- **Aesthetics**: Focused on a premium, cohesive design with high-contrast text, subtle borders, and smooth interactive elements.
- **Responsiveness**: Mobile-first approach ensuring proper display across all device viewports.
- **Interactivity**: Fluid micro-animations (hover states, modal transitions, architecture diagram panning) powered by Framer Motion to enhance user engagement.
