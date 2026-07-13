'use client';

import { useState } from 'react';
import { Mail, Loader2, Check } from 'lucide-react';
import { Input } from '@/components/ui/Field';

/** Compact, stubbed newsletter signup - shown at the foot of the blog index. */
export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="rounded-card border border-line bg-surface p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-md">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-accent" aria-hidden />
            <h2 className="text-lg font-bold text-ink">New posts, occasionally</h2>
          </div>
          <p className="mt-2 text-sm text-ink-secondary">
            No spam, no drip campaign - just an email when we publish something worth reading.
            Unsubscribe anytime.
          </p>
        </div>

        {status === 'success' ? (
          <div className="flex items-center gap-2 text-accent">
            <Check className="h-5 w-5" />
            <span className="text-sm">You’re subscribed. Thanks for reading.</span>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            noValidate
            className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <Input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="flex-1"
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-60 sm:w-auto"
            >
              {status === 'submitting' && <Loader2 className="h-4 w-4 animate-spin" />}
              Subscribe
            </button>
          </form>
        )}
      </div>
      {status === 'error' && (
        <p className="mt-3 text-sm text-accent" role="alert">
          Something went wrong. Please try again, or email{' '}
          <a href="mailto:research@leaksonic.com" className="underline">
            research@leaksonic.com
          </a>
          .
        </p>
      )}
    </div>
  );
}
