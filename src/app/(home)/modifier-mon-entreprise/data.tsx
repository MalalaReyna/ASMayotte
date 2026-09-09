import AdvantageIllu from "@/components/illustrations/advantage-illu";
import HowIllu from "@/components/illustrations/how-illu";
import ThinkingIllu from "@/components/illustrations/thinking-illu";
import { IFAQItem } from "@/interfaces/faqItem";
import { InfoSectionData } from "@/types/sectionType";

export const faqItems: IFAQItem[] = [
  {
    id: "1",
    question: "Quels types de modifications pouvez-vous gérer ?",
    answer:
      "Nous gérons les modifications de statuts, de siège social, d'activité, de dirigeant, et bien plus.",
    categoryName: "Modification d'entreprise",
  },
  {
    id: "2",
    question: "Combien de temps prend une modification d'entreprise ?",
    answer:
      "Le délai dépend du type de modification, mais en général, cela prend entre 7 et 15 jours.",
    categoryName: "Modification d'entreprise",
  },
  {
    id: "3",
    question: "Quels documents sont nécessaires pour une modification ?",
    answer:
      "Cela dépend de la modification, mais généralement, les statuts mis à jour, un justificatif d'adresse, et une pièce d'identité sont requis.",
    categoryName: "Modification d'entreprise",
  },
  {
    id: "4",
    question: "Pouvez-vous gérer les formalités administratives ?",
    answer:
      "Oui, nous nous occupons de toutes les démarches auprès des organismes compétents.",
    categoryName: "Modification d'entreprise",
  },
  {
    id: "5",
    question: "Est-ce que je peux modifier plusieurs éléments en même temps ?",
    answer:
      "Oui, il est possible de modifier plusieurs éléments en une seule démarche.",
    categoryName: "Modification d'entreprise",
  },
];

export const sections: InfoSectionData[] = [
  {
    title: "À qui s'adresse ce service ?",
    imagePosition: "left",
    illustration: <ThinkingIllu />,
    items: [
      {
        boldContent: "Entrepreneurs individuels",
        content: " : qui souhaitent mettre à jour leur activité ou leur adresse.",
        variant: "point",
      },
      {
        boldContent: "TPE/PME",
        content: " : qui doivent modifier leurs statuts ou leur dirigeant.",
        variant: "point",
      },
      {
        boldContent: "Associations",
        content: " : qui souhaitent mettre à jour leur bureau ou leur objet social.",
        variant: "point",
      },
      {
        boldContent: "Dirigeants",
        content: " : qui veulent s'assurer que leurs modifications sont conformes.",
        variant: "point",
      },
    ],
  },
  {
    title: "Les Avantages",
    imagePosition: "right",
    illustration: <AdvantageIllu />,
    items: [
      {
        boldContent: "Rapide",
        content: " : des démarches simplifiées pour un traitement accéléré.",
        variant: "check",
      },
      {
        boldContent: "Conforme",
        content: " : respect des obligations légales et administratives.",
        variant: "check",
      },
      {
        boldContent: "Accompagnement",
        content: " : un suivi personnalisé à chaque étape.",
        variant: "check",
      },
      {
        boldContent: "Économique",
        content: " : des tarifs compétitifs pour un service complet.",
        variant: "check",
      },
    ],
  },
  {
    title: "Comment ça marche ?",
    imagePosition: "left",
    illustration: <HowIllu />,
    items: [
      {
        boldContent: "Contactez-nous",
        content: " : décrivez les modifications à effectuer.",
        variant: "flow",
      },
      {
        boldContent: "Analyse de votre demande",
        content: " : nous vérifions les documents nécessaires.",
        variant: "flow",
      },
      {
        boldContent: "Rédaction des documents",
        content: " : mise à jour des statuts ou autres pièces.",
        variant: "flow",
      },
      {
        boldContent: "Dépôt du dossier",
        content: " : nous gérons les formalités auprès des organismes.",
        variant: "flow",
      },
      {
        boldContent: "Validation",
        content: " : vous recevez les documents officiels mis à jour.",
        variant: "flow",
        isLast: true,
      },
    ],
  },
];