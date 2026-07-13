'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';
import Logo from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { ButtonLink } from '@/components/ui/Button';
import { NAV_LINKS, type NavItem } from '@/lib/site';
import { cn } from '@/lib/cn';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change.
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href.split('#')[0]!);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b transition-colors duration-200',
        scrolled || mobileOpen
          ? 'border-line bg-base/85 backdrop-blur-md'
          : 'border-transparent bg-transparent',
      )}
    >
      <div className="container-content flex h-16 items-center justify-between gap-4">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((item) => (
            <NavEntry key={item.label} item={item} active={isActive(item.href)} />
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <ButtonLink href="/contact" variant="primary" size="sm">
            Partner with us
          </ButtonLink>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-tile text-ink"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-line bg-base lg:hidden">
          <nav className="container-content flex flex-col gap-1 py-4" aria-label="Mobile">
            {NAV_LINKS.map((item) => (
              <MobileEntry
                key={item.label}
                item={item}
                open={openDropdown === item.label}
                onToggle={() => setOpenDropdown((cur) => (cur === item.label ? null : item.label))}
              />
            ))}
            <ButtonLink href="/contact" variant="primary" size="md" className="mt-3">
              Partner with us
            </ButtonLink>
          </nav>
        </div>
      )}
    </header>
  );
}

function NavEntry({ item, active }: { item: NavItem; active: boolean }) {
  const [open, setOpen] = useState(false);

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className={cn(
          'rounded-xl px-3 py-2 text-sm font-medium transition-colors',
          active ? 'text-ink' : 'text-ink-secondary hover:text-ink',
        )}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={cn(
          'inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium transition-colors',
          active ? 'text-ink' : 'text-ink-secondary hover:text-ink',
        )}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {item.label}
        <ChevronDown className="h-3.5 w-3.5" aria-hidden />
      </button>
      {open && (
        <div className="absolute left-0 top-full w-72 pt-2">
          <div className="panel overflow-hidden p-1.5 shadow-xl shadow-black/40">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-elevated"
              >
                <span className="block text-sm font-medium text-ink">{child.label}</span>
                {child.description && (
                  <span className="mt-0.5 block text-xs leading-snug text-ink-muted">
                    {child.description}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileEntry({
  item,
  open,
  onToggle,
}: {
  item: NavItem;
  open: boolean;
  onToggle: () => void;
}) {
  if (!item.children) {
    return (
      <Link
        href={item.href}
        className="rounded-xl px-3 py-2.5 text-[0.95rem] font-medium text-ink-secondary hover:text-ink"
      >
        {item.label}
      </Link>
    );
  }
  return (
    <div>
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-[0.95rem] font-medium text-ink-secondary"
        aria-expanded={open}
        onClick={onToggle}
      >
        {item.label}
        <ChevronDown className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="ml-3 flex flex-col border-l border-line pl-3">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="rounded-xl px-3 py-2 text-sm text-ink-muted hover:text-ink"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
