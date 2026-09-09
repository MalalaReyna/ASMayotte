import Link from "next/link";
import { FooterColumn } from "./FooterColumn";
import { footerColumns, socialLinks } from "./footerData";
import { FooterNewsletter } from "./FooterNewsletter";
import Image from "next/image";
export function FooterTop() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-8  mb-12 pb-12 border-b border-gray-200">
      <div className="lg:col-span-1 space-y-10">
        <div className="space-y-2">
          <Link href="/" aria-label="Retour vers accueil">
            <Image src="/images/as-mayotte-logo-min.png" alt="Logo" width={56} height={56} />
          </Link>
          <h2 className="text-lg text-primary">A&S Mayotte</h2>
          <p className="text-secondary text-sm">
            Simplifiez la création de votre entreprise à Mayotte et La Réunion avec notre plateforme 100% en ligne avec accompagnement juridique professionnel.
          </p>
        </div>
        <div className="flex gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              aria-label={social.name}
              className="w-8 h-8 rounded-full border border-gray-300 text-secondary hover:bg-primary hover:text-white hover:border-primary transition-colors flex items-center justify-center text-xs font-semibold"
            >
              <social.icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>

      {footerColumns.map((column) => (
        <FooterColumn key={column.title} {...column} />
      ))}

      <div className="lg:col-span-1">
        <FooterNewsletter />
      </div>
    </div>
  );
}
