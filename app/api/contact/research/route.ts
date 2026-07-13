import { handleContact } from '../_lib';
import { researchSchema } from '@/lib/contact-schemas';

export async function POST(request: Request) {
  return handleContact(request, 'research', researchSchema);
}
