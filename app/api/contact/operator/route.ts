import { handleContact } from '../_lib';
import { operatorSchema } from '@/lib/contact-schemas';

export async function POST(request: Request) {
  return handleContact(request, 'operator', operatorSchema);
}
