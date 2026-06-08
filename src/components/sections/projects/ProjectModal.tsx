import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, GitBranch, Code2, Layers, Zap, CheckCircle } from 'lucide-react';
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
  <span className="inline-flex items-center px-3 py-1 bg-muted text-muted-foreground border border-border text-[9px] font-mono font-bold uppercase tracking-widest">
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
                 bg-foreground/20 backdrop-blur-md p-4 sm:p-12"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative bg-white w-full sm:max-w-4xl
                   max-h-[100dvh] sm:max-h-[90vh]
                   overflow-y-auto
                   rounded-none
                   border border-border
                   shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >

        {/* ── Sticky Header ──────────────────────────────────────── */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md
                        border-b border-border
                        flex items-center justify-between gap-4 px-8 py-6">
          <div className="flex items-center gap-6">
            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em]">Project Overview</span>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground tracking-tight">
              {project.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="flex-shrink-0 flex items-center justify-center w-10 h-10
                       bg-muted hover:bg-red-50 text-muted-foreground hover:text-white
                       border border-border hover:border-red-500
                       transition-all duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-8 py-12 sm:px-12 sm:py-16 flex flex-col gap-16">

          {/* ── Video preview ──────────────────────────────────────── */}
          <div className="w-full aspect-video overflow-hidden bg-muted border border-border shadow-sm">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">

            {/* Challenge */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-primary" />
                <h3 className="font-mono text-[10px] font-bold text-primary uppercase tracking-[0.3em]">
                  {t('theChallenge')}
                </h3>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed font-sans italic">
                {i18n.language.startsWith('es') ? project.challenge_es : project.challenge_en}
              </p>
            </div>

            {/* Solution */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-primary" />
                <h3 className="font-mono text-[10px] font-bold text-primary uppercase tracking-[0.3em]">
                  {t('theSolution')}
                </h3>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed font-sans">
                {i18n.language.startsWith('es') ? project.solution_es : project.solution_en}
              </p>
            </div>
          </div>

          {/* ── Stack ─────────────────────────────────────────────── */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-6">
              <h3 className="font-mono text-[10px] font-bold text-foreground/40 uppercase tracking-[0.3em]">{t('stack')}</h3>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="flex flex-wrap gap-3">
              {project.stack.map((tech) => (
                <StackPill key={tech} label={tech} />
              ))}
            </div>
          </div>

          {/* ── Engineering & Architecture ────────────────────────── */}
          <div className="bg-muted/30 border border-border">
            <div className="flex items-center justify-between px-10 py-6 border-b border-border bg-white">
              <div className="flex items-center gap-4">
                <Layers className="w-5 h-5 text-primary" />
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-foreground">
                  {t('engineering')}
                </h3>
              </div>
              <span className="font-mono text-[8px] text-muted-foreground uppercase tracking-widest">Document: Technical_Specification</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-border">
              {/* Left — explanation + key points */}
              <div className="p-10 flex flex-col gap-10">
                <p className="text-base text-muted-foreground leading-relaxed font-sans italic">
                  {i18n.language.startsWith('es') ? project.engineering.architectureExplanation_es : project.engineering.architectureExplanation_en}
                </p>

                <div className="flex flex-col gap-6">
                  <h4 className="font-mono text-[10px] font-bold text-primary uppercase tracking-widest">
                    {t('keyPoints')}
                  </h4>
                  <ul className="space-y-4">
                    {(i18n.language.startsWith('es') ? project.engineering.technicalKeyPoints_es : project.engineering.technicalKeyPoints_en).map((point, i) => (
                      <li key={i} className="flex items-start gap-4 text-sm text-muted-foreground font-medium">
                        <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 bg-primary" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right — diagram */}
              <div className="p-10 flex flex-col gap-8 bg-white/50">
                <h4 className="font-mono text-[10px] font-bold text-primary uppercase tracking-widest">
                  {t('architectureDiagram')}
                </h4>
                <div className="border border-border p-2 bg-white">
                  <DiagramViewer diagramUrl={project.engineering.diagramUrl} />
                </div>
              </div>
            </div>
          </div>

          {/* ── Footer actions ─────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-8 border-t border-border">
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-foreground hover:text-primary transition-colors py-2 px-4 border border-transparent hover:border-border">
              <GitBranch className="w-4 h-4" />
              {t('sourceCode')}
            </a>
            <Button
              variant="primary"
              className="px-12 text-xs font-mono uppercase tracking-[0.2em]"
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
