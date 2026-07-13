'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/cn';

const STORAGE_KEY = 'leaksonic-theme';

function applyTheme(light: boolean) {
  document.documentElement.classList.toggle('light', light);
  window.localStorage.setItem(STORAGE_KEY, light ? 'light' : 'dark');
}

/**
 * Light/dark toggle. Reads the class already applied by the blocking inline
 * script in <head> (see app/layout.tsx) so there's no flash on load, then
 * mirrors and updates that state on click.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.classList.contains('light'));
    setMounted(true);
  }, []);

  function toggle() {
    const next = !light;
    setLight(next);
    applyTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        mounted ? (light ? 'Switch to dark theme' : 'Switch to light theme') : 'Toggle theme'
      }
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded-tile border border-line text-ink-muted transition-colors hover:border-line-strong hover:text-ink',
        className,
      )}
    >
      {/* Render both, cross-fade via opacity so there is no hydration-mismatch
          flicker between server (always "dark" icon) and client state. */}
      <span className="relative h-4 w-4">
        <Sun
          className={cn(
            'absolute inset-0 h-4 w-4 transition-opacity duration-150',
            mounted && light ? 'opacity-100' : 'opacity-0',
          )}
          aria-hidden
        />
        <Moon
          className={cn(
            'absolute inset-0 h-4 w-4 transition-opacity duration-150',
            mounted && light ? 'opacity-0' : 'opacity-100',
          )}
          aria-hidden
        />
      </span>
    </button>
  );
}
