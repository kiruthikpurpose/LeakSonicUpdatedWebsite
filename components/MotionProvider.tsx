'use client';

import { LazyMotion, domAnimation } from 'framer-motion';

/**
 * Loads only the animation features actually used sitewide (fade/slide
 * transitions, exit animations, viewport triggers) instead of framer-motion's
 * full feature set (drag, layout animations, etc.), roughly halving its
 * contribution to the shared bundle. Every animated component uses `m.*`
 * instead of `motion.*` so it resolves through this provider.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
