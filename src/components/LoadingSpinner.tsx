interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'gray';
  message?: string;
  className?: string;
}

export function LoadingSpinner({
  size = 'md',
  color = 'primary',
  message,
  className = ''
}: LoadingSpinnerProps) {
  const sizeClasses = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };
  const colorClasses = {
    primary: 'border-primary',
    white: 'border-white',
    gray: 'border-slate-gray',
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      <div
        className={`
          ${sizeClasses[size]}
          ${colorClasses[color]}
          border-t-transparent border-2 rounded-full animate-spin
        `}
        role="status"
        aria-label="Loading"
      />
      {message && (
        <p className="font-poppins text-sm text-slate-gray animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
}
