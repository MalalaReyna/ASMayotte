import { notFound } from "next/navigation";
import ServicePageInfoSection from "@/features/services/ServicePageInfoSection";
import ServicePageFAQSection from "@/features/services/ServicePageFAQSection";
import ServicePageHeroSection from "@/features/services/ServicePageHeroSection";
import { Metadata } from "next";
import { getServiceBySlug } from "@/services/serviceClass/serviceClassService";
import { buildSectionsFromService } from "@/helpers/sectionHelper";
type PageProps = {
  params: Promise<{ type_societe: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type_societe } = await params;
  const serviceData = await getServiceBySlug(type_societe);

  if (!serviceData) {
    return {
      title: "Service introuvable | AS Mayotte",
      description: "Le service demandé est introuvable.",
    };
  }

  return {
    title:
      "Création "+serviceData.serviceName+" | AS Mayotte" ||
      "Création d'entreprise | AS Mayotte",
    description:
      serviceData.serviceDescription ||
      "Découvrez nos services de création d'entreprise à Mayotte.",
  };
}

export default async function CreationSocieteTypePage({ params }: PageProps) {
  const { type_societe } = await params;
  const serviceData = await getServiceBySlug(type_societe);

  if (!serviceData) {
    return notFound();
  }

  const sections = buildSectionsFromService(serviceData);

  const imgProps = {
    imgSrc: "/images/people/homme1.png",
    imgWidth: 826,
    imgHeight: 780,
    imgClassName: "absolute -bottom-190 2xl:-right-70",
    imgAlt: `Illustration ${serviceData.serviceName}`,
  };

  const heroTitle =
    serviceData.infoServiceData?.H1?.title || serviceData.serviceName;

  const heroSubtitle =
    serviceData.infoServiceData?.H1?.description || serviceData.serviceDescription;

  const ctaLink = serviceData.buttonUrl || `/wizard?type=${type_societe}`;

  return (
    <>
      <ServicePageHeroSection
        title={heroTitle}
        subtitle={heroSubtitle}
        ctaLink={ctaLink}
        ctaTitle={`Créer ${serviceData.serviceName}`}
        imgProps={imgProps}
      />
      <ServicePageInfoSection sections={sections} />
      <ServicePageFAQSection faqItems={serviceData?.faqList || []} />
    </>
  );
}