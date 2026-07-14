'use client';

import { useEffect, useState } from 'react';

/**
 * Thin accent progress bar pinned to the very top of the viewport that fills
 * as the reader scrolls through an article. A small, high-visibility premium
 * touch for long-form content. Measures against the `<article>` element it is
 * placed inside, so it reflects article progress, not whole-page progress.
 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const article = document.querySelector('article');
    if (!article) return;

    let raf = 0;
    const update = () => {
      const rect = article.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      // How far the top of the article has scrolled past the top of the viewport.
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 0));
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent"
      role="progressbar"
      aria-label="Article reading progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-accent transition-[width] duration-75 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
