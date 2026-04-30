import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseStyles = 'h-14 px-8 rounded-md font-bold tracking-wider transition-all duration-200 uppercase';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-blue-600 hover:scale-105',
    secondary: 'bg-muted text-foreground hover:bg-gray-200 hover:scale-105',
    outline: 'border-4 border-foreground text-foreground bg-transparent hover:bg-foreground hover:text-white hover:scale-105',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
