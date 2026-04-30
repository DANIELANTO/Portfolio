import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, className = '' }) => {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-900 ${className}`}>
      {children}
    </span>
  );
};
