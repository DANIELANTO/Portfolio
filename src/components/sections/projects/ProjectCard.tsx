import React from 'react';
import { motion } from 'framer-motion';
import type { Project } from '../../../data/types';
import { ArrowUpRight } from 'lucide-react';
import { ImageCarousel } from './ImageCarousel';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

const TechPill: React.FC<{ label: string }> = ({ label }) => (
  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                   bg-foreground/6 text-foreground/60 border border-foreground/10
                   whitespace-nowrap">
    {label}
  </span>
);

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onClick }) => {
  const visibleStack = project.stack.slice(0, 4);
  const hiddenCount = project.stack.length - visibleStack.length;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col bg-background border border-foreground/10
                 hover:border-foreground/30 hover:shadow-xl hover:-translate-y-1
                 transition-all duration-300 overflow-hidden rounded-xl"
    >
      {/* ── Image area ─────────────────────────────────────────── */}
      <div className="relative w-full aspect-video overflow-hidden bg-muted rounded-xl mx-0">
        <ImageCarousel images={project.images} altText={project.title} />

        {/* Category badge — top-left overlay */}
        <span className="absolute top-3 left-3 z-10
                         inline-flex items-center px-2.5 py-1
                         bg-background/90 backdrop-blur-sm
                         border border-foreground/15
                         rounded-full text-xs font-semibold text-foreground/70
                         shadow-sm">
          {project.category}
        </span>

      </div>

      {/* ── Body ───────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 px-5 pt-4 pb-5 gap-3">

        {/* Title */}
        <h3 className="text-xl font-bold text-foreground leading-snug
                       group-hover:text-primary transition-colors duration-200">
          {project.title}
        </h3>

        {/* Short description */}
        <p className="text-sm text-foreground/55 leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Tech stack pills */}
        <div className="flex flex-wrap gap-1.5 items-center">
          {visibleStack.map((tech) => (
            <TechPill key={tech} label={tech} />
          ))}
          {hiddenCount > 0 && (
            <span
              className="text-xs text-foreground/35 font-medium pl-0.5"
              aria-label={`${hiddenCount} more technologies`}
            >
              +{hiddenCount}
            </span>
          )}
        </div>

        {/* CTA Button */}
        <div className="mt-auto pt-3 border-t border-foreground/8">
          <button
            onClick={onClick}
            className="group/btn relative w-full overflow-hidden rounded-lg
                       flex items-center justify-between
                       px-4 py-2.5
                       bg-foreground text-background
                       text-sm font-semibold tracking-wide
                       transition-all duration-300
                       hover:bg-primary hover:text-white hover:shadow-md
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            {/* shimmer sweep */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full
                         bg-gradient-to-r from-transparent via-white/12 to-transparent
                         transition-transform duration-500 ease-in-out
                         group-hover/btn:translate-x-full"
            />
            <span className="relative">View Details</span>
            <ArrowUpRight
              className="relative w-4 h-4 transition-transform duration-300
                         group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
            />
          </button>
        </div>
      </div>
    </motion.article>
  );
};
