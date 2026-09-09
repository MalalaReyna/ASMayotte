import AdvantageIllu from "@/components/illustrations/advantage-illu";
import HowIllu from "@/components/illustrations/how-illu";
import ThinkingIllu from "@/components/illustrations/thinking-illu";
import { IFAQItem } from "@/interfaces/faqItem";
import { InfoSectionData } from "@/types/sectionType";

export const faqItems: IFAQItem[] = [
  {
    id: "1",
    question: "Pouvez-vous préparer les contrats de travail ?",
    answer:
      "Oui, nous pouvons vous accompagner dans la rédaction et la préparation de vos contrats de travail, avenants et documents liés à l’embauche.",
    categoryName: "Gestion administrative",
  },
  {
    id: "2",
    question: "Pouvez-vous nous aider pour une embauche ?",
    answer:
      "Oui, nous accompagnons les entreprises dans la gestion administrative liée à l’embauche, depuis la préparation des documents jusqu’au suivi administratif du salarié.",
    categoryName: "Gestion administrative",
  },
  {
    id: "3",
    question: "Pouvez-vous intervenir sur la paie ?",
    answer:
      "Oui, nous accompagnons les entreprises dans le traitement et le suivi administratif de la paie, avec une organisation claire, réactive et adaptée à leurs besoins.",
    categoryName: "Gestion administrative",
  },
  {
    id: "4",
    question: "Pouvez-vous nous accompagner en cas de licenciement ou de procédure disciplinaire ?",
    answer:
      "Oui, nous pouvons préparer les documents administratifs nécessaires et vous accompagner dans le suivi de la procédure.",
    categoryName: "Gestion administrative",
  },
  {
    id: "5",
    question: "Travaillez-vous uniquement à Mayotte ?",
    answer:
      "Non, nous accompagnons les entreprises à Mayotte et à La Réunion.",
    categoryName: "Gestion administrative",
  },
  {
    id: "6",
    question: "Proposez-vous un accompagnement ponctuel ou mensuel ?",
    answer:
      "Les deux. Nous pouvons intervenir sur un besoin précis ou mettre en place un accompagnement régulier.",
    categoryName: "Gestion administrative",
  },
  {
    id: "7",
    question: "Pourquoi externaliser sa gestion administrative, RH et paie ?",
    answer:
      "Parce que cela permet de gagner du temps, de mieux s’organiser, de sécuriser ses démarches et de se concentrer sur le développement de son activité.",
    categoryName: "Gestion administrative",
  },
];

export const sections: InfoSectionData[] = [
  {
    title: "À qui s'adresse ce service ?",
    imagePosition: "left",
    illustration: <ThinkingIllu />,
    items: [
      {
        boldContent: "Créateurs d’entreprise",
        content: " : pour structurer leur gestion administrative dès le démarrage.",
        variant: "point",
      },
      {
        boldContent: "TPE / PME / associations / commerces",
        content: " : pour externaliser tout ou partie de leur gestion quotidienne.",
        variant: "point",
      },
      {
        boldContent: "Entreprises du BTP, nettoyage, transport, restaurants et hôtels",
        content: " : pour gérer efficacement les obligations RH, sociales et paie.",
        variant: "point",
      },
      {
        boldContent: "Entreprises en croissance et employeurs qui recrutent",
        content: " : pour gagner du temps et éviter les erreurs administratives.",
        variant: "point",
      },
      {
        boldContent: "Dirigeants",
        content: " : qui souhaitent externaliser leur gestion administrative, RH et paie.",
        variant: "point",
      },
      {
        boldContent: "Structures à Mayotte et à La Réunion",
        content: " : qui recherchent un accompagnement local, réactif et structuré.",
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
        boldContent: "Accompagnement personnalisé",
        content: " : une solution adaptée à votre activité, votre effectif et vos besoins.",
        variant: "check",
      },
      {
        boldContent: "Service rapide et express",
        content: " : pour traiter vos urgences administratives, RH ou paie.",
        variant: "check",
      },
      {
        boldContent: "Gain de temps pour le dirigeant",
        content: " : vous vous concentrez sur votre activité pendant que nous gérons l’administratif.",
        variant: "check",
      },
      {
        boldContent: "Meilleure organisation administrative",
        content: " : dossiers, documents et suivis structurés de façon professionnelle.",
        variant: "check",
      },
      {
        boldContent: "Gestion RH plus fluide",
        content: " : un accompagnement concret sur les contrats, absences, embauches et suivi salarié.",
        variant: "check",
      },
      {
        boldContent: "Réduction des erreurs",
        content: " : des démarches mieux préparées et plus sécurisées.",
        variant: "check",
      }
    ],
  },
  {
    title: "Comment ça marche ?",
    imagePosition: "left",
    illustration: <HowIllu />,
    items: [
      {
        boldContent: "Prise de contact",
        content: " : vous nous expliquez votre activité, votre besoin et vos urgences.",
        variant: "flow",
      },
      {
        boldContent: "Analyse de votre situation",
        content: " : nous identifions les démarches, documents et besoins RH, administratifs ou paie à traiter.",
        variant: "flow",
      },
      {
        boldContent: "Préparation et traitement",
        content: " : nous préparons les documents, structurons le suivi et mettons en place les actions nécessaires.",
        variant: "flow",
      },
      {
        boldContent: "Accompagnement personnalisé",
        content: " : nous vous accompagnons dans le suivi de vos salariés, de vos formalités et de votre organisation interne.",
        variant: "flow",
      },
      {
        boldContent: "Suivi continu",
        content: " : nous restons disponibles pour vos nouveaux besoins administratifs, RH, sociaux ou paie.",
        variant: "flow",
        isLast: true,
      },
    ],
  },
];