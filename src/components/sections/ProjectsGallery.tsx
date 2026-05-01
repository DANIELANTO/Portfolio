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
    <section id="projects" className="py-24 bg-background border-b-8 border-foreground">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <div className="mb-12">
          <h2 className="text-5xl font-extrabold text-foreground uppercase tracking-tight mb-4">
            {t('title1')}<span className="text-primary">{t('title2')}</span>
          </h2>
          <div className="w-16 h-1.5 bg-accent mb-5 rounded-full" />
          <p className="text-base text-foreground/60 font-medium max-w-xl leading-relaxed">
            {t('description')}
          </p>
        </div>

        {/* Grid with suspense boundary */}
        <React.Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)}
            </div>
          }
        >
          <ProjectsList />
        </React.Suspense>
      </div>
    </section>
  );
};
