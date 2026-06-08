import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, GitBranch, Layers } from 'lucide-react';
import type { Project } from '../../../data/types';
import { useTranslation } from 'react-i18next';
import { Button } from '../../ui/Button';
import { DiagramViewer } from './DiagramViewer';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

/** Compact pill used inside the modal stack section */
const StackPill: React.FC<{ label: string }> = ({ label }) => (
  <span className="inline-flex items-center px-4 py-1.5 bg-background-secondary text-foreground border border-accent/20 text-[10px] font-sans font-bold uppercase tracking-widest rounded-lg">
    {label}
  </span>
);

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { t, i18n } = useTranslation(['common']);
  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center
                 bg-[#2B2A28]/40 backdrop-blur-md p-4 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <motion.div
        initial={{ y: 20, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative bg-background w-full sm:max-w-4xl
                   max-h-[100dvh] sm:max-h-[90vh]
                   overflow-y-auto
                   rounded-[2rem]
                   border border-white/50
                   shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >

        {/* ── Sticky Header ──────────────────────────────────────── */}
        <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-md
                        border-b border-accent/20
                        flex items-center justify-between gap-4 px-8 py-6">
          <div className="flex items-center gap-6">
            <span className="font-sans text-[11px] font-bold text-secondary uppercase tracking-[0.2em]">Project Overview</span>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground tracking-tight">
              {project.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full
                       bg-white hover:bg-white/80 text-foreground shadow-sm
                       border border-accent/20
                       transition-all duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-8 py-12 sm:px-12 sm:py-16 flex flex-col gap-16 relative">
          <div className="absolute inset-0 dot-pattern opacity-[0.2] pointer-events-none" />

          {/* ── Video preview ──────────────────────────────────────── */}
          <div className="w-full aspect-video overflow-hidden bg-background-secondary rounded-2xl border border-accent/20 shadow-sm relative z-10">
            <video
              src={project.videoUrl}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </div>

          {/* ── Challenge & Solution ────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 relative z-10">

            {/* Challenge */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-primary" />
                <h3 className="font-sans text-[11px] font-bold text-primary uppercase tracking-[0.2em]">
                  {t('theChallenge')}
                </h3>
              </div>
              <p className="text-base text-foreground/70 leading-relaxed font-sans font-medium">
                {i18n.language.startsWith('es') ? project.challenge_es : project.challenge_en}
              </p>
            </div>

            {/* Solution */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-primary" />
                <h3 className="font-sans text-[11px] font-bold text-primary uppercase tracking-[0.2em]">
                  {t('theSolution')}
                </h3>
              </div>
              <p className="text-base text-foreground/70 leading-relaxed font-sans font-medium">
                {i18n.language.startsWith('es') ? project.solution_es : project.solution_en}
              </p>
            </div>
          </div>

          {/* ── Stack ─────────────────────────────────────────────── */}
          <div className="flex flex-col gap-6 relative z-10">
            <div className="flex items-center gap-6">
              <h3 className="font-sans text-[11px] font-bold text-secondary uppercase tracking-[0.2em]">{t('stack')}</h3>
              <div className="flex-1 h-px bg-accent/30" />
            </div>
            <div className="flex flex-wrap gap-3">
              {project.stack.map((tech) => (
                <StackPill key={tech} label={tech} />
              ))}
            </div>
          </div>

          {/* ── Engineering & Architecture ────────────────────────── */}
          <div className="bg-white rounded-3xl overflow-hidden border border-accent/20 shadow-sm relative z-10">
            <div className="flex items-center justify-between px-10 py-6 border-b border-accent/20 bg-background-secondary/50">
              <div className="flex items-center gap-4">
                <Layers className="w-5 h-5 text-primary" />
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-foreground font-sans">
                  {t('engineering')}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-accent/20">
              {/* Left — explanation + key points */}
              <div className="p-10 flex flex-col gap-10">
                <p className="text-base text-foreground/70 leading-relaxed font-sans font-medium">
                  {i18n.language.startsWith('es') ? project.engineering.architectureExplanation_es : project.engineering.architectureExplanation_en}
                </p>

                <div className="flex flex-col gap-6">
                  <h4 className="font-sans text-[11px] font-bold text-secondary uppercase tracking-widest">
                    {t('keyPoints')}
                  </h4>
                  <ul className="space-y-4">
                    {(i18n.language.startsWith('es') ? project.engineering.technicalKeyPoints_es : project.engineering.technicalKeyPoints_en).map((point, i) => (
                      <li key={i} className="flex items-start gap-4 text-sm text-foreground/70 font-medium font-sans">
                        <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right — diagram */}
              <div className="p-10 flex flex-col gap-8 bg-background-secondary/20">
                <h4 className="font-sans text-[11px] font-bold text-secondary uppercase tracking-widest">
                  {t('architectureDiagram')}
                </h4>
                <div className="border border-accent/20 p-2 bg-white rounded-2xl">
                  <DiagramViewer diagramUrl={project.engineering.diagramUrl} />
                </div>
              </div>
            </div>
          </div>

          {/* ── Footer actions ─────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-8 border-t border-accent/20 relative z-10">
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-sans text-sm font-bold uppercase tracking-widest text-foreground hover:text-primary transition-colors py-2">
              <GitBranch className="w-4 h-4" />
              {t('sourceCode')}
            </a>
            <Button
              variant="primary"
              className="w-full sm:w-auto px-12 text-xs uppercase tracking-widest"
              onClick={onClose}
            >
              {t('closeDetails')}
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
