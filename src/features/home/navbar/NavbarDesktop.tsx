import ServiceDropdownContent from "@/components/dropdowns/ServiceDropdownContent";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { NavItem } from "@/interfaces/navItem";
import { IService } from "@/interfaces/service/service";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import UserLoggedIn from "@/features/auth/UserLoggedIn";

type ServicesGroupedResponse = {
  legalJuridicationList: IService[];
  serviceList: IService[];
};

interface NavbarDesktopProps {
  navItems: NavItem[];
  scrolled: boolean;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  servicesData?: ServicesGroupedResponse;
}

export default function NavbarDesktop({
  navItems,
  scrolled,
  setIsMobileMenuOpen,
  isMobileMenuOpen,
  servicesData,
}: NavbarDesktopProps) {
  const session = useSession();
  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 sm:pr-2 lg:pl-8 lg:pr-2 flex items-center justify-between h-[60px]">
      <Link href="/" aria-label="Redirection vers la page d'accueil">
        <div className="flex-shrink-0 flex items-center gap-2">
          <Image
            src={scrolled ? "/images/as-mayotte-logo-white.png" : "/images/as-test.png"}
            alt="Logo"
            width={30}
            height={30}
          />
        </div>
      </Link>

      <NavigationMenu className="hidden md:flex rounded-full px-1 py-1 bg-[#221511]">
        <NavigationMenuList>
          {navItems.map((item) => {
            switch (item.label) {
              case "Services":
                return (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuTrigger
                      className={`bg-transparent hover:bg-[#47311F] rounded-full hover:text-white px-3 font-light text-white/60 text-sm ${scrolled ? "py-3.5" : "py-3"
                        }`}
                    >
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ServiceDropdownContent servicesData={servicesData} />
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                );
              default:
                return (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuLink
                      href={item.href || "#"}
                      className={`bg-transparent hover:cursor-pointer hover:bg-[#47311F] rounded-full hover:text-white px-3 text-white/60 font-light ${scrolled ? "py-3.5" : "py-3"
                        }`}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
            }
          })}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="hidden md:block">
        {/* <a href="#contact">
          <Button
            variant="default"
            className="hover:bg-primary rounded-full p-6 bg-white text-dark hover:text-white"
            size="sm"
          >
            Contact
          </Button>
        </a> */}
        {session.status === "authenticated" ? (
          <UserLoggedIn userName={session.data.user?.name || "Utilisateur"} onLogOut={() => signOut()} />
        ) : 
        (
         <Link href="/login">
            <Button
              variant="default"
              className="hover:cursor-pointer hover:bg-primary rounded-full p-6 bg-white text-dark hover:text-white"
              size="sm"
            >
              Se connecter
            </Button>
          </Link> 
        )
        }

      </div>

      <button
        className="md:hidden p-2 text-white bg-primary hover:bg-dark rounded-full transition-colors"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </nav>
  );
}