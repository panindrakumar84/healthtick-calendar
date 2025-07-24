import { AlertTriangle, X } from 'lucide-react';
import { Button } from './atomic/Button';

interface ErrorBannerProps {
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export function ErrorBanner({ message, onRetry, onDismiss, className = '' }: ErrorBannerProps) {
  return (
    <div className={`bg-error/10 border-l-4 border-error text-error p-4 ${className}`} role="alert">
      <div className="flex">
        <div className="py-1">
          <AlertTriangle className="h-6 w-6 mr-3" />
        </div>
        <div className="flex-1">
          <p className="font-bold">An Error Occurred</p>
          <p className="text-sm">{message}</p>
          {onRetry && (
            <Button variant="destructive" size="sm" onClick={onRetry} className="mt-3">
              Try Again
            </Button>
          )}
        </div>
        {onDismiss && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <Button variant="ghost" size="icon" onClick={onDismiss} className="h-8 w-8 text-error">
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
