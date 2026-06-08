import React, { use, useState } from 'react';
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

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
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
    <section id="projects" className="section-padding bg-background border-b border-border relative">
      <div className="max-w-5xl mx-auto px-6">

        {/* Section header */}
        <div className="mb-24 flex flex-col items-center text-center">
          <div className="mb-6 flex items-center gap-4 w-full">
            <span className="h-px flex-1 bg-border" />
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-primary">
              {t('title1')}
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>
          
          <h2 className="text-5xl md:text-6xl font-serif text-foreground tracking-tight mb-8">
            {t('title2')}
          </h2>
          
          <p className="text-lg text-muted-foreground font-sans max-w-xl leading-relaxed italic">
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
