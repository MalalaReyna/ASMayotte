import { faqItems } from "@/features/home/faq/faqData";
import ServicePageFAQSection from "@/features/services/ServicePageFAQSection";
import ServicePageHeroSection from "@/features/services/ServicePageHeroSection";
import ServicePageInfoSection from "@/features/services/ServicePageInfoSection";
import { GESTION_ADMINISTRATIVE_SLUG } from "@/constants/slug";
import { getServiceBySlug } from "@/services/serviceClass/serviceClassService";
import { Metadata } from "next";
import { buildSectionsFromService } from "@/helpers/sectionHelper";

export const revalidate = 120; // Revalider les données toutes les 120 secondes

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Gestion administrative, RH & paie à Mayotte et La Réunion | A&S Mayotte",
    description:
      "A&S Mayotte accompagne les entreprises de Mayotte et de La Réunion dans leur gestion administrative, RH, sociale et paie : contrats de travail, embauche, documents employeur, suivi du personnel et accompagnement personnalisé.",
  };
}

export default async function GestionAdministrativePage() {
  const serviceData = await getServiceBySlug(GESTION_ADMINISTRATIVE_SLUG);

  const sections = buildSectionsFromService(serviceData);

  const heroTitle =
    serviceData?.infoServiceData?.H1?.title ||
    "Gestion administrative, RH & paie à Mayotte et la Réunion";

  const heroSubtitle =
    serviceData?.infoServiceData?.H1?.description ||
    "Confiez la gestion administrative, sociale, RH et la paie de votre entreprise à une équipe réactive, structurée et proche de vos réalités locales. A&S Mayotte accompagne les professionnels de Mayotte et de La Réunion avec un suivi rapide, personnalisé et efficace.";

  const imgProps = {
    imgSrc: "/images/people/homme1.png",
    imgWidth: 826,
    imgHeight: 780,
    imgClassName: "absolute -bottom-190 2xl:-right-70",
    imgAlt: "Illustration gestion administrative",
  };

  return (
    <>
      <ServicePageHeroSection
        title={heroTitle}
        subtitle={heroSubtitle}
        ctaTitle="Générer des contrats"
        imgProps={imgProps}
      />

      <ServicePageInfoSection sections={sections} />

      <ServicePageFAQSection faqItems={serviceData?.faqList || []} />
    </>
  );
}