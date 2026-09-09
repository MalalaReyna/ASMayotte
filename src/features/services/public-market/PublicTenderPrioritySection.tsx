"use client";

import { getRecentMarkets } from "@/services/market/marketService";
import PublicTenderPriorityCard from "./PublicTenderPriorityCard";
import { GetMarketResponse } from "@/types/market/marketType";
import { useQuery } from "@tanstack/react-query";

type PublicTenderPrioritySectionProps = {
  onRequestQuote: (tender: GetMarketResponse) => void;
};

export default function PublicTenderPrioritySection({
  onRequestQuote,
}: PublicTenderPrioritySectionProps) {
  const { data: marketResponse, isLoading } = useQuery({
    queryKey: ["markets"],
    queryFn: () =>
      getRecentMarkets({
        page: 1,
        limit: 4,
        hasExpired: false,
      }),
  });

  const tenders = marketResponse?.data ?? [];

  return (
    <section className="bg-surface">
      <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:py-16 lg:px-8">
        <div className="rounded-4xl border border-outline bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <span className="inline-flex w-fit items-center rounded-full border border-outline bg-surface px-3 py-1 text-xs font-semibold text-secondary">
                Opportunites a ne pas rater
              </span>
              <h2 className="text-2xl font-semibold text-dark sm:text-3xl">
                Marchés prioritaires pour vos prospects
              </h2>
            </div>
            {/* <p className="max-w-xs text-xs text-secondary">
              Score calcule selon territoire, delai, secteur et montant disponible.
            </p> */}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {isLoading ? (
              <div className="col-span-full rounded-3xl border border-outline bg-white px-6 py-8 text-center text-sm text-secondary">
                Chargement des opportunités...
              </div>) : tenders.map((tender, index) => (
                <PublicTenderPriorityCard
                  key={tender.id}
                  tender={tender}
                  rank={index + 1}
                  onRequestQuote={onRequestQuote}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
