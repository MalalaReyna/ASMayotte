import ServicePageFAQSection from "@/features/services/ServicePageFAQSection";
import ServicePageHeroSection from "@/features/services/ServicePageHeroSection";
import PublicTenderExperience from "@/features/services/public-market/PublicTenderExperience";
import { REPONSE_MARCHE_PUBLIC_SLUG } from "@/constants/slug";
import { getServiceBySlug } from "@/services/serviceClass/serviceClassService";
import { Metadata } from "next";

export const revalidate = 120; // Revalider les données toutes les 120 secondes


export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Réponse aux marchés publics | AS Mayotte",
    description: "Répondez aux appels d’offres avec un dossier solide et conforme. A&S Mayotte transformons votre DCE en une candidature claire, structurée et compétitive."
  };
}

export default async function ReponseMarchePublicPage() {
  const serviceData = await getServiceBySlug(REPONSE_MARCHE_PUBLIC_SLUG);

  const heroTitle =
    serviceData?.infoServiceData?.H1?.title ||
    "Réponse aux marchés publics";

  const heroSubtitle =
    serviceData?.infoServiceData?.H1?.description ||
    "Répondez aux appels d’offres avec un dossier solide et conforme. Nous transformons votre DCE en une candidature claire, structurée et compétitive : mémoire technique, pièces administratives et chiffrage.";

  const cardsData = [
    {
      value: "128",
      title: "Marchés détectés",
      description: "Total de marchés.",
      icon: "file",
    },
    {
      value: "7",
      title: "Territoires couverts",
      description: "Mayotte, Réunion, Guyane, Antilles et métropole.",
      icon: "globe",
    },
    {
      value: "+80",
      title: "Dossiers accompagnés",
      description: "Mémoire, DC1/DC2, BPU, DPGF, DQE.",
      icon: "shield",
    },
    {
      value: "48h-7j",
      title: "Production",
      description: "Selon urgence, complexité et disponibilité DCE.",
      icon: "zap",
    },
  ];
  const imgProps = cardsData && cardsData.length > 0 ? {
    imgSrc: "/images/people/homme1.png",
    imgWidth: 1070,
    imgHeight: 780,
    imgClassName: "absolute -bottom-190 2xl:-right-100",
    imgAlt: "Illustration réponse marché public"
  } : {
    imgSrc: "/images/people/homme1.png",
    imgWidth: 826,
    imgHeight: 780,
    imgClassName: "absolute -bottom-190 2xl:-right-70",
    imgAlt: "Illustration réponse marché public"
  };

  return (
    <>
      <ServicePageHeroSection
        title={heroTitle}
        subtitle={heroSubtitle}
        ctaTitle="Voir les marchés en cours"
        ctaLink="#marches"
        ctaTitle2="Demander un devis"
        ctaLink2="#marches"
        imgProps={imgProps}
        isCardsData={true}
      />

      <PublicTenderExperience />

      <ServicePageFAQSection faqItems={serviceData?.faqList || []} />
    </>
  );
}