import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, GitBranch, Code2, Layers, Zap, CheckCircle } from 'lucide-react';
import type { Project } from '../../../data/types';
import { Button } from '../../ui/Button';
import { DiagramViewer } from './DiagramViewer';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

/** Compact pill used inside the modal stack section */
const StackPill: React.FC<{ label: string }> = ({ label }) => (
  <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-semibold
                   bg-primary/10 text-primary border border-primary/20 whitespace-nowrap">
    {label}
  </span>
);

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
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
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center
                 bg-black/80 backdrop-blur-sm p-0 sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <motion.div
        initial={{ y: 60, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 60, opacity: 0, scale: 0.97 }}
        transition={{ type: 'spring', damping: 30, stiffness: 350 }}
        className="relative bg-background w-full sm:max-w-4xl
                   max-h-[96dvh] sm:max-h-[90vh]
                   overflow-y-auto
                   rounded-t-2xl sm:rounded-xl
                   border border-foreground/10
                   shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >

        {/* ── Sticky Header ──────────────────────────────────────── */}
        <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm
                        border-b border-foreground/10
                        flex items-center justify-between gap-4 px-5 py-4">
          <h2 className="text-lg sm:text-xl font-bold text-foreground tracking-tight leading-tight truncate">
            {project.title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg
                       bg-foreground/8 hover:bg-red-500 hover:text-white text-foreground
                       border border-foreground/15 hover:border-red-500
                       transition-colors duration-200
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-5 py-6 sm:px-8 sm:py-8 flex flex-col gap-8">

          {/* ── Video preview ──────────────────────────────────────── */}
          <div className="w-full aspect-video overflow-hidden rounded-lg bg-gray-100 border border-foreground/10">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Challenge */}
            <div className="relative flex flex-col gap-3 p-5 rounded-lg
                            bg-accent/5 border border-accent/25
                            overflow-hidden">
              {/* top accent bar */}
              <span className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-accent/60 to-transparent" />
              <div className="flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-md bg-accent/15 border border-accent/30 flex-shrink-0">
                  <Zap className="w-3.5 h-3.5 text-accent" />
                </span>
                <h3 className="text-xs font-bold text-foreground/50 uppercase tracking-[0.15em]">
                  The Challenge
                </h3>
              </div>
              <p className="text-sm text-foreground/75 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            {/* Solution */}
            <div className="relative flex flex-col gap-3 p-5 rounded-lg
                            bg-primary/5 border border-primary/20
                            overflow-hidden">
              {/* top accent bar */}
              <span className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary/60 to-transparent" />
              <div className="flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-md bg-primary/10 border border-primary/25 flex-shrink-0">
                  <CheckCircle className="w-3.5 h-3.5 text-primary" />
                </span>
                <h3 className="text-xs font-bold text-foreground/50 uppercase tracking-[0.15em]">
                  The Solution
                </h3>
              </div>
              <p className="text-sm text-foreground/75 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* ── Stack ─────────────────────────────────────────────── */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Code2 className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">Stack</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <StackPill key={tech} label={tech} />
              ))}
            </div>
          </div>

          {/* ── Engineering & Architecture ────────────────────────── */}
          <div className="rounded-xl bg-foreground text-background overflow-hidden border border-accent/30">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
              <Layers className="w-5 h-5 text-accent flex-shrink-0" />
              <h3 className="text-base font-bold uppercase tracking-wide text-white">
                Engineering & Architecture
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
              {/* Left — explanation + key points */}
              <div className="p-6 flex flex-col gap-5">
                <p className="text-sm text-gray-300 leading-relaxed">
                  {project.engineering.architectureExplanation}
                </p>

                <div>
                  <h4 className="text-xs font-bold text-accent uppercase tracking-widest mb-3">
                    Key Points
                  </h4>
                  <ul className="space-y-2">
                    {project.engineering.technicalKeyPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-gray-200">
                        <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right — diagram */}
              <div className="p-6 flex flex-col gap-3">
                <h4 className="text-xs font-bold text-accent uppercase tracking-widest">
                  Architecture Diagram
                </h4>
                <div className="rounded-md overflow-hidden border border-white/15 bg-white/5">
                  <DiagramViewer diagramUrl={project.engineering.diagramUrl} />
                </div>
              </div>
            </div>
          </div>

          {/* ── Footer actions ─────────────────────────────────────── */}
          <div className="flex items-center justify-between gap-4 pt-2 border-t border-foreground/10">
            <Button
              variant="outline"
              className="flex items-center gap-2 text-sm"
              onClick={() => window.open(project.githubUrl, '_blank', 'noopener,noreferrer')}
            >
              <GitBranch className="w-4 h-4" />
              Source Code
            </Button>
            <Button
              variant="primary"
              className="px-6 text-sm"
              onClick={onClose}
            >
              Close Details
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
