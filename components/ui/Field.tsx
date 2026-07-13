import * as React from 'react';
import { cn } from '@/lib/cn';

const inputBase =
  'w-full rounded-xl border border-line bg-base px-3.5 py-2.5 text-sm text-ink-body placeholder:text-ink-faint transition-colors focus:border-accent/60 focus-visible:outline-none disabled:opacity-50';

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn(inputBase, className)} {...props} />
));
Input.displayName = 'Input';

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn(inputBase, 'min-h-[120px] resize-y', className)} {...props} />
));
Textarea.displayName = 'Textarea';

export function FieldWrapper({
  label,
  htmlFor,
  error,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-ink-secondary">
        {label}
        {optional && (
          <span className="ml-1.5 font-sans text-[0.65rem] text-ink-faint">optional</span>
        )}
      </label>
      {children}
      {error && (
        <p className="text-xs text-accent" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
