import { faqItems } from "@/features/home/faq/faqData";
import LegalFormsSection from "@/features/services/legal-forms/LegalFormsSection";
import ServicePageFAQSection from "@/features/services/ServicePageFAQSection";
import ServicePageHeroSection from "@/features/services/ServicePageHeroSection";
import ServicePageInfoSection from "@/features/services/ServicePageInfoSection";
import { CREATION_ENTREPRISE_SLUG } from "@/constants/slug";
import { getServiceBySlug } from "@/services/serviceClass/serviceClassService";
import { Metadata } from "next";
import { buildSectionsFromService } from "@/helpers/sectionHelper";

export const revalidate = 120; // Revalider les données toutes les 120 secondes

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Création entreprise et association à Mayotte | AS Mayotte",
    description:
      "Création facile d'entreprises et d'associations à Mayotte avec A&S Mayotte. SARL, SARLU, SAS, SASU, micro-entreprise, A&S Mayotte simplifie les démarches administratives.",
  };
}

export default async function CreationSocietePage() {
  const serviceData = await getServiceBySlug(CREATION_ENTREPRISE_SLUG);

  const sections = buildSectionsFromService(serviceData);

  const heroTitle =
    serviceData?.infoServiceData?.H1?.title ||
    "Création d'entreprises et d'associations à Mayotte";

  const heroSubtitle =
    serviceData?.infoServiceData?.H1?.description ||
    "Créer une entreprise ou une association implique de définir son statut et d’effectuer les démarches administratives et légales requises. Avec A&S Mayotte, la création d’entreprise devient un jeu d’enfant. Que vous lanciez une activité lucrative ou un projet associatif, nous transformons la barrière administrative en un tremplin.";

  const imgProps = {
    imgSrc: "/images/people/homme1.png",
    imgWidth: 826,
    imgHeight: 780,
    imgClassName: "absolute -bottom-190 2xl:-right-70",
    imgAlt: "Illustration de la création d'entreprise",
  };

  return (
    <>
      <ServicePageHeroSection
        title={heroTitle}
        subtitle={heroSubtitle}
        ctaLink="/wizard"
        ctaTitle="Créer mon entreprise"
        imgProps={imgProps}
      />
      <LegalFormsSection />
      <ServicePageInfoSection sections={sections} />
      <ServicePageFAQSection faqItems={serviceData?.faqList || []} />
    </>
  );
}