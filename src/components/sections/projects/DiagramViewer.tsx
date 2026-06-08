import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface DiagramViewerProps {
  diagramUrl: string;
}

export const DiagramViewer: React.FC<DiagramViewerProps> = ({ diagramUrl }) => {
  const { t } = useTranslation(['common']);
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const controls = useAnimation();
  const [dragConstraints, setDragConstraints] = useState({ top: 0, bottom: 0, left: 0, right: 0 });

  const updateConstraints = useCallback(() => {
    if (containerRef.current && imgRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;
      
      const naturalWidth = imgRef.current.naturalWidth;
      const naturalHeight = imgRef.current.naturalHeight;

      if (naturalWidth && naturalHeight) {
        const imgRatio = naturalWidth / naturalHeight;
        const containerRatio = containerWidth / containerHeight;
        
        let visualWidth, visualHeight;
        if (imgRatio > containerRatio) {
          visualWidth = containerWidth;
          visualHeight = containerWidth / imgRatio;
        } else {
          visualHeight = containerHeight;
          visualWidth = containerHeight * imgRatio;
        }

        const panX = Math.max(0, (visualWidth * scale - containerWidth) / 2);
        const panY = Math.max(0, (visualHeight * scale - containerHeight) / 2);

        setDragConstraints({
          top: -panY,
          bottom: panY,
          left: -panX,
          right: panX,
        });
      }
    }
  }, [scale]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setScale(1), 300);
  }, []);

  useEffect(() => {
    if (scale === 1) {
      controls.start({ x: 0, y: 0, scale: 1 });
    } else {
      controls.start({ scale });
    }
    updateConstraints();
  }, [scale, controls, updateConstraints]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    setScale((prev) => {
      const zoomSensitivity = 0.002;
      const newScale = prev - e.deltaY * zoomSensitivity;
      return Math.min(Math.max(1, newScale), 4);
    });
  }, []);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, close]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Thumbnail */}
      <button
        type="button"
        onClick={open}
        aria-label="Open architecture diagram in full view"
        className="group relative w-full overflow-hidden border border-accent/20 rounded-2xl hover:border-primary/60
                   transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        <div className="w-full bg-white flex items-center justify-center p-6" style={{ minHeight: '160px', maxHeight: '220px' }}>
          <img
            src={diagramUrl}
            alt={t('architectureDiagram')}
            className="w-full h-full object-contain transition-all duration-700 ease-out group-hover:scale-[1.05]"
            style={{ maxHeight: '180px', display: 'block' }}
          />
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center
                        bg-white/0 group-hover:bg-white/80
                        backdrop-blur-[0px] group-hover:backdrop-blur-sm
                        transition-all duration-300">
          <span className="flex items-center gap-3 px-6 py-3 bg-white text-primary text-[10px] font-sans font-bold uppercase tracking-widest
                           opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0
                           transition-all duration-300 shadow-lg border border-accent/20 rounded-full">
            <ZoomIn className="w-4 h-4" />
            {t('viewDiagram')}
          </span>
        </div>
      </button>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-12 bg-[#2B2A28]/40 backdrop-blur-md"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Architecture Diagram Viewer"
          >
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative w-full max-w-6xl bg-white border border-accent/20 rounded-[2rem] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between px-8 py-6 bg-white border-b border-accent/20">
                <div className="flex items-center gap-4">
                  <span className="font-sans text-[11px] font-bold text-secondary uppercase tracking-[0.2em]">Architecture</span>
                  <h3 className="text-foreground font-serif text-xl tracking-tight">
                    {t('architectureDiagram')}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close diagram viewer"
                  className="flex items-center justify-center w-10 h-10 rounded-full
                             bg-background-secondary hover:bg-red-50 text-foreground hover:text-red-600
                             border border-accent/20 hover:border-red-500
                             transition-all duration-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Diagram — dynamic zoom and pan */}
              <div 
                ref={containerRef}
                className="bg-background-secondary/50 relative flex items-center justify-center p-12 overflow-hidden"
                style={{ height: 'calc(90vh - 88px)' }}
                onWheel={handleWheel}
              >
                {/* Viewport decoration */}
                <div className="absolute inset-0 dot-pattern opacity-[0.2] pointer-events-none" />
                
                <motion.img
                  ref={imgRef}
                  src={diagramUrl}
                  alt={t('architectureDiagram')}
                  className={`w-full h-auto object-contain block relative z-10 ${scale > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}
                  style={{ maxHeight: '100%', originX: 0.5, originY: 0.5 }}
                  animate={controls}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  drag={scale > 1}
                  dragConstraints={dragConstraints}
                  dragElastic={0.05}
                  dragMomentum={false}
                  onLoad={updateConstraints}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
