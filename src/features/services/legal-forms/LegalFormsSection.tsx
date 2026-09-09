import {
  BriefcaseBusiness,
  Store,
  Building2,
  Landmark,
  Layers3,
  Home,
} from "lucide-react";
import LegalFormCard from "./LegalFormCard";

const legalForms = [
  {
    title: "Entreprise individuelle",
    href: "/creer-mon-entreprise/entreprise-individuelle",
    icon: BriefcaseBusiness,
  },
  {
    title: "Micro entreprise",
    href: "/creer-mon-entreprise/micro-entreprise",
    icon: Store,
  },
  {
    title: "SARL",
    href: "/creer-mon-entreprise/sarl",
    icon: Building2,
  },
  {
    title: "EURL",
    href: "/creer-mon-entreprise/eurl",
    icon: Building2,
  },
  {
    title: "SAS",
    href: "/creer-mon-entreprise/sas",
    icon: Landmark,
  },
  {
    title: "SASU",
    href: "/creer-mon-entreprise/sasu",
    icon: Landmark,
  },
  {
    title: "Holding",
    href: "/creer-mon-entreprise/holding",
    icon: Layers3,
  },
  {
    title: "SCI",
    href: "/creer-mon-entreprise/sci",
    icon: Home,
  },
];

export default function LegalFormsSection() {
  return (
    <section className="py-12 px-6 lg:px-8 max-w-6xl mx-auto ">
      <div className="max-w-3xl mb-8 md:mb-10">
        <h2 className="text-h3-mobile md:text-h3 font-bold text-foreground">
          Les formes juridiques
        </h2>
        <p className="mt-2 text-muted-foreground">
          Choisissez la structure la plus adaptée à votre projet.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
        {legalForms.map((item) => (
          <LegalFormCard key={item.title} title={item.title} href={item.href} icon={item.icon} />
        ))}
      </div>
    </section>
  );
}