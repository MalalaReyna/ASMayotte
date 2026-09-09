import Link from "next/link";
import { ChevronRight, Building2, Scale, FileText, Building, Briefcase } from "lucide-react";
import { IService } from "@/interfaces/service/service";
import { slugify } from "@/helpers/stringHelper";

type ServicesGroupedResponse = {
  legalJuridicationList: IService[];
  serviceList: IService[];
};

interface ServiceDropdownContentProps {
  isMobile?: boolean;
  servicesData?: ServicesGroupedResponse;
}

type DropdownService = {
  id: string;
  title: string;
  href: string;
};

type DropdownCategory = {
  id: string;
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  services?: DropdownService[];
};


function getCategoryIcon(slug: string) {
  if (slug === "creer-mon-entreprise") return Building2;
  if (slug === "modifier-mon-entreprise") return Scale;
  if (slug === "reponse-marche-public" || slug === "reponse-marche-public") return FileText;
  if (slug === "gestion-administrative") return Building;
  return Building2;
}

function mapApiToDropdown(servicesData?: ServicesGroupedResponse): DropdownCategory[] {
  if (!servicesData) return [];

  const serviceList = servicesData.serviceList ?? [];
  const legalList = servicesData.legalJuridicationList ?? [];

  const creation = serviceList.find((s) => s.slug === "creer-mon-entreprise");

  const legalChildren: DropdownService[] = legalList.map((item) => {
    const itemSlug = item.slug && item.slug.length > 0 ? item.slug : slugify(item.name);
    return {
      id: item.id,
      title: item.name,
      href: "/creer-mon-entreprise/" + itemSlug,
    };
  });

  const categories: DropdownCategory[] = serviceList.map((item) => {
    const icon = getCategoryIcon(item.slug || "");
    const href = "/" + (item.slug || "");
    return {
      id: item.id,
      title: item.name,
      href,
      icon,
      services: item.slug === "creer-mon-entreprise" ? legalChildren : undefined,
    };
  });

  const orderedSlugs = [
    "creer-mon-entreprise",
    "modifier-mon-entreprise",
    "reponse-marche-public",
    "reponse-marche-public",
    "gestion-administrative",
  ];

  categories.sort((a, b) => {
    const aSlug = a.href.replace("/", "");
    const bSlug = b.href.replace("/", "");
    const ai = orderedSlugs.indexOf(aSlug);
    const bi = orderedSlugs.indexOf(bSlug);
    const safeA = ai === -1 ? 999 : ai;
    const safeB = bi === -1 ? 999 : bi;
    return safeA - safeB;
  });

  if (!creation && legalChildren.length > 0) {
    categories.unshift({
      id: "fallback-creation",
      title: "Création d'entreprise",
      href: "/creer-mon-entreprise",
      icon: Building2,
      services: legalChildren,
    });
  }

  return categories;
}

export default function ServiceDropdownContent({
  isMobile = false,
  servicesData,
}: ServiceDropdownContentProps) {
  const categories = mapApiToDropdown(servicesData);

  return (
    <div className={`${isMobile ? "w-fit text-xl" : "w-[26.25rem]"} p-2`}>
      <div className="grid grid-cols-1 gap-2">
        {categories.map((category) => (
          <div key={category.id} className="space-y-2">
            <Link
              href={category.href || "#"}
              className="group flex items-center justify-between rounded-lg px-3 py-2 transition-colors hover:bg-accent"
            >
              <div className="flex items-center gap-2">
                <category.icon className="h-4 w-4 text-primary" />
                <h3 className="text-md font-medium text-foreground">{category.title}</h3>
              </div>
              <ChevronRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>

            {category.services && category.services.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-2">
                {category.services.map((service) => (
                  <Link
                    key={service.id}
                    /* href={service.href} */
                    href={`/wizard?type=${slugify(service.title)}`}
                    className="group rounded-md border border-transparent px-3 py-2.5 transition-all hover:border-primary/20 hover:bg-primary/5"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-sm font-normal text-muted-foreground group-hover:text-foreground">
                        {service.title}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}