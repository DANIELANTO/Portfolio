import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseStyles = 'min-h-[48px] px-8 py-3 rounded-full font-sans font-semibold tracking-tight transition-all duration-300 ease-in-out flex items-center justify-center gap-2 border shadow-sm touch-manipulation focus:outline-none focus:ring-2 focus:ring-primary/50';
  
  const variants = {
    primary: 'bg-primary text-white border-primary hover:bg-[#7A5F41] hover:shadow-md hover:scale-[1.02] active:scale-[0.98]',
    secondary: 'bg-accent/20 text-foreground border-accent/30 hover:bg-accent/40',
    outline: 'border-secondary text-secondary bg-transparent hover:bg-secondary hover:text-white',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
