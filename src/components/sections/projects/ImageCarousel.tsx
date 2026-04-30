import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
  altText: string;
}

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? '-100%' : '100%',
    opacity: 0,
  }),
};

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, altText }) => {
  const [[currentIndex, direction], setPage] = useState([0, 0]);
  const touchStartX = useRef<number | null>(null);

  const paginate = useCallback(
    (newDir: number) => {
      setPage(([prev]) => {
        const next = (prev + newDir + images.length) % images.length;
        return [next, newDir];
      });
    },
    [images.length]
  );

  const goTo = useCallback(
    (e: React.MouseEvent, index: number) => {
      e.stopPropagation();
      setPage(([prev]) => [index, index > prev ? 1 : -1]);
    },
    []
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) paginate(delta > 0 ? 1 : -1);
    touchStartX.current = null;
  };

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full bg-muted flex items-center justify-center">
        <span className="text-foreground/40 text-sm font-medium">No images available</span>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-full overflow-hidden bg-muted select-none group/carousel"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.img
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          src={images[currentIndex]}
          alt={`${altText} — ${currentIndex + 1} / ${images.length}`}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      </AnimatePresence>

      {/* Gradient overlays for readability */}
      {images.length > 1 && (
        <>
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />
        </>
      )}

      {/* Navigation Arrows — visible on hover (desktop) or always (mobile) */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); paginate(-1); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10
                       w-8 h-8 flex items-center justify-center
                       rounded-full bg-black/50 text-white backdrop-blur-sm
                       opacity-0 group-hover/carousel:opacity-100
                       focus-visible:opacity-100
                       transition-opacity duration-200
                       hover:bg-black/70 active:scale-95"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); paginate(1); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10
                       w-8 h-8 flex items-center justify-center
                       rounded-full bg-black/50 text-white backdrop-blur-sm
                       opacity-0 group-hover/carousel:opacity-100
                       focus-visible:opacity-100
                       transition-opacity duration-200
                       hover:bg-black/70 active:scale-95"
            aria-label="Next image"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Dot Indicators — always visible, compact */}
      {images.length > 1 && (
        <div
          className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10"
          role="tablist"
          aria-label="Image navigation"
        >
          {images.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === currentIndex}
              aria-label={`Image ${i + 1} of ${images.length}`}
              onClick={(e) => goTo(e, i)}
              className={`rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? 'w-5 h-2 bg-white shadow-md'
                  : 'w-2 h-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}

      {/* Image counter — top right */}
      {images.length > 1 && (
        <div className="absolute top-2 right-2 z-10 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs font-medium tabular-nums">
          {currentIndex + 1}/{images.length}
        </div>
      )}
    </div>
  );
};
