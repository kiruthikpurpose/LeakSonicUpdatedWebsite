import type { Metadata } from 'next';
import { LegalLayout } from '@/components/sections/LegalLayout';
import { buildMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy policy',
  description:
    'How LeakSonic collects, uses, and protects information submitted through the website, including contact-form data, retention, and your rights as a data subject.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy policy"
      eyebrow="Legal"
      path="/privacy"
      updated="8 July 2026"
      intro={`This policy describes how ${SITE.legalName} ("LeakSonic", "we", "us", or "our") collects, uses, discloses, and protects information in connection with the website at ${SITE.url} (the "Site"). It applies to visitors, prospective partners, and anyone who submits information to us through the Site.`}
      sections={[
        {
          heading: '1. Information we collect',
          body: [
            'We collect the information you voluntarily submit through our segmented contact forms - such as your name, work email address, organisation or institution, role, and the message or details you provide, which vary depending on whether you identify as a pipeline operator, a government or agency contact, a researcher, or an investor.',
            'We do not require you to create an account to use the Site, and the Site does not knowingly collect personal information from anyone we know to be a child. We may also automatically collect limited technical information typical of any website visit - such as browser type, general device information, and pages viewed - through privacy-respecting analytics, described further in Section 4.',
          ],
        },
        {
          heading: '2. How we use your information',
          body: [
            'We use the information you submit to respond to your inquiry, route it internally to the right team, and maintain a reasonable record of our correspondence with you. If you tell us you are a pipeline operator, a government or incubation program contact, a researcher, or an investor, we use that context to tailor our response to what is actually useful to you.',
            'We do not sell your personal information, and we do not use the information you submit through contact forms for advertising or marketing to third parties. We will not share your submission outside LeakSonic except as described in Section 4 or as required by law.',
          ],
        },
        {
          heading: '3. Legal basis for processing',
          body: [
            'Where applicable data protection law requires a legal basis for processing, we rely on your consent (given by voluntarily submitting a form), our legitimate interest in responding to business, research, regulatory, and investment inquiries directed to us, and, where a resulting engagement proceeds, the steps necessary to enter into or perform a contract with you or your organisation.',
          ],
        },
        {
          heading: '4. Third-party services and processors',
          body: [
            'We may use privacy-respecting website analytics to understand aggregate Site usage and improve our content; where used, such analytics are configured to minimise the collection of personally identifiable information. Contact-form submissions are currently logged securely for internal handling; as we formalise our operations, we intend to route submissions through a dedicated email delivery or CRM service, at which point that processor will be named here along with its own applicable privacy terms.',
            'We do not currently use third-party advertising trackers or sell data to data brokers. If this changes, we will update this policy and provide appropriate notice.',
          ],
        },
        {
          heading: '5. Data retention',
          body: [
            'We retain contact submissions for as long as reasonably necessary to respond to your inquiry, maintain a record of our correspondence, and comply with applicable legal, accounting, or regulatory obligations. Where a submission does not lead to an ongoing relationship, we periodically review and remove records that are no longer needed for these purposes.',
          ],
        },
        {
          heading: '6. Data security',
          body: [
            'We take reasonable technical and organisational measures designed to protect the information you submit, including transmitting form submissions over encrypted connections (HTTPS) and restricting internal access to submitted information to those who need it to respond to your inquiry. No method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.',
          ],
        },
        {
          heading: '7. International data transfers',
          body: [
            `${SITE.legalName} is based in India, and information you submit through the Site is processed in India. If you are submitting information from outside India, you understand that your information will be transferred to, stored, and processed in India, which may have data protection laws different from those of your home jurisdiction.`,
          ],
        },
        {
          heading: '8. Your rights',
          body: [
            'Depending on your jurisdiction, you may have rights to request access to, correction of, deletion of, or a copy of the personal information you have submitted to us, and to object to or restrict certain processing. You can exercise these rights, or ask any question about how your information is handled, by emailing us at the address in Section 10. We will respond within a reasonable time and, in any event, within the timeframe required by applicable law.',
          ],
        },
        {
          heading: '9. Changes to this policy',
          body: [
            'We may update this policy as our practices, products, and legal obligations evolve. Material changes will be reflected in the "last updated" date at the top of this page. We encourage you to review this policy periodically.',
          ],
        },
        {
          heading: '10. Contact us',
          body: [
            `Questions, requests, or concerns about this policy or how your information is handled can be directed to ${SITE.email}.`,
          ],
        },
      ]}
    />
  );
}
