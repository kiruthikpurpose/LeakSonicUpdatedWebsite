import { z } from 'zod';

/**
 * Zod schemas for the four segmented contact forms. Shared by the client
 * (react-hook-form resolver) and the server (API route validation).
 */

const base = {
  name: z.string().min(2, 'Please enter your name.').max(120),
  email: z.string().email('Please enter a valid email address.'),
  message: z.string().min(10, 'Please add a little more detail.').max(4000),
  // Honeypot - must stay empty. Bots fill it; humans never see it.
  company_website: z.string().max(0).optional(),
};

export const operatorSchema = z.object({
  ...base,
  organization: z.string().min(2, 'Please enter your organization.').max(160),
  role: z.string().min(2, 'Please enter your role.').max(120),
  networkType: z.string().max(200).optional(),
});

export const governmentSchema = z.object({
  ...base,
  programName: z.string().min(2, 'Please enter the program or body.').max(160),
  evaluatingFor: z.string().min(2, 'Tell us what you’re evaluating for.').max(400),
});

export const researchSchema = z.object({
  ...base,
  institution: z.string().min(2, 'Please enter your institution.').max(160),
  areaOfInterest: z.string().min(2, 'Please enter your area of interest.').max(200),
});

export const investorSchema = z.object({
  ...base,
  firm: z.string().min(2, 'Please enter your firm.').max(160),
  stageFocus: z.string().min(2, 'Please enter your stage focus.').max(160),
  thesisFit: z.string().max(1000).optional(),
});

export const SEGMENT_SCHEMAS = {
  operator: operatorSchema,
  government: governmentSchema,
  research: researchSchema,
  investor: investorSchema,
} as const;

export type OperatorInput = z.infer<typeof operatorSchema>;
export type GovernmentInput = z.infer<typeof governmentSchema>;
export type ResearchInput = z.infer<typeof researchSchema>;
export type InvestorInput = z.infer<typeof investorSchema>;
