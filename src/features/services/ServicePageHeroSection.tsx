"use client"
import { useMemo } from "react";
import { Hero } from "@/components/hero/hero";
import { HeroContent } from "@/components/hero/hero-content";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ImgHeroSectionType } from "@/types/imgHeroSectionType";
import { FileText, Globe, ShieldCheck, Zap, type LucideIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getMarketStatistics } from "@/services/market/marketService";

type ServicePageHeroCard = {
    value: string;
    title: string;
    description: string;
    icon?: string;
};

const cardIconMap: Record<string, LucideIcon> = {
    file: FileText,
    globe: Globe,
    shield: ShieldCheck,
    zap: Zap,
};
interface ServicePageHeroSectionProps {
    title: string,
    subtitle: string,
    ctaLink?: string,
    ctaTitle: string,
    ctaLink2?: string,
    ctaTitle2?: string,
    imgProps: ImgHeroSectionType,
    isCardsData?: boolean
}
export default function ServicePageHeroSection({ title, subtitle, ctaLink, ctaTitle, ctaLink2, ctaTitle2, imgProps, isCardsData = false }: ServicePageHeroSectionProps) {
    const { data: statisticsResult } = useQuery({
        queryKey: ["marketStatistics"],
        queryFn: () => getMarketStatistics(),
        enabled: isCardsData,
    });

    const statistics = statisticsResult?.data;

    const cardsData = useMemo<ServicePageHeroCard[]>(() => {
        if (!isCardsData) return [];

        const marketsValue = statistics?.markets !== undefined ? String(statistics.markets) : "--";
        const regionsValue = statistics?.regions !== undefined ? String(statistics.regions) : "--";
        const filesValue = statistics?.files || "--";
        const productionValue = statistics?.production || "--";

        return [
            {
                value: marketsValue,
                title: "Marchés détectés",
                description: "Total de marchés.",
                icon: "file",
            },
            {
                value: regionsValue,
                title: "Territoires couverts",
                description: "Mayotte, Reunion, Guyane, Antilles et metropole.",
                icon: "globe",
            },
            {
                value: filesValue,
                title: "Dossiers accompagnés",
                description: "Memoire, DC1/DC2, BPU, DPGF, DQE.",
                icon: "shield",
            },
            {
                value: productionValue,
                title: "Production",
                description: "Selon urgence, complexite et disponibilite DCE.",
                icon: "zap",
            },
        ];
    }, [isCardsData, statistics]);

    return (
        <Hero>
            <HeroContent title={title} subtitle={subtitle}>
                <Link href={ctaLink || "/test"} aria-label={`Call to action: ${ctaTitle}`}>
                    {ctaLink ? (<Button
                        size="lg"
                        className="hover:cursor-pointer bg-dark hover:bg-primary/90 text-primary-foreground rounded-full p-6"
                    >
                        {ctaTitle}
                    </Button>
                    ) : null}

                </Link>
                <Link href={ctaLink2 || "/test"} aria-label={`Call to action: ${ctaTitle2}`}>
                    {ctaLink2 ? (<Button
                        size="lg"
                        className="hover:cursor-pointer bg-white hover:bg-primary/90 text-dark rounded-full p-6"
                    >
                        {ctaTitle2}
                    </Button>
                    ) : null}

                </Link>
            </HeroContent>
            {cardsData && cardsData.length > 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="relative 2xl:max-w-180 z-10 px-6 lg:px-8 pb-12"
                >
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {cardsData.map((card, index) => {
                            const Icon = card.icon ? cardIconMap[card.icon] : null;

                            return (
                                <div
                                    key={`${card.title}-${index}`}
                                    className="rounded-3xl border border-white/10 bg-dark/90 px-6 py-6 text-white shadow-[0_20px_50px_rgba(0,0,0,0.25)] backdrop-blur-sm"
                                >
                                    {Icon ? (
                                        <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-[#E4C59F]">
                                            <Icon className="size-5" />
                                        </span>
                                    ) : null}
                                    <p className="text-3xl font-semibold leading-none">{card.value}</p>
                                    <p className="mt-2 text-sm font-semibold text-[#E4C59F]">{card.title}</p>
                                    <p className="mt-3 text-xs leading-relaxed text-white/65">{card.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            ) : null}
            <motion.div
                initial={{ opacity: 0, }}
                animate={{ opacity: 1, }}
                transition={{ duration: 0.25, delay: 0.1 }}
                className='relative'
            >
                <Image
                    width={imgProps.imgWidth}
                    height={imgProps.imgHeight}
                    src={imgProps.imgSrc}
                    alt={imgProps.imgAlt}
                    className={`hidden 2xl:block pointer-events-none ${imgProps.imgClassName}`}
                />
            </motion.div>
        </Hero>
    )
}