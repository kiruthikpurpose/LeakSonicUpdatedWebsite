import type { Metadata } from 'next';
import { LegalLayout } from '@/components/sections/LegalLayout';
import { buildMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  title: 'Terms of use',
  description:
    'Terms governing access to the LeakSonic website and the Sentrix platform materials published on it, including acceptable use, intellectual property, and liability terms.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of use"
      eyebrow="Legal"
      path="/terms"
      updated="8 July 2026"
      intro={`These terms of use ("Terms") govern access to and use of the website located at ${SITE.url} (the "Site"), operated by ${SITE.legalName} ("LeakSonic", "we", "us", or "our"). By accessing or using the Site, you agree to be bound by these Terms. If you are using the Site on behalf of an organisation, you represent that you have the authority to bind that organisation to these Terms.`}
      sections={[
        {
          heading: '1. Who we are',
          body: [
            `${SITE.legalName} is a company developing Sentrix, a pipeline integrity and inspection intelligence platform for gas transmission and distribution networks. The Site describes the Sentrix platform, publishes research and technical content, and provides ways for pipeline operators, government and regulatory bodies, researchers, and investors to contact us.`,
          ],
        },
        {
          heading: '2. Acceptance of terms',
          body: [
            'By accessing any page of the Site, submitting a form, or otherwise using its features, you agree to these Terms and to our Privacy Policy, which is incorporated into these Terms by reference. If you do not agree to these Terms, you should not access or use the Site.',
            'We may update these Terms from time to time to reflect changes in our products, legal requirements, or business practices. Where changes are material, we will update the "last updated" date at the top of this page. Continued use of the Site after an update constitutes acceptance of the revised Terms.',
          ],
        },
        {
          heading: '3. Use of the Site and its content',
          body: [
            'The written explainers, technical diagrams, glossary entries, research pages, and blog posts published on the Site (the "Content") are made available for your general information and for legitimate research, journalistic, and evaluative purposes. You may view, cite, and link to the Content, including with attribution in academic, journalistic, or professional work, provided that you do not materially alter its meaning or misrepresent it as your own original work.',
            'You may not use the Content to misrepresent LeakSonic’s development stage, technical claims, or commercial capabilities. Where the Site describes Sentrix as pre-pilot, under active development, or subject to ongoing validation, any citation or reproduction of that Content should preserve that framing rather than presenting it as a completed or commercially deployed capability.',
            'You may not scrape, systematically extract, or use automated means to reproduce substantial portions of the Site for the purpose of building a competing product or service, or in a manner that imposes an unreasonable load on our infrastructure. Reasonable, well-behaved indexing by search engines and AI answer-engine crawlers that respect our robots.txt and llms.txt directives is expressly permitted.',
          ],
        },
        {
          heading: '4. Acceptable use',
          body: [
            'You agree not to use the Site to: violate any applicable law or regulation; transmit any material that is unlawful, harassing, defamatory, or infringing; attempt to gain unauthorised access to any part of the Site, its underlying systems, or other users’ data; interfere with or disrupt the Site’s operation, including through denial-of-service activity; or impersonate any person or entity, or misrepresent your affiliation with any person or entity, when submitting a contact form.',
            'We reserve the right to restrict or terminate access to the Site, without notice, for any use we reasonably believe violates these Terms or poses a risk to the Site, its users, or LeakSonic.',
          ],
        },
        {
          heading: '5. Submissions through contact forms',
          body: [
            'When you submit information through one of the segmented contact forms on the Site (operator, government/agency, researcher, or investor), you represent that the information you provide is accurate and that you have the right to share it with us. Submissions are handled as described in our Privacy Policy.',
            'Submitting an inquiry through the Site does not, by itself, create any partnership, pilot, investment, contractual, or other commercial commitment between you and LeakSonic. Any such commitment would be governed by a separate, mutually executed agreement.',
          ],
        },
        {
          heading: '6. Intellectual property',
          body: [
            'The LeakSonic and Sentrix names, logos, and brand marks, together with the design, layout, diagrams, and underlying code of the Site, are the property of LeakSonic Private Limited or its licensors and are protected by applicable intellectual property laws. Nothing in these Terms grants you any right, title, or interest in that intellectual property beyond the limited licence to view and cite Content described in Section 3.',
            'All third-party trademarks, service marks, and trade names referenced on the Site - including references to standards bodies, satellite programmes, and regulatory frameworks - remain the property of their respective owners and are used for identification and descriptive purposes only. Their use does not imply endorsement of LeakSonic by those owners.',
          ],
        },
        {
          heading: '7. No warranty',
          body: [
            'The Site and its Content are provided on an "as is" and "as available" basis, without warranties of any kind, whether express, implied, or statutory, including implied warranties of merchantability, fitness for a particular purpose, or non-infringement.',
            'Technical descriptions, research citations, and validation status described on the Site reflect our current understanding and ongoing work and are subject to change as our research and development progresses. Nothing on the Site constitutes a guarantee of the future performance, accuracy, or commercial availability of the Sentrix platform, and nothing on the Site should be relied upon as a substitute for independent technical, legal, or regulatory advice.',
          ],
        },
        {
          heading: '8. Limitation of liability',
          body: [
            'To the fullest extent permitted by applicable law, LeakSonic Private Limited, its officers, employees, and affiliates will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenue, data, or goodwill, arising out of or in connection with your access to or use of, or inability to access or use, the Site, even if we have been advised of the possibility of such damages.',
            'Nothing in these Terms is intended to exclude or limit any liability that cannot be excluded or limited under applicable law.',
          ],
        },
        {
          heading: '9. Third-party links and services',
          body: [
            'The Site may link to third-party websites, public data sources, or services that are not owned or controlled by LeakSonic. We are not responsible for the content, accuracy, or practices of any third-party site or service, and inclusion of a link does not imply our endorsement.',
          ],
        },
        {
          heading: '10. Governing law',
          body: [
            `These Terms are governed by the laws of India, without regard to its conflict-of-law principles. Any dispute arising out of or relating to these Terms or your use of the Site will be subject to the exclusive jurisdiction of the courts located in Coimbatore, Tamil Nadu, India, unless otherwise required by applicable law.`,
          ],
        },
        {
          heading: '11. Changes to the Site',
          body: [
            'We are actively developing the Sentrix platform and the content, structure, and features of this Site accordingly. We may add, remove, or modify pages, features, or Content at any time without prior notice, as our product and research continue to develop.',
          ],
        },
        {
          heading: '12. Contact',
          body: [`Questions about these Terms can be directed to ${SITE.email}.`],
        },
      ]}
    />
  );
}
