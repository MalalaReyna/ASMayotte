"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import PublicTenderCard from "./PublicTenderCard";
import PublicTenderFilters from "./PublicTenderFilters";
import { Button } from "@/components/ui/button";
import { getRecentMarkets } from "@/services/market/marketService";
import { GetMarketResponse } from "@/types/market/marketType";
import { IActivitySector } from "@/interfaces/activity/activity";

const useDebouncedValue = <T,>(value: T, delay = 400) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeoutId = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timeoutId);
    }, [value, delay]);

    return debouncedValue;
};

type PublicTenderSectionProps = {
    onViewDetails: (tender: GetMarketResponse) => void;
    onRequestQuote: (tender: GetMarketResponse) => void;
    activitySectors:IActivitySector[];
    title?: string;
    showViewMore?: boolean;
    viewMoreHref?: string;
    enablePagination?: boolean;
    pageSize?: number;
};

export default function PublicTenderSection({
    onViewDetails,
    onRequestQuote,
    title = "Marchés publics récents",
    showViewMore = true,
    viewMoreHref = "/reponse-marche-public/marches",
    enablePagination = false,
    pageSize = 9,
    activitySectors
}: PublicTenderSectionProps) {
    const [searchValue, setSearchValue] = useState("");
    const [regionValue, setRegionValue] = useState("");
    const [typeValue, setTypeValue] = useState("");
    const [page, setPage] = useState(1);

    const searchQuery = searchValue.trim();
    const debouncedSearchQuery = useDebouncedValue(searchQuery, 400);

    useEffect(() => {
        if (enablePagination) setPage(1);
    }, [enablePagination, debouncedSearchQuery, regionValue, typeValue]);

    const currentPage = enablePagination ? page : 1;

    const { data: marketResponse, isLoading } = useQuery({
        queryKey: ["markets", debouncedSearchQuery, regionValue, typeValue, currentPage],
        queryFn: () =>
            getRecentMarkets({
                search: debouncedSearchQuery,
                page: currentPage,
                limit: pageSize,
                region: regionValue,
                typeMarket: typeValue,
                hasExpired: false,
            }),
    });

    const markets = marketResponse?.data ?? [];

    const showEmptyState = !isLoading && markets.length === 0;
    const total = marketResponse?.meta?.total ?? markets.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const canGoPrev = currentPage > 1;
    const canGoNext = currentPage < totalPages;

    return (
        <section id="marches" className="bg-surface">
            <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20 lg:px-8 lg:py-24">
                <div className="flex flex-col gap-3">
                    <h2 className="text-h2-mobile md:text-h2 font-semibold text-dark">
                        {title}
                    </h2>
                    <p className="max-w-2xl text-secondary">
                        Les opportunites affichees proviennent de sources publiques et ouvertes. Les informations
                        sont donnees a titre indicatif et doivent etre verifiees dans le DCE officiel avant toute reponse.
                    </p>
                </div>

                <PublicTenderFilters
                    searchValue={searchValue}
                    regionValue={regionValue}
                    typeValue={typeValue}
                    types={activitySectors}
                    onSearchChange={setSearchValue}
                    onRegionChange={setRegionValue}
                    onTypeChange={setTypeValue}
                />

                <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {markets.map((tender) => (
                        <PublicTenderCard
                            key={tender.id}
                            tender={tender}
                            onViewDetails={onViewDetails}
                            onRequestQuote={onRequestQuote}
                        />
                    ))}
                </div>
                {isLoading ? (
                    <div className="mt-6 rounded-3xl border border-outline bg-white px-6 py-8 text-center text-sm text-secondary">
                        Chargement des marches recents...
                    </div>
                ) : null}
                {showEmptyState ? (
                    <div className="mt-6 rounded-3xl border border-outline bg-white px-6 py-8 text-center text-sm text-secondary">
                        Aucun marche ne correspond a vos filtres.
                    </div>
                ) : null}
                {enablePagination && totalPages > 1 ? (
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                        <Button
                            variant="outline"
                            className="rounded-full border-outline px-5 text-dark"
                            disabled={!canGoPrev}
                            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                        >
                            Precedent
                        </Button>
                        <span className="text-xs font-semibold text-secondary">
                            Page {currentPage} sur {totalPages}
                        </span>
                        <Button
                            variant="outline"
                            className="rounded-full border-outline px-5 text-dark"
                            disabled={!canGoNext}
                            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                        >
                            Suivant
                        </Button>
                    </div>
                ) : null}
            </div>
            {showViewMore ? (
                <Button
                    className="w-fit flex mx-auto -mt-10 hover:cursor-pointer bg-transparent hover:bg-outline text-primary border border-outline rounded-full text-lg p-5"
                    asChild
                >
                    <Link href={viewMoreHref}>Voir plus</Link>
                </Button>
            ) : null}
        </section>
    );
}
