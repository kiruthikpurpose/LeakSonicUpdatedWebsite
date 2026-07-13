import { Figtree } from 'next/font/google';

// Figtree - the sole typeface across the site. Clean, rounded, professional
// grotesk with excellent legibility at small sizes; used for everything from
// display headings to technical labels. No monospace/"nerd" fonts.
// Loaded as a single variable-weight file (not 5 static weight files) - one
// font request instead of five, a meaningful page-weight and load-time win.
export const figtree = Figtree({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-figtree',
  weight: 'variable',
});
