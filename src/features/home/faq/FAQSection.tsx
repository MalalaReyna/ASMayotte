import { FAQAccordion } from "@/components/faq/faq-accordion";

import { FAQHeader } from "@/components/faq/faq-header";
import { IFAQItem } from "@/interfaces/faqItem";
const faqTitle = "Vos questions, nos réponses";
const faqDescription = "Tout ce que vous devez savoir sur la création d'entreprise à Mayotte et La Réunion";
export function FAQSection({ faqItems }: { faqItems: IFAQItem[] }) {
  return (
    <div className="bg-surface">
      <article
        className="py-16 sm:py-20 lg:py-24 px-6 lg:px-8 max-w-6xl mx-auto"
        aria-labelledby="faq-heading"
      >
        <FAQHeader title={faqTitle} description={faqDescription} />
        <FAQAccordion faqItems={faqItems} />
      </article>
    </div>
  );
}
