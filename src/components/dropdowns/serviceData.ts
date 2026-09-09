import {
  Building2,
  Briefcase,
  FileText,
  Scale,
  LucideIcon,
  Building,
} from "lucide-react";

export interface ServiceNavlink {
  id: string;
  title: string;
  icon: LucideIcon;
  href: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  icon: LucideIcon;
  href?: string;
  services?: ServiceNavlink[];
}

export const servicesData: ServiceCategory[] = [
  {
    id: "creer-mon-entreprise",
    title: "Création d'entreprise",
    icon: Building2,
    href:"/creer-mon-entreprise",
    services: [
      {
        id: "entreprise-individuelle",
        title: "Entreprise Individuelle",
        icon: Briefcase,
        href: "/wizard?type=EI",
      },
      {
        id: "micro-entreprise",
        title: "Micro-Entreprise",
        icon: Briefcase,
        href: "/wizard?type=Micro-Entreprise",
      },
      {
        id: "sarl",
        title: "SARL",
        icon: Briefcase,
        href: "/wizard?type=SARL",
      },
      {
        id: "eurl",
        title: "EURL",
        icon: Briefcase,
        href: "/wizard?type=EURL",
      },
      {
        id: "sas",
        title: "SAS",
        icon: Briefcase,
        href: "/wizard?type=SAS",
      },
      {
        id: "sasu",
        title: "SASU",
        icon: Briefcase,
        href: "/wizard?type=SASU",
      },
      {
        id: "holding",
        title: "Holding",
        icon: Briefcase,
        href: "/wizard?type=Holding",
      },
      {
        id: "sci",
        title: "SCI",
        icon: Briefcase,
        href: "/wizard?type=SCI",
      },
    ],
  },
  {
    id: "modifier-mon-entreprise",
    title: "Modification d'entreprise",
    icon: Scale,
    href: "/modifier-mon-entreprise",
  },
  {
    id: "marches-publics",
    title: "Réponse aux Marchés Publics",
    icon: FileText,
    href: "/reponse-marche-public",
  },
  {
    id: "gestion-administrative",
    title: "Gestion administrative",
    icon: Building,
    href: "/gestion-administrative",
  },
];
