import { ArrowUpRight } from "lucide-react";
import { GetMarketResponse } from "@/types/market/marketType";
import { formatMarketDate } from "./marketHelpers";

type PublicTenderPriorityCardProps = {
  tender: GetMarketResponse;
  rank: number;
  onRequestQuote: (tender: GetMarketResponse) => void;
};

export default function PublicTenderPriorityCard({
  tender,
  rank,
  onRequestQuote,
}: PublicTenderPriorityCardProps) {
  return (
    <article className="flex h-full flex-col gap-3 rounded-3xl border border-outline bg-surface p-5 shadow-sm">
      <span className="text-lg font-semibold text-primary">#{rank}</span>
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-dark">{tender.title}</h3>
        <p className="text-xs text-secondary">
          {tender.location || "Lieu non renseigne"} - {tender.typeMarket || tender.tags || "Marche"} - {formatMarketDate(tender.limitDate)}
        </p>
      </div>
      <button
        type="button"
        onClick={() => onRequestQuote(tender)}
        className="mt-auto inline-flex items-center gap-2 text-xs font-semibold text-primary hover:text-primary/80"
      >
        Demander un devis
        <ArrowUpRight size={14} />
      </button>
    </article>
  );
}
