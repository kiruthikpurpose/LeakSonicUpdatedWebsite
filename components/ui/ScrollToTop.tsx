'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * Tasteful back-to-top control. Hidden until the reader has scrolled well past
 * the first viewport, then fades in at bottom-right. Respects reduced-motion
 * by jumping instead of smooth-scrolling.
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 1.5);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-card/90 text-ink-secondary shadow-lg shadow-black/30 backdrop-blur transition-all duration-300 hover:border-accent/50 hover:text-accent ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <ArrowUp className="h-5 w-5" aria-hidden />
    </button>
  );
}
