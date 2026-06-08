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
  <span className="px-3 py-1 bg-background-secondary text-foreground text-[10px] font-sans font-bold uppercase tracking-wider rounded-lg border border-accent/20">
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
      className="group flex flex-col bg-card border border-accent/20 hover:border-primary/40
                 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 rounded-[2rem]
                 relative overflow-hidden p-4"
    >
      {/* ── Image area ─────────────────────────────────────────── */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-background-secondary rounded-[1.5rem] border border-accent/10">
        <div className="transition-all duration-1000 ease-out group-hover:scale-110">
          <ImageCarousel images={project.images} altText={project.title} />
        </div>

        {/* Category badge — top-left overlay */}
        <span className="absolute top-4 left-4 z-10
                         inline-flex items-center px-4 py-2
                         bg-white/90 backdrop-blur-md text-primary
                         text-[10px] font-sans font-black uppercase tracking-[0.2em] rounded-full shadow-lg border border-accent/10">
          {project.category}
        </span>
      </div>

      {/* ── Body ───────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 px-4 pt-8 pb-4 gap-6">

        {/* Title */}
        <h3 className="text-2xl font-bold font-sans text-foreground leading-tight tracking-tight
                       group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>

        {/* Short description */}
        <p className="text-base text-foreground/60 leading-relaxed line-clamp-3 font-sans font-medium">
          {description}
        </p>

        {/* Tech stack pills */}
        <div className="flex flex-wrap gap-2 items-center">
          {visibleStack.map((tech) => (
            <TechPill key={tech} label={tech} />
          ))}
          {hiddenCount > 0 && (
            <span
              className="text-[10px] font-sans font-bold text-secondary uppercase tracking-widest pl-2"
            >
              +{hiddenCount}
            </span>
          )}
        </div>

        {/* CTA Button */}
        <div className="mt-auto pt-6">
          <Button
            variant="primary"
            onClick={onClick}
            className="w-full text-sm font-sans font-bold uppercase tracking-[0.1em] rounded-2xl"
          >
            <span>{t('viewDetails')}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </motion.article>
  );
};
