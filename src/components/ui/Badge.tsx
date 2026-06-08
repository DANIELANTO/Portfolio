import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Tech Pill — AC-TEC-003:
 *   Monospace font, text-xs, optionally uppercased,
 *   1px solid zinc border, zinc-100 background.
 */
export const Badge: React.FC<BadgeProps> = ({ children, className = '' }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 bg-[#F4F4F5] text-[#71717A] text-[11px] font-mono uppercase tracking-wider rounded-md border border-[#E4E4E7] ${className}`}
    >
      {children}
    </span>
  );
};
