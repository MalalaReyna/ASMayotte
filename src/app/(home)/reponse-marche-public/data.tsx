import AdvantageIllu from "@/components/illustrations/advantage-illu";
import HowIllu from "@/components/illustrations/how-illu";
import ThinkingIllu from "@/components/illustrations/thinking-illu";
import { IFAQItem } from "@/interfaces/faqItem";
import { InfoSectionData } from "@/types/sectionType";

export const faqItems: IFAQItem[] = [
  {
    id: "1",
    question: "Quels types de marchés accompagnez-vous ?",
    answer:
      "Travaux, services et fournitures : BTP/VRD, nettoyage, maintenance, transport/logistique, multi-services, etc.",
    categoryName: "Marché public",
  },
  {
    id: "2",
    question: "Est-ce que vous faites uniquement le mémoire technique ?",
    answer:
      "Non. Nous pouvons intervenir sur le mémoire technique seul, les pièces administratives seules, le chiffrage (BPU / DPGF / DQE) ou produire le dossier complet.",
    categoryName: "Marché public",
  },
  {
    id: "3",
    question: "Sous quels délais pouvez-vous produire un dossier ?",
    answer:
      "Selon la complexité du marché : entre 48h et 7 jours en général. Les délais sont confirmés après réception du DCE complet.",
    categoryName: "Marché public",
  },
  {
    id: "4",
    question: "Quels documents dois-je fournir ?",
    answer:
      "SIRET ou Kbis, coordonnées de l'entreprise, références et expériences, moyens humains et matériels, attestations disponibles et le DCE complet.",
    categoryName: "Marché public",
  },
  {
    id: "5",
    question: "Vous aidez pour DC1 / DC2 ou DUME ?",
    answer:
      "Oui. Nous remplissons et vérifions les pièces administratives (DC1, DC2, DUME) et nous assurons leur cohérence avec le mémoire technique.",
    categoryName: "Marché public",
  },
  {
    id: "6",
    question: "Vous faites le BPU / DPGF / DQE ?",
    answer:
      "Oui. Nous construisons ou vérifions les pièces de prix : BPU, DPGF et DQE, avec contrôle de cohérence et alignement avec le CCTP et les quantités.",
    categoryName: "Marché public",
  },
  {
    id: "7",
    question: "Est-ce que vous pouvez déposer le dossier à ma place ?",
    answer:
      "Nous pouvons vous accompagner pour le dépôt sur le profil acheteur et vérifier les fichiers finaux avant transmission.",
    categoryName: "Marché public",
  },
  {
    id: "8",
    question: "Et si le dossier est rejeté ?",
    answer:
      "Nous analysons les causes (pièce manquante, critère mal traité, problème de forme) et vous aidons à corriger pour les prochains appels d’offres.",
    categoryName: "Marché public",
  },
  {
    id: "9",
    question:
      "Travaillez-vous avec les entreprises de Mayotte et La Réunion qui veulent répondre en métropole ?",
    answer:
      "Oui. Nous adaptons le dossier au contexte : références, logistique, moyens mobilisables et délais.",
    categoryName: "Marché public",
  },
  {
    id: "10",
    question: "Mes informations sont-elles confidentielles ?",
    answer:
      "Oui. Confidentialité totale : vos prix, stratégies, références et documents restent strictement protégés.",
    categoryName: "Marché public",
  },
];

export const sections: InfoSectionData[] = [
  {
    title: "À qui s'adresse ce service ?",
    imagePosition: "left",
    illustration: <ThinkingIllu />,
    items: [
      {
        boldContent: "TPE / PME",
        content:
          " : qui répondent ou souhaitent répondre à des marchés publics.",
        variant: "point"
      },
      {
        boldContent: "Entreprises BTP / VRD / second œuvre",
        content:
          " : charpente, électricité, photovoltaïque et travaux techniques.",
        variant: "point"
      },
      {
        boldContent: "Entreprises de services",
        content:
          " : nettoyage, entretien, espaces verts et multi-services.",
        variant: "point"
      },
      {
        boldContent: "Transport & logistique",
        content:
          " : transport, manutention, location de véhicules.",
        variant: "point"
      },
      {
        boldContent: "Structures qui veulent structurer leur dossier",
        content:
          " : mémoire technique, prix et conformité administrative.",
        variant: "point"
      },
      {
        boldContent: "Entreprises de Mayotte et La Réunion",
        content:
          " : qui souhaitent également se positionner sur les marchés en métropole.",
        variant: "point"
      },
    ],
  },
  {
    title: "Les Avantages",
    imagePosition: "right",
    illustration: <AdvantageIllu />,
    items: [
      {
        boldContent: "Conformité & zéro oubli",
        content:
          " : vérification des pièces obligatoires, signatures et exigences du RC et CCAP.",
        variant: "check",
      },
      {
        boldContent: "Mémoire technique impactant",
        content:
          " : méthodologie claire, moyens humains et matériels détaillés.",
        variant: "check",
      },
      {
        boldContent: "Chiffrage sécurisé",
        content:
          " : cohérence entre BPU, DPGF, DQE et CCTP.",
        variant: "check",
      },
      {
        boldContent: "Gain de temps",
        content:
          " : vous restez concentré sur votre activité pendant que nous structurons le dossier.",
        variant: "check",
      },
      {
        boldContent: "Adapté au contexte local",
        content:
          " : logistique insulaire, délais d’approvisionnement et contraintes chantier.",
        variant: "check",
      },
      {
        boldContent: "Présentation professionnelle",
        content:
          " : dossier structuré, lisible avec tableaux, annexes et sommaire.",
        variant: "check",
      },
      {
        boldContent: "Accompagnement jusqu’au dépôt",
        content:
          " : assemblage final, contrôle qualité et assistance au dépôt.",
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
        boldContent: "Vous envoyez le DCE",
        content:
          " : transmission du dossier de consultation + informations de votre entreprise + date limite.",
        variant: "flow",
      },
      {
        boldContent: "Diagnostic & stratégie",
        content:
          " : analyse des critères, pièces éliminatoires et méthode de notation.",
        variant: "flow",
      },
      {
        boldContent: "Production du dossier",
        content:
          " : rédaction du mémoire technique + remplissage administratif + pièces de prix.",
        variant: "flow",
      },
      {
        boldContent: "Contrôle qualité",
        content:
          " : vérification de la cohérence entre CCTP, CCAP, mémoire et prix.",
        variant: "flow",
      },
      {
        boldContent: "Dossier final & dépôt",
        content:
          " : remise d’un dossier prêt à déposer et accompagnement si nécessaire.",
        variant: "flow",
        isLast: true,
      },
    ],
  },
];
