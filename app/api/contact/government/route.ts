import { handleContact } from '../_lib';
import { governmentSchema } from '@/lib/contact-schemas';

export async function POST(request: Request) {
  return handleContact(request, 'government', governmentSchema);
}
