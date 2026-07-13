'use client';

import { useState } from 'react';
import { useForm, type FieldValues, type Path } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, FieldWrapper } from '@/components/ui/Field';
import { SEGMENT_SCHEMAS } from '@/lib/contact-schemas';
import type { ContactSegmentId } from '@/lib/site';

export type FieldSpec = {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'textarea';
  placeholder?: string;
  optional?: boolean;
  /** Full width in the two-column grid. */
  full?: boolean;
};

/**
 * Reusable segmented contact form. One implementation drives all four segments;
 * each instance supplies its own field spec, schema, endpoint, and confirmation
 * message - so there is no copy-pasted near-duplicate form.
 */
export function ContactForm({
  segmentId,
  fields,
  confirmation,
  submitLabel = 'Send message',
}: {
  segmentId: ContactSegmentId;
  fields: FieldSpec[];
  confirmation: string;
  submitLabel?: string;
}) {
  const endpoint = `/api/contact/${segmentId}`;
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({ resolver: zodResolver(SEGMENT_SCHEMAS[segmentId]) });

  async function onSubmit(values: FieldValues) {
    setStatus('submitting');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-start gap-3 rounded-card border border-accent/25 bg-accent/[0.05] p-6">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
        <div>
          <p className="font-medium text-ink">Thanks - your message is in.</p>
          <p className="mt-1 text-sm text-ink-secondary">{confirmation}</p>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="mt-3 text-sm font-medium text-accent hover:text-accent-hover"
          >
            Send another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      {/* Honeypot - visually hidden, off from assistive tech and tab order. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${endpoint}-company_website`}>Leave this field empty</label>
        <input
          id={`${endpoint}-company_website`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('company_website' as Path<FieldValues>)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {fields.map((f) => {
          const err = errors[f.name as keyof typeof errors]?.message as string | undefined;
          const id = `${endpoint}-${f.name}`;
          return (
            <div key={f.name} className={f.full || f.type === 'textarea' ? 'sm:col-span-2' : ''}>
              <FieldWrapper label={f.label} htmlFor={id} error={err} optional={f.optional}>
                {f.type === 'textarea' ? (
                  <Textarea
                    id={id}
                    placeholder={f.placeholder}
                    aria-invalid={!!err}
                    {...register(f.name as Path<FieldValues>)}
                  />
                ) : (
                  <Input
                    id={id}
                    type={f.type ?? 'text'}
                    placeholder={f.placeholder}
                    aria-invalid={!!err}
                    {...register(f.name as Path<FieldValues>)}
                  />
                )}
              </FieldWrapper>
            </div>
          );
        })}
      </div>

      {status === 'error' && (
        <p className="text-sm text-accent" role="alert">
          Something went wrong sending that. Please try again, or email us directly.
        </p>
      )}

      <div>
        <Button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : submitLabel}
        </Button>
      </div>
    </form>
  );
}
