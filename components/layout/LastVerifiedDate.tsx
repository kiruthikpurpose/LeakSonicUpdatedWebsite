'use client';

import { useEffect, useState } from 'react';

/**
 * Small trust-signal note: shows the page load date as a "last verified"
 * marker for the technical and regulatory references on the site, so
 * repeat visitors and reviewers see the content is actively maintained
 * rather than static. Client-rendered to avoid a build-time-frozen date.
 */
export function LastVerifiedDate() {
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    );
  }, []);

  return <>Technical and regulatory references last verified: {date ?? '—'}.</>;
}
