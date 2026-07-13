import { NextResponse } from 'next/server';
import { z } from 'zod';

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  // Honeypot - must stay empty. Bots fill it; humans never see it.
  company_website: z.string().max(0).optional(),
});

/**
 * TODO: wire this to a real email list provider (e.g. Resend Audiences,
 * Mailchimp, ConvertKit). Right now a valid submission is validated and
 * logged server-side only - nobody is actually subscribed to anything yet.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Validation failed.', issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  // Honeypot check - silently succeed for bots without subscribing them.
  if (typeof parsed.data.company_website === 'string' && parsed.data.company_website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  // TODO: replace this stub with a real list-provider API call.
  // const apiKey = process.env.NEWSLETTER_PROVIDER_API_KEY;
  // await subscribe({ email: parsed.data.email, apiKey });

  // eslint-disable-next-line no-console
  console.info('[newsletter] subscription received', {
    email: parsed.data.email,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
