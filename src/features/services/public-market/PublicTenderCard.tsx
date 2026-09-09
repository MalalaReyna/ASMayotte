import { Building2, Calendar, MapPin, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GetMarketResponse } from "@/types/market/marketType";
import { formatMarketDate } from "./marketHelpers";

type PublicTenderCardProps = {
  tender: GetMarketResponse;
  onViewDetails: (tender: GetMarketResponse) => void;
  onRequestQuote: (tender: GetMarketResponse) => void;
};

export default function PublicTenderCard({
  tender,
  onViewDetails,
  onRequestQuote,
}: PublicTenderCardProps) {
  const tags = tender.tags || [];
  const category = tender.typeMarket || "Marche public";

  const description =
    tender.description ||
    tender.footerDescription ||
    "Description a venir.";

  const buyer = tender.buyer || "Acheteur non renseigne";
  const location = tender.location || "Lieu non renseigne";

  return (
    <article className="flex h-full flex-col rounded-3xl border border-outline bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full border border-outline bg-surface px-3 py-1 text-xs font-semibold text-secondary">
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="mt-4 space-y-2">
        <h3 className="line-clamp-2 text-lg font-semibold text-dark">
          {tender.title}
        </h3>

        <p className="line-clamp-3 text-sm text-secondary">
          {description}
        </p>
      </div>

      {/* Bottom section pushed down */}
      <div className="mt-auto pt-6">
        {/* Infos */}
        <div className="grid gap-2 text-xs text-secondary">
          <div className="flex items-center gap-2">
            <Building2 size={14} className="text-primary" />
            <span className="line-clamp-1">{buyer}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-primary" />
            <span className="line-clamp-1">{location}</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-primary" />
            <span>
              Date limite: {formatMarketDate(tender.limitDate)}
            </span>
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full border border-outline bg-surface px-3 py-1 text-[0.7rem] font-medium text-secondary"
              >
                <Tag size={10} className="text-primary" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex flex-wrap justify-between gap-3">
          <Button
            variant="outline"
            className="rounded-full border-outline px-5 text-dark"
            onClick={() => onViewDetails(tender)}
          >
            Voir detail
          </Button>

          <Button
            className="rounded-full bg-primary px-5 text-white hover:bg-primary/90"
            onClick={() => onRequestQuote(tender)}
          >
            Demander un devis
          </Button>
        </div>
      </div>
    </article>
  );
}