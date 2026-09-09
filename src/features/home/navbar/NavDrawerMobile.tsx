import { Button } from "@/components/ui/button";
import { NavItem } from "@/interfaces/navItem";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import ServiceDropdownContent from "@/components/dropdowns/ServiceDropdownContent";
import { usePathname } from "next/navigation";
import { IService } from "@/interfaces/service/service";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

type ServicesGroupedResponse = {
  legalJuridicationList: IService[];
  serviceList: IService[];
};

interface NavDrawerMobileProps {
  navItems: NavItem[];
  isOpen: boolean;
  close: () => void;
  servicesData?: ServicesGroupedResponse;
}

const CONTACT = {
  phoneDisplay: "+262 09 72 10 31 26",
  phoneHref: "+2620639951628",
  email: "contact@asmayotte.com",
  address: "12 Rue Exemple, 97600 Mamoudzou, Mayotte",
};

function formatIndex(i: number) {
  return String(i + 1).padStart(2, "0");
}

export default function NavDrawerMobile({
  navItems,
  isOpen,
  close,
  servicesData,
}: NavDrawerMobileProps) {
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);

  const pathname = usePathname();
  useEffect(() => {
    if (isOpen) {
      close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const toggleServiceDropdown = () => {
    setIsServiceDropdownOpen((prev) => !prev);
  };
  const session = useSession();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-[60] md:hidden">
          {/* Overlay */}
          <button
            aria-label="Close menu overlay"
            onClick={close}
            className="absolute inset-0 bg-black/40"
          />

          {/* Panel */}
          <motion.div
            className="absolute inset-0 bg-white flex flex-col p-6"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.25 }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between">
              <Image
                src="/images/as-mayotte-logo-min.png"
                alt="Logo"
                width={40}
                height={40}
              />

              <button
                onClick={close}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto mt-12 pr-2">
              {/* Links */}
              <div className="flex flex-col gap-7">
                {navItems.map((item, i) => (
                  <div key={item.label}>
                    {item.label === "Services" ? (
                      <>
                        <button
                          onClick={toggleServiceDropdown}
                          className="group flex items-center justify-between w-full text-left"
                        >
                          <div className="flex items-baseline gap-4">
                            <span className="text-sm font-semibold text-muted-foreground tabular-nums">
                              {formatIndex(i)}
                            </span>

                            <span className="text-3xl font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors">
                              {item.label}
                            </span>
                          </div>

                          <ChevronDown
                            className={`w-5 h-5 text-muted-foreground transition-transform ${isServiceDropdownOpen ? "rotate-180" : ""
                              }`}
                          />
                        </button>

                        {isServiceDropdownOpen && (
                          <div className="mt-4 pl-4">
                            <ServiceDropdownContent isMobile={true} servicesData={servicesData} />
                          </div>
                        )}
                      </>
                    ) : (
                      <a
                        href={item.href || "#"}
                        onClick={close}
                        className="group flex items-baseline gap-4"
                      >
                        <span className="text-sm font-semibold text-muted-foreground tabular-nums">
                          {formatIndex(i)}
                        </span>

                        <span className="text-3xl font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors">
                          {item.label}
                        </span>
                      </a>
                    )}
                  </div>
                ))}
              </div>

              {/* Contact infos */}
              <div className="mt-10 rounded-2xl border border-border bg-muted/30 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Infos de contact
                </p>

                <div className="mt-4 flex flex-col gap-4">
                  <a
                    href={`tel:${CONTACT.phoneHref}`}
                    className="flex items-center gap-3 text-base font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    <Phone className="h-5 w-5" />
                    {CONTACT.phoneDisplay}
                  </a>

                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="flex items-center gap-3 text-base font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                    {CONTACT.email}
                  </a>

                  <div className="flex items-start gap-3 text-base font-semibold text-foreground">
                    <MapPin className="h-5 w-5 mt-0.5" />
                    <span className="leading-snug">{CONTACT.address}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA bottom */}
            <div className="pt-8">
              {session.status === "authenticated" ? (
                <div className="flex flex-col gap-y-3">
                  <p>Connecté en tant que : <span className="font-bold">{session.data.user.name}</span></p>
                  <Link href={"/espace/devis"}>
                  <Button
                    variant="default"
                    className="w-full hover:cursor-pointer w-full rounded-full bg-outline border  py-5 text-dark font-medium leading-none hover:opacity-85 transition"
                    size="sm"
                  >
                    Accéder à mon espace
                  </Button>
                  </Link>
                  <Button
                    variant="default"
                    className="w-full bg-dark hover:bg-primary/90 text-primary-foreground rounded-full py-6"
                    size="sm"
                    onClick={() => { signOut(); }}
                  >
                    Se déconnecter
                  </Button>
                </div>
              ) : (
                <Link href="/login">
                  <Button
                    variant="default"
                    className="w-full bg-dark hover:bg-primary/90 text-primary-foreground rounded-full py-6"
                    size="sm"
                  >
                    Se connecter
                  </Button>
                </Link>
              )
              }
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}