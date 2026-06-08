import React from 'react';
import { motion } from 'framer-motion';
import type { Project } from '../../../data/types';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ImageCarousel } from './ImageCarousel';
import { Button } from '../../ui/Button';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

const TechPill: React.FC<{ label: string }> = ({ label }) => (
  <span className="px-2.5 py-1 bg-[#F4F4F5] text-[#71717A] text-[11px] font-mono uppercase tracking-wider rounded-md border border-[#E4E4E7]">
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
      className="group flex flex-col bg-card border border-[#E4E4E7] hover:border-[#0070F3]/40
                 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-lg
                 relative overflow-hidden p-3"
    >
      {/* ── Image area ─────────────────────────────────────────── */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#F4F4F5] rounded-md border border-[#E4E4E7]">
        <div className="transition-all duration-1000 ease-out group-hover:scale-110">
          <ImageCarousel images={project.images} altText={project.title} />
        </div>

        {/* Category badge — top-left overlay */}
        <span className="absolute top-3 left-3 z-10
                         inline-flex items-center px-2.5 py-1
                         bg-white/95 backdrop-blur-md text-[#0070F3]
                         text-[10px] font-mono font-bold uppercase tracking-[0.15em] rounded-md border border-[#E4E4E7]">
          {project.category}
        </span>
      </div>

      {/* ── Body ───────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 px-4 pt-8 pb-4 gap-6">

        {/* Title */}
        <h3 className="text-xl font-bold font-sans text-foreground leading-tight tracking-tight
                       group-hover:text-[#0070F3] transition-colors duration-150">
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
              className="text-[11px] font-mono font-bold text-[#71717A] uppercase tracking-widest pl-1"
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
            className="w-full text-sm font-sans font-bold uppercase tracking-[0.1em]"
          >
            <span>{t('viewDetails')}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </motion.article>
  );
};
