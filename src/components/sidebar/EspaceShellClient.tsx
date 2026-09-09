"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, House, LogOut, Menu, X } from "lucide-react";
import { ROLE_ADMIN } from "@/constants/userRoleConsts";

type EspaceShellClientProps = Readonly<{
  children: React.ReactNode;
}>;



export default function EspaceShellClient({ children }: EspaceShellClientProps) {
  const { data: session } = useSession();
  const sidebarItems = session?.user.role !== ROLE_ADMIN ? [] : [
    {
      label: "Tableau de bord",
      href: "/espace/dashboard",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24">
          <path fill="#000" d="M16 19v-4.808h3V19zm-5.5 0V5h3v14zM5 19V9.808h3V19z" />
        </svg>
      ),
    },
    {
      label: "Dossiers",
      href: "/espace/dossier",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24">
          <path fill="#000" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h6l2 2h8q.825 0 1.413.588T22 8v10q0 .825-.587 1.413T20 20z" />
        </svg>
      ),
    },
    {
      label: "Notification",
      href: "/espace/notification",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24">
          <path fill="#000" d="M12.851 17.543q.36-.341.418-.85h-2.538q.058.509.418.85t.851.341t.851-.34M12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709m-3.618-5.846h7.23q.262 0 .439-.177t.177-.438t-.177-.439t-.438-.177h-.385v-2.715q0-1.275-.672-2.317q-.672-1.041-1.867-1.314v-.808q0-.31-.191-.52T12 6.039t-.501.21t-.191.52v.808q-1.194.273-1.867 1.295q-.672 1.022-.672 2.297v2.754h-.385q-.261 0-.438.177t-.177.439t.177.438t.438.177" />
        </svg>
      ),
    },
    {
      label: "Régions",
      href: "/espace/regions",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none" />
          <path fill="#020202" d="M11.3 21.2q-.35-.125-.625-.375Q9.05 19.325 7.8 17.9t-2.087-2.762t-1.275-2.575T4 10.2q0-3.75 2.413-5.975T12 2t5.588 2.225T20 10.2q0 1.125-.437 2.363t-1.275 2.575T16.2 17.9t-2.875 2.925q-.275.25-.625.375t-.7.125t-.7-.125m2.113-9.787Q14 10.825 14 10t-.587-1.412T12 8t-1.412.588T10 10t.588 1.413T12 12t1.413-.587" />
        </svg>
      ),
    },
    {
      label: "Prestations",
      href: "/espace/fichier-admin",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none" />
          <path fill="#020202" d="M4 20q-.825 0-1.412-.587T2 18v-3h9q.825 0 1.413-.587T13 13V4h7q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm-2-6V8q0-.825.588-1.412T4 6h6zm3.825-1L11 7.825V13z" />
        </svg>
      ),
    },
    {
      label: "Appels d'offre",
      href: "/espace/market",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none" />
          <path fill="#020202" d="M6 22q-1.25 0-2.125-.875T3 19v-3h3V2h15v17q0 1.25-.875 2.125T18 22zm12-2q.425 0 .713-.288T19 19V4H8v12h9v3q0 .425.288.713T18 20M9 9V7h9v2zm0 3v-2h9v2z" />
        </svg>
      ),
    },
    {
      label: "Demandes de devis",
      href: "/espace/devis",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none" />
          <path fill="#0b0a0a" d="M18 23q-2.075 0-3.537-1.463T13 18t1.463-3.537T18 13t3.538 1.463T23 18t-1.463 3.538T18 23M7 9h10V7H7zm4.675 12H5q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v6.7q-.725-.35-1.463-.525T18 11q-.275 0-.513.012t-.487.063V11H7v2h6.125q-.45.425-.812.925T11.675 15H7v2h4.075q-.05.25-.062.488T11 18q0 .825.15 1.538T11.675 21m7.388-3.437q.437-.438.437-1.063t-.437-1.062T18 15t-1.062.438T16.5 16.5t.438 1.063T18 18t1.063-.437m.337 3.087q.65-.35 1.075-.975q-.575-.35-1.2-.513T18 19t-1.275.163t-1.2.512q.425.625 1.075.975T18 21t1.4-.35" />
        </svg>

      ),
    },
    
  ];
  const pathname = usePathname();
  const [isSidebarCompact, setIsSidebarCompact] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  const toggleCompactSidebar = () => setIsSidebarCompact((prev) => !prev);
  const isEffectiveCompact = isSidebarCompact;

  const userName = useMemo(() => session?.user?.name || "Utilisateur", [session?.user?.name]);
  const userEmail = useMemo(() => session?.user?.email || "email", [session?.user?.email]);
  const initials = useMemo(() => {
    const base = userName.trim();
    if (!base) return "U";
    return base
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [userName]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");

    const updateViewport = () => {
      setIsMobileViewport(mediaQuery.matches);
      setIsSidebarCompact(false)
    };

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);

    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (!userMenuRef.current) return;
      if (!userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    setIsUserMenuOpen(false);
    setIsSidebarOpen(false);
  }, [pathname, isEffectiveCompact]);

  const SidebarContent = (
    <div className="flex h-full flex-col rounded-[1.75rem] p-4">
      <div className="mb-6 flex items-center justify-center border-b border-[white] pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-[0.75rem] bg-[#220e00] text-white">
            <Image src="/images/as-mayotte-logo-white.png" alt="Logo" width={20} height={20} />
          </div>
          {!isEffectiveCompact ? (
            <div>
              <p className="text-lg font-semibold text-[#2a1706]">A&S Mayotte</p>
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "flex items-center rounded-[1.25rem] px-4 py-3 text-[1rem] transition-colors",
                  isEffectiveCompact ? "justify-center" : "gap-3",
                  isActive
                    ? "bg-white font-bold text-[#2a1706] shadow-sm"
                    : "text-[#3b2b1d] hover:bg-white/80",
                ].join(" ")}
              >
                {item.icon}
                {!isEffectiveCompact ? <span>{item.label}</span> : null}
              </Link>
            );
          })}
        </nav>
      </div>

      <div ref={userMenuRef} className="relative mt-auto">
        {isUserMenuOpen ? (
          <div
            className={[
              "absolute bottom-full mb-2 z-20 rounded-2xl border border-[#eadfce] bg-white p-2 shadow-lg",
              isEffectiveCompact ? "left-1/2 w-[13.75rem] -translate-x-1/2" : "left-0 right-0",
            ].join(" ")}
          >
            <Link
              href="/"
              onClick={() => setIsUserMenuOpen(false)}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-[#2a1706] hover:bg-[#f8f2ec]"
            >
              <House size={16} />
              <span>Retourner au site principal</span>
            </Link>

            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-[#9a2e2e] hover:bg-[#fff2f2]"
            >
              <LogOut size={16} />
              <span>Se deconnecter</span>
            </button>
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => setIsUserMenuOpen((prev) => !prev)}
          className={[
            "w-full rounded-[1.5rem] border border-[#eadfce] bg-white p-3 text-left",
            isEffectiveCompact ? "flex justify-center p-2" : "flex items-center justify-between",
          ].join(" ")}
          aria-label="Ouvrir le menu utilisateur"
        >
          {isEffectiveCompact ? (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3ece6] text-sm font-semibold text-[#2a1706]">
              {initials}
            </div>
          ) : (
            <>
              <div>
                <p className="text-base font-semibold text-[#2a1706]">{userName}</p>
                <p className="text-sm text-[#86796d]">{userEmail}</p>
              </div>
              <ChevronDown
                size={16}
                className={[
                  "text-[#7b7065] transition-transform",
                  isUserMenuOpen ? "rotate-0" : "rotate-180",
                ].join(" ")}
              />
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f3ece6] bg-[url('/images/herobg.png')] bg-cover bg-center">
      <div className="mx-auto flex min-h-screen gap-2 p-2 md:gap-4 md:p-4">
        {!isMobileViewport ? (
          <aside
            className={[
              "shrink-0 transition-[width] duration-300",
              isEffectiveCompact ? "w-[6rem]" : "w-[17.5rem]",
            ].join(" ")}
          >
            {SidebarContent}
          </aside>
        ) : null}

        <div className="flex min-h-[calc(100vh-2rem)] flex-1 flex-col rounded-[1.75rem] border border-[#e8ddd3] bg-white/90 backdrop-blur-sm">
          <header className="flex items-center gap-5 border-b border-[#eee3d9] px-4 py-3 lg:px-6">
            {isMobileViewport ? (
              <button
                type="button"
                onClick={() => setIsSidebarOpen(true)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl transition hover:bg-[#f8f2ec]"
                aria-label="Ouvrir le menu"
              >
                <Menu size={18} />
              </button>
            ) : null}
            <button
              type="button"
              onClick={toggleCompactSidebar}
              className="hidden h-9 w-9 items-center justify-center rounded-xl transition hover:bg-[#f8f2ec] lg:inline-flex"
              aria-label={isSidebarCompact ? "Agrandir la sidebar" : "Reduire la sidebar"}
              title={isSidebarCompact ? "Agrandir" : "Reduire"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="none"
                  stroke="#696760"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm5-2v16"
                />
              </svg>
            </button>
            <div>
              <p className="text-lg font-semibold">Bonjour, {session ? session.user.name : "Utilisateur"}</p>
              <p className="opacity-50">
                {new Date().toLocaleDateString("fr-FR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </header>

          <main className={`flex-1 ${!isMobileViewport ? "max-h-[80vh]" : ""} overflow-auto p-4 lg:p-6`}>{children}</main>
        </div>
      </div>

      {isMobileViewport && isSidebarOpen ? (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Fermer le menu"
            onClick={() => setIsSidebarOpen(false)}
            className="absolute inset-0 bg-black/35"
          />
          <div className="relative h-full p-3">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(false)}
              className="absolute right-5 top-5 z-10 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#2a1706] shadow"
              aria-label="Fermer"
            >
              <X size={18} />
            </button>
            <div className="h-full rounded-[1.75rem] border border-[#e8ddd3] bg-[#f9f4ef]/95 backdrop-blur-sm">
              {SidebarContent}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
