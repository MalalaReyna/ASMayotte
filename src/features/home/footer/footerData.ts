import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export const footerColumns: FooterColumn[] = [
  {
    title: 'Services',
    links: [
      { label: "Création d'entreprise", href: '/creer-mon-entreprise' },
      { label: "Modification d'entreprise", href: '/modifier-mon-entreprise' },
      { label: 'Réponse au marché public', href: '/reponse-marche-public' },
      { label: "Gestion administrative", href: '/gestion-administrative' },
    ],
  },
  {
    title: 'Entreprise',
    links: [
      { label: 'À propos', href: '#' },
      { label: 'Notre processus', href: '#' },
      { label: 'Témoignages', href: '#' },
      { label: 'Blog', href: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Centre d\'aide', href: '#' },
      { label: 'Documentation', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'FAQ', href: '#' },
    ],
  },
];

export const socialLinks = [
  { name: 'Facebook', href: 'https://www.facebook.com/p/As-Mayotte-100090045342279/', icon: Facebook },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/cabinet-as-mayotte/', icon: Linkedin },
  { name: 'Instagram', href: 'https://www.instagram.com/cabinet_mayotte/', icon: Instagram },
];
