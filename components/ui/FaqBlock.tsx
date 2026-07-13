import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './Accordion';
import JsonLd from '@/components/JsonLd';
import { faqSchema, type FaqItem } from '@/lib/schema';

/**
 * Accessible FAQ accordion that also emits FAQPage structured data.
 * Set `withSchema={false}` when a parent page already emits the schema.
 */
export function FaqBlock({
  items,
  withSchema = true,
  className,
}: {
  items: FaqItem[];
  withSchema?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      {withSchema && <JsonLd data={faqSchema(items)} />}
      <Accordion type="single" collapsible className="w-full">
        {items.map((item, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
