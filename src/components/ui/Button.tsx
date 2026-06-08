import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

/**
 * Primary button — AC-TEC-002:
 *   Dark bg (#09090B), white text, accent border on hover, no scaling, no gold.
 */
export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseStyles =
    'min-h-[44px] px-6 py-2.5 font-sans font-semibold tracking-tight transition-all duration-150 ease-in-out ' +
    'flex items-center justify-center gap-2 border touch-manipulation ' +
    'focus:outline-none focus:ring-2 focus:ring-primary/40 rounded-[6px]';

  const variants = {
    primary:
      'bg-[#09090B] text-[#FAFAFA] border-transparent ' +
      'hover:border-[#0070F3] hover:bg-[#09090B] active:opacity-80',
    secondary:
      'bg-[#F4F4F5] text-[#09090B] border-[#E4E4E7] ' +
      'hover:bg-[#E4E4E7] active:opacity-80',
    outline:
      'bg-transparent text-[#09090B] border-[#27272A] ' +
      'hover:border-[#0070F3] hover:text-[#0070F3] active:opacity-80',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
