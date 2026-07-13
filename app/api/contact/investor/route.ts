import { handleContact } from '../_lib';
import { investorSchema } from '@/lib/contact-schemas';

export async function POST(request: Request) {
  return handleContact(request, 'investor', investorSchema);
}
