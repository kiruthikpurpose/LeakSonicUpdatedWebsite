import Link from 'next/link';
import { ButtonLink } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center bg-base">
      <div className="container-content text-center">
        <p className="font-sans text-sm text-accent">404</p>
        <h1 className="mt-4 text-display font-extrabold text-ink">This page isn’t here.</h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-ink-secondary">
          The page you’re looking for may have moved. Try the platform overview, or head back home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" variant="primary">
            Back to home
          </ButtonLink>
          <ButtonLink href="/platform" variant="secondary">
            Explore the platform
          </ButtonLink>
        </div>
        <p className="mt-10 text-sm text-ink-muted">
          Or{' '}
          <Link href="/contact" className="text-accent hover:text-accent-hover">
            get in touch
          </Link>{' '}
          if you were looking for something specific.
        </p>
      </div>
    </div>
  );
}
