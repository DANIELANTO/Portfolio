import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, className = '' }) => {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-none text-[10px] font-mono font-bold uppercase tracking-widest bg-muted text-muted-foreground border border-border ${className}`}>
      {children}
    </span>
  );
};
