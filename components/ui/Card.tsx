import * as React from 'react';
import { cn } from '@/lib/cn';

/**
 * Flat, 1px-bordered surface card. No glassmorphism or gradients - precise
 * color blocks, subtle border-color transition on hover when interactive.
 */
export function Card({
  className,
  interactive = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { interactive?: boolean }) {
  return (
    <div
      className={cn(
        'rounded-card border border-line bg-card',
        interactive &&
          'transition-colors duration-150 ease-out-expo hover:border-line-strong hover:bg-elevated',
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6 pb-0', className)} {...props} />;
}

export function CardBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6', className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('text-h3 font-semibold text-ink', className)} {...props} />;
}
