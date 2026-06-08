import React, { use, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { fetchProjects } from '../../hooks/useProjects';
import type { Project } from '../../data/types';
import { ProjectCard } from './projects/ProjectCard';
import { ProjectModal } from './projects/ProjectModal';

// Inner component that consumes the promise with React `use`
const ProjectsList: React.FC = () => {
  const projects = use(fetchProjects());
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {createPortal(
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              key="project-modal"
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

// Skeleton shown while data loads
const CardSkeleton: React.FC = () => (
  <div className="flex flex-col rounded-sm overflow-hidden border border-foreground/10 bg-muted animate-pulse">
    <div className="w-full aspect-video bg-foreground/8" />
    <div className="p-5 flex flex-col gap-3">
      <div className="h-5 w-3/4 bg-foreground/10 rounded" />
      <div className="flex gap-1.5">
        {[60, 50, 70].map((w) => (
          <div key={w} className="h-4 rounded bg-foreground/8" style={{ width: `${w}px` }} />
        ))}
      </div>
      <div className="h-9 w-full bg-foreground/8 rounded mt-2" />
    </div>
  </div>
);

export const ProjectsGallery: React.FC = () => {
  const { t } = useTranslation(['projects']);
  return (
    <section id="projects" className="section-padding bg-[#F4F4F5] border-b border-[#E4E4E7] relative overflow-hidden">
      {/* Wireframe Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-[0.4] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Section header */}
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="w-12 h-px bg-[#0070F3]" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-[#71717A]">
                {t('title1')}
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-sans text-foreground tracking-tight max-w-2xl leading-[1.1]">
              {t('title2')}
            </h2>
          </div>
          <p className="text-lg text-[#71717A] font-sans max-w-sm leading-relaxed border-l border-[#E4E4E7] pl-6 pb-2">
            {t('description')}
          </p>
        </div>

        {/* Grid with suspense boundary */}
        <React.Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
            </div>
          }
        >
          <ProjectsList />
        </React.Suspense>
      </div>
    </section>
  );
};
