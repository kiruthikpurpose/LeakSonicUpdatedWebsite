import { NextResponse } from 'next/server';
import type { ZodSchema } from 'zod';
import type { ContactSegmentId } from '@/lib/site';

/**
 * Shared handler for the four segmented contact API routes. Validates against
 * the segment's zod schema and "delivers" the submission.
 *
 * TODO: wire this to a real email / CRM service. Right now a valid submission
 * is validated and logged server-side only - nothing is emailed or persisted.
 * To integrate, replace the deliver() body below with a call to your provider
 * (e.g. Resend, SES, a CRM webhook) using CONTACT_* env vars from .env.example.
 */
async function deliver(segment: ContactSegmentId, data: Record<string, unknown>): Promise<void> {
  // Honeypot check - silently succeed for bots without delivering.
  if (typeof data.company_website === 'string' && data.company_website.length > 0) {
    return;
  }

  // TODO: replace this stub with real email/CRM delivery.
  // const apiKey = process.env.CONTACT_EMAIL_PROVIDER_API_KEY;
  // const inbox = process.env.CONTACT_INBOX;
  // await sendEmail({ to: inbox, subject: `[${segment}] contact`, body: JSON.stringify(data) });

  // eslint-disable-next-line no-console
  console.info(`[contact:${segment}] submission received`, {
    ...data,
    // Never log the honeypot field.
    company_website: undefined,
    receivedAt: new Date().toISOString(),
  });
}

export async function handleContact(
  request: Request,
  segment: ContactSegmentId,
  schema: ZodSchema,
): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Validation failed.', issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  try {
    await deliver(segment, parsed.data as Record<string, unknown>);
  } catch {
    return NextResponse.json(
      { ok: false, error: 'We couldn’t process that right now. Please email us directly.' },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
