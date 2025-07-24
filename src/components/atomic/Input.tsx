import type { ReactNode } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  containerClassName?: string;
}

export function Input({
  iconLeft,
  iconRight,
  className = '',
  containerClassName = '',
  ...props
}: InputProps) {
  return (
    <div className={`relative flex items-center ${containerClassName}`}>
      {iconLeft && (
        <div className="absolute left-3 text-slate-gray">
          {iconLeft}
        </div>
      )}
      <input
        className={`
          w-full border border-gray-600 bg-surface rounded-lg text-primary
          placeholder:text-slate-gray focus:border-primary focus:ring-2 focus:ring-primary/30
          disabled:bg-gray-800 disabled:cursor-not-allowed transition-all
          py-2.5
          ${iconLeft ? 'pl-10' : 'pl-4'}
          ${iconRight ? 'pr-10' : 'pr-4'}
          ${className}
        `}
        {...props}
      />
      {iconRight && (
        <div className="absolute right-3 text-slate-gray">
          {iconRight}
        </div>
      )}
    </div>
  );
}
