import * as React from 'react';
import Link from 'next/link';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';

const buttonVariants = cva(
  // Squircle radius (Apple-style continuous curvature reads through at these
  // sizes) instead of a sharp rounded rectangle.
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-semibold transition-all duration-150 ease-out-expo focus-visible:outline-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // Primary - the scalpel red, reserved for key CTAs
        primary:
          'bg-accent text-white hover:bg-accent-hover active:translate-y-px shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset]',
        // Secondary - bordered, neutral
        secondary:
          'border border-line-strong bg-card text-ink-body hover:border-line-strong hover:bg-elevated',
        // Ghost - text with subtle hover
        ghost: 'text-ink-secondary hover:bg-elevated hover:text-ink',
        // Outline accent - bordered in red, for lower-emphasis CTAs
        outline: 'border border-accent/40 text-ink hover:border-accent hover:bg-accent/10',
      },
      size: {
        sm: 'h-9 rounded-xl px-3.5',
        md: 'h-11 px-5',
        lg: 'h-12 px-6 text-[0.95rem]',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
    );
  },
);
Button.displayName = 'Button';

/** Convenience link styled as a button. */
export function ButtonLink({
  href,
  variant,
  size,
  className,
  children,
  ...props
}: React.ComponentProps<typeof Link> & VariantProps<typeof buttonVariants>) {
  return (
    <Link href={href} className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {children}
    </Link>
  );
}

export { buttonVariants };
