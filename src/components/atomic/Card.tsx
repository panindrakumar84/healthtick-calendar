import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg' | 'none';
}

export function Card({ children, className = '', padding = 'md' }: CardProps) {
  const paddingStyles = {
    sm: 'p-2',
    md: 'p-4 md:p-6',
    lg: 'p-6 md:p-8',
    none: 'none'
  };

  return (
    <div
      className={`
        bg-surface border border-border rounded-xl shadow-lg
        ${paddingStyles[padding]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
