import { faqItems } from "@/features/home/faq/faqData";
import ServicePageFAQSection from "@/features/services/ServicePageFAQSection";
import ServicePageHeroSection from "@/features/services/ServicePageHeroSection";
import ServicePageInfoSection from "@/features/services/ServicePageInfoSection";
import { MODIFICATION_ENTREPRISE_SLUG } from "@/constants/slug";
import { getServiceBySlug } from "@/services/serviceClass/serviceClassService";
import { Metadata } from "next";
import { buildSectionsFromService } from "@/helpers/sectionHelper";

export const revalidate = 120; // Revalider les données toutes les 120 secondes

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Modification d'entreprise à Mayotte | AS Mayotte",
    description:
      "Modification d'entreprise simplifiée et facile à Mayotte avec A&S Mayotte. Changement d'adresse, d'activité, de dirigeant ou de statuts : AS Mayotte vous accompagne dans toutes vos démarches de modification d'entreprise.",
  };
}

export default async function ModificationEntreprisePage() {
  const serviceData = await getServiceBySlug(MODIFICATION_ENTREPRISE_SLUG);

  const sections = buildSectionsFromService(serviceData);

  const heroTitle =
    serviceData?.infoServiceData?.H1?.title ||
    "Modification d'entreprise à Mayotte : rapide et conforme";

  const heroSubtitle =
    serviceData?.infoServiceData?.H1?.description ||
    "Besoin de modifier les statuts de votre entreprise ? Changer d'adresse, d'activité, ou de dirigeant ? A&S Mayotte vous accompagne dans toutes vos démarches de modification d'entreprise, avec un service rapide et conforme.";

  const imgProps = {
    imgSrc: "/images/people/homme1.png",
    imgWidth: 826,
    imgHeight: 780,
    imgClassName: "absolute -bottom-190 2xl:-right-70",
    imgAlt: "Illustration modification entreprise",
  };

  return (
    <>
      <ServicePageHeroSection
        title={heroTitle}
        subtitle={heroSubtitle}
        /* ctaLink="/wizard" */
        ctaTitle="Modifier mon entreprise"
        imgProps={imgProps}
      />

      <ServicePageInfoSection sections={sections} />

      <ServicePageFAQSection faqItems={serviceData?.faqList || []} />
    </>
  );
}