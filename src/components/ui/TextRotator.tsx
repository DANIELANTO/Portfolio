import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TextRotatorProps {
  words: string[];
  interval?: number;
  className?: string;
}

/**
 * TextRotator Component
 * 
 * A reusable component that cycles through an array of words with a smooth 
 * "slide-and-fade" animation. It uses a hidden reference element to ensure 
 * the container maintains the width of the longest word, preventing layout shifts.
 */
export const TextRotator: React.FC<TextRotatorProps> = ({
  words,
  interval = 4000,
  className = ""
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [words, interval]);

  // Find the longest word to use as a hidden reference for layout stability
  const longestWord = words.reduce((a, b) => (a.length > b.length ? a : b), "");

  return (
    <span
      className={`relative inline-flex flex-col overflow-hidden align-baseline ${className}`}
      aria-live="polite"
    >
      {/* 
        Hidden reference word for width: 
        Ensures the container is wide enough for the longest word in the array.
      */}
      <span className="invisible pointer-events-none select-none h-0 opacity-0" aria-hidden="true">
        {longestWord}
      </span>

      {/* 
        Hidden reference word for height/baseline: 
        Ensures the container has a stable height and baseline relative to surrounding text.
      */}
      <span className="invisible pointer-events-none select-none opacity-0" aria-hidden="true">
        {words[index]}
      </span>

      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: "70%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-70%", opacity: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1] // Sleek ease-out-expo style
          }}
          className="absolute inset-0 flex items-center justify-start whitespace-nowrap"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};
