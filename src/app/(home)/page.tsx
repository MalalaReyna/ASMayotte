import { ContactSection } from "@/features/home/contact/ContactSection";
import { ExpertsSection } from "@/features/home/experts/ExpertSection";
import { FAQSection } from "@/features/home/faq/FAQSection";
import { HeroSection } from "@/features/home/hero/HeroSection";
import PartenaireSection from "@/features/home/partenaire/PartenaireSection";
import ServiceSection from "@/features/home/service/ServiceSection";
import AnalyseMarche from "@/features/home/analyse-marche/AnalyseMarche";
import MarcheActuel from "@/features/home/marche-actuel/marche-actuel";
import TarifSection from "@/features/home/tarif/TarifSection";
import { TestimonialsSection } from "@/features/home/testimonials/TestimonialsSection";
import WorkflowSection from "@/features/home/workflow/WorkflowSection";
import { IExpert } from "@/interfaces/expert";
import { Testimonial } from "@/interfaces/testimonial";
import { getAllExperts } from "@/services/experts/expertService";
import { getAllHomeFAQItems } from "@/services/faq/faqService";
import { getAllTesti } from "@/services/testimonial/testimonialService";

export default async function HomePage() {
    const faqItemsResponse = await getAllHomeFAQItems();
    const faqItems = faqItemsResponse ? faqItemsResponse.data : [];
    const testiResponse = await getAllTesti();
    const expertItemsResponse = await getAllExperts();
    let expertItems;
    //si reponse ok, on ajoute a chaque imageUrl d'expert le prefix de l'url du back
    if (expertItemsResponse && expertItemsResponse.data) {
        expertItemsResponse.data.forEach(expert => {
            expert.imageUrl = process.env.NEXT_PUBLIC_BACK_URL + expert.imageUrl;
        }
        );
        expertItems = expertItemsResponse.data;
    }
    else {
        expertItems = [] as IExpert[];
    }
    let testiItems;
    if (testiResponse && testiResponse.data) {
        testiResponse.data.forEach(testi => {
            testi.imageUrl = process.env.NEXT_PUBLIC_BACK_URL + testi.imageUrl;
        }
        );
        testiItems = testiResponse.data;
    }
    else {
        testiItems = [] as Testimonial[];
    }
    return (
        <>
            <HeroSection />
            <PartenaireSection />
            <WorkflowSection />
            <AnalyseMarche />
             <MarcheActuel />
            <ServiceSection />
            <TarifSection />
            <TestimonialsSection testi={testiItems} />
            <ExpertsSection experts={expertItems} />
            <FAQSection faqItems={faqItems} />
            <ContactSection />
        </>
    )
}