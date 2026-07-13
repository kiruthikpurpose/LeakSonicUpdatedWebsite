import Link from 'next/link';
import Logo from './Logo';
import { SocialLinks } from './SocialLinks';
import { LastVerifiedDate } from './LastVerifiedDate';
import { ButtonLink } from '@/components/ui/Button';
import { FOOTER_COLUMNS, SITE } from '@/lib/site';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-content py-16">
        {/* CTA repeat */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 rounded-card border border-line bg-card p-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-h3 font-semibold text-ink">
              Building or regulating gas pipeline infrastructure?
            </h2>
            <p className="mt-2 max-w-xl text-sm text-ink-secondary">
              We route every conversation by who you are - operator, government program, researcher,
              or investor - so you reach the right context fast.
            </p>
          </div>
          <ButtonLink href="/contact" variant="primary" size="lg" className="shrink-0">
            Start a conversation
          </ButtonLink>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">{SITE.tagline}</p>
            <address className="mt-5 text-sm not-italic leading-relaxed text-ink-muted">
              {SITE.address.org}
              <br />
              {SITE.address.line1}
              <br />
              {SITE.address.line2}
              <br />
              {SITE.address.city} - {SITE.address.postalCode}, {SITE.address.region},{' '}
              {SITE.address.country}
            </address>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-2 block text-sm text-ink-secondary transition-colors hover:text-accent"
            >
              {SITE.email}
            </a>
            <div className="mt-6">
              <SocialLinks />
            </div>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="mono-label">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-secondary transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <p className="text-sm text-ink-muted">
              © {year} {SITE.legalName}. All rights reserved. Made in India.
            </p>
            <p className="text-[11px] text-ink-faint">
              <LastVerifiedDate />
            </p>
          </div>
          <div className="flex items-center gap-5 text-xs text-ink-muted">
            <Link href="/privacy" className="transition-colors hover:text-ink">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-ink">
              Terms
            </Link>
            <span className="max-w-md text-right text-ink-faint">
              Pipeline integrity intelligence for gas infrastructure.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
