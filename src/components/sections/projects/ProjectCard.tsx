import React from 'react';
import { motion } from 'framer-motion';
import type { Project } from '../../../data/types';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ImageCarousel } from './ImageCarousel';
import { Button } from '../../ui/Button';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

const TechPill: React.FC<{ label: string }> = ({ label }) => (
  <span className="inline-flex items-center px-2 py-0.5 rounded-none text-[9px] font-mono font-medium uppercase tracking-[0.1em]
                   bg-secondary text-muted-foreground border border-border
                   whitespace-nowrap">
    {label}
  </span>
);

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onClick }) => {
  const { t, i18n } = useTranslation(['common']);
  const visibleStack = project.stack.slice(0, 4);
  const hiddenCount = project.stack.length - visibleStack.length;

  const description = i18n.language.startsWith('es') ? project.description_es : project.description_en;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
      className="group flex flex-col bg-card border border-border
                 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-none
                 relative"
    >
      {/* ── Image area ─────────────────────────────────────────── */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-muted rounded-none border-b border-border">
        <div className="transition-all duration-700 ease-out group-hover:scale-105">
          <ImageCarousel images={project.images} altText={project.title} />
        </div>

        {/* Category badge — top-left overlay */}
        <span className="absolute top-4 left-4 z-10
                         inline-flex items-center px-3 py-1.5
                         bg-white text-primary
                         text-[9px] font-mono font-black uppercase tracking-[0.2em] shadow-sm">
          {project.category}
        </span>
      </div>

      {/* ── Body ───────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 px-8 pt-8 pb-8 gap-6">

        {/* Title */}
        <h3 className="text-3xl font-serif text-foreground leading-tight tracking-tight
                       group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>

        {/* Short description */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 font-sans">
          {description}
        </p>

        {/* Tech stack pills */}
        <div className="flex flex-wrap gap-2 items-center">
          {visibleStack.map((tech) => (
            <TechPill key={tech} label={tech} />
          ))}
          {hiddenCount > 0 && (
            <span
              className="text-[9px] font-mono text-muted-foreground/50 uppercase tracking-widest pl-1"
            >
              +{hiddenCount}
            </span>
          )}
        </div>

        {/* CTA Button */}
        <div className="mt-4 pt-6 border-t border-border">
          <Button
            variant="primary"
            onClick={onClick}
            className="w-full text-xs font-mono uppercase tracking-[0.2em]"
          >
            <span>{t('viewDetails')}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.article>
  );
};
