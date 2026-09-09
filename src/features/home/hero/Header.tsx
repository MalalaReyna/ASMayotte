"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { NavItem } from "@/interfaces/navItem";
import NavbarDesktop from "../navbar/NavbarDesktop";
import NavDrawerMobile from "../navbar/NavDrawerMobile";
import { IService } from "@/interfaces/service/service";
import { PopupHero } from "./PopupHero";

const navItems: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "Services" },
  { label: "Tarifs", href: "/#tarifs" },
  { label: "Témoignage", href: "/#temoignage" },
];

type ServicesGroupedResponse = {
  legalJuridicationList: IService[];
  serviceList: IService[];
};

interface HeaderProps {
  servicesData?: ServicesGroupedResponse;
}

export function Header({ servicesData }: HeaderProps) {
  const { scrollY } = useScroll();

  const [hidden, setHidden] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (current > previous && current > 150) setHidden(true);
    else setHidden(false);
    setScrolled(current > 10);
  });

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    if (!isOpen) return () => window.removeEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 select-none">
        { !scrolled && <PopupHero /> }
        <motion.header
          animate={{ y: hidden ? -1000 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={[
            "max-w-[calc(100vw-4rem)] mx-auto mt-4",
            "transition-all duration-300 ease-in-out",
            scrolled ? "bg-[#221511] rounded-full md:max-w-2xl shadow-md" : "md:max-w-6xl",
          ].join(" ")}
        >
          <NavbarDesktop
            navItems={navItems}
            scrolled={scrolled}
            setIsMobileMenuOpen={setIsOpen}
            isMobileMenuOpen={isOpen}
            servicesData={servicesData}
          />
        </motion.header>
      </div>

      <NavDrawerMobile
        navItems={navItems}
        isOpen={isOpen}
        close={close}
        servicesData={servicesData}
      />
    </>
  );
}