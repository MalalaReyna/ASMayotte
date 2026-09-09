import { FAQAccordion } from "@/components/faq/faq-accordion";
import { FAQHeader } from "@/components/faq/faq-header";
import { IFAQItem } from "@/interfaces/faqItem";
interface ServicePageFAQSectionProps {
    faqItems: IFAQItem[];
}
export default function ServicePageFAQSection({faqItems}: ServicePageFAQSectionProps) {
    return (
        <div className="bg-surface">
            <article
                className="py-16 sm:py-20 lg:py-24 px-6 lg:px-8 max-w-6xl mx-auto"
                aria-labelledby="faq-heading"
            >
                <FAQHeader title="Vos questions, nos réponses" description="Tout ce que vous devez savoir sur la création d'entreprise à Mayotte et La Réunion" />
                <FAQAccordion faqItems={faqItems} />
            </article>
        </div>
    )
}