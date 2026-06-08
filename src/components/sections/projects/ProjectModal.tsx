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
  <span className="inline-flex items-center px-2.5 py-1 bg-[#F4F4F5] text-[#71717A] border border-[#E4E4E7] text-[11px] font-mono uppercase tracking-wider rounded-md">
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
                   rounded-lg
                   border border-[#E4E4E7]
                   shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >

        {/* ── Sticky Header ──────────────────────────────────────── */}
        <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-md
                        border-b border-[#E4E4E7]
                        flex items-center justify-between gap-4 px-8 py-5">
          <div className="flex items-center gap-6">
            <span className="font-mono text-[11px] font-bold text-[#71717A] uppercase tracking-[0.2em]">Project Overview</span>
            <h2 className="text-2xl md:text-3xl font-sans text-foreground tracking-tight">
              {project.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-md
                       bg-[#F4F4F5] hover:bg-[#E4E4E7] text-foreground
                       border border-[#E4E4E7]
                       transition-all duration-150"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-8 py-12 sm:px-12 sm:py-16 flex flex-col gap-16 relative">
          <div className="absolute inset-0 grid-pattern opacity-[0.3] pointer-events-none" />

          {/* ── Video preview ──────────────────────────────────────── */}
          <div className="w-full aspect-video overflow-hidden bg-[#F4F4F5] rounded-md border border-[#E4E4E7] shadow-sm relative z-10">
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
                <span className="h-px w-8 bg-[#0070F3]" />
                <h3 className="font-mono text-[11px] font-bold text-[#0070F3] uppercase tracking-[0.2em]">
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
                <span className="h-px w-8 bg-[#0070F3]" />
                <h3 className="font-mono text-[11px] font-bold text-[#0070F3] uppercase tracking-[0.2em]">
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
              <h3 className="font-mono text-[11px] font-bold text-[#71717A] uppercase tracking-[0.2em]">{t('stack')}</h3>
              <div className="flex-1 h-px bg-[#E4E4E7]" />
            </div>
            <div className="flex flex-wrap gap-3">
              {project.stack.map((tech) => (
                <StackPill key={tech} label={tech} />
              ))}
            </div>
          </div>

          {/* ── Engineering & Architecture ────────────────────────── */}
          <div className="bg-[#F4F4F5] rounded-lg overflow-hidden border border-[#E4E4E7] shadow-sm relative z-10">
            <div className="flex items-center justify-between px-8 py-5 border-b border-[#E4E4E7] bg-white">
              <div className="flex items-center gap-4">
                <Layers className="w-4 h-4 text-[#0070F3]" />
                <h3 className="text-sm font-mono font-bold uppercase tracking-[0.2em] text-foreground">
                  {t('engineering')}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-[#E4E4E7]">
              {/* Left — explanation + key points */}
              <div className="p-10 flex flex-col gap-10">
                <p className="text-base text-foreground/70 leading-relaxed font-sans font-medium">
                  {i18n.language.startsWith('es') ? project.engineering.architectureExplanation_es : project.engineering.architectureExplanation_en}
                </p>

                <div className="flex flex-col gap-6">
                  <h4 className="font-mono text-[11px] font-bold text-[#71717A] uppercase tracking-widest">
                    {t('keyPoints')}
                  </h4>
                  <ul className="space-y-4">
                    {(i18n.language.startsWith('es') ? project.engineering.technicalKeyPoints_es : project.engineering.technicalKeyPoints_en).map((point, i) => (
                      <li key={i} className="flex items-start gap-4 text-sm text-foreground/70 font-medium font-sans">
                        <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#0070F3]" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right — diagram */}
              <div className="p-8 flex flex-col gap-8 bg-white">
                <h4 className="font-mono text-[11px] font-bold text-[#71717A] uppercase tracking-widest">
                  {t('architectureDiagram')}
                </h4>
                <div className="border border-[#E4E4E7] p-2 bg-[#F4F4F5] rounded-md">
                  <DiagramViewer diagramUrl={project.engineering.diagramUrl} />
                </div>
              </div>
            </div>
          </div>

          {/* ── Footer actions ─────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-[#E4E4E7] relative z-10">
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-mono text-sm font-bold uppercase tracking-widest text-foreground hover:text-[#0070F3] transition-colors py-2">
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
