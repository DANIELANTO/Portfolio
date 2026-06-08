import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseStyles = 'min-h-[44px] px-8 py-3 rounded-none font-sans font-semibold tracking-tight transition-all duration-200 ease-out flex items-center justify-center gap-2 border touch-manipulation focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-primary text-white border-primary hover:bg-[#D4A84B] hover:shadow-lg hover:-translate-y-0.5',
    secondary: 'bg-muted text-foreground border-border hover:bg-border/50 hover:-translate-y-0.5',
    outline: 'border-foreground text-foreground bg-transparent hover:bg-foreground hover:text-white hover:-translate-y-0.5',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
