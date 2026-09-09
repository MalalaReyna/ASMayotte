"use client";

import { Calendar, FileText, MapPin, Receipt, Users, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GetMarketResponse } from "@/types/market/marketType";
import { formatMarketDate, formatMarketDuration, formatMarketPrice } from "./marketHelpers";
import PublicTenderFooter from "./PublicTenderFooter";

type PublicTenderDetailsModalProps = {
  open: boolean;
  tender: GetMarketResponse | null;
  onClose: () => void;
  onRequestQuote: (tender: GetMarketResponse) => void;
};

export default function PublicTenderDetailsModal({
  open,
  tender,
  onClose,
  onRequestQuote,
}: PublicTenderDetailsModalProps) {
  if (!tender) return null;

  const badgeLabel = tender.typeMarket || tender.tags || "Marche public";
  const reference = tender.reference || tender.sigleReference || "Reference inconnue";
  const description = tender.description || tender.footerDescription || "";
  const buyer = tender.buyer || "Acheteur non renseigne";
  const location = tender.location || "Lieu non renseigne";
  const lot = tender.lot || "Lots non renseignes";
  const avisLink = tender.avisLink || "";

  return (
    <Dialog  open={open} onOpenChange={(value) => (value ? undefined : onClose())}>
      <DialogContent
        showCloseButton={false}
        className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-4xl border-outline bg-white p-6 shadow-lg"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface text-primary"
          aria-label="Fermer"
        >
          <X size={16} />
        </button>
        
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-outline bg-surface px-3 py-1 text-xs font-semibold text-secondary">
              {badgeLabel}
            </span>
            <span className="rounded-full border border-outline px-3 py-1 text-xs font-semibold text-primary">
              {reference}
            </span>
          </div>

          <div>
            <DialogTitle className="text-2xl font-semibold text-dark">
              {tender.title}
            </DialogTitle>
          </div>
        </div>

        <div className="mt-6 min-h-0 flex-1 overflow-y-auto pr-1 pb-2">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <DialogDescription className="col-span-full mt-2 text-sm text-secondary">
              {description}
            </DialogDescription>
            <div className="rounded-2xl border border-outline bg-surface p-4">
              <p className="text-xs font-semibold uppercase text-secondary">Acheteur</p>
              <div className="mt-3 flex items-center gap-2 text-sm text-dark">
                <Users size={16} className="text-primary" />
                <span>{buyer}</span>
              </div>
            </div>
            <div className="rounded-2xl border border-outline bg-surface p-4">
              <p className="text-xs font-semibold uppercase text-secondary">Lieu</p>
              <div className="mt-3 flex items-center gap-2 text-sm text-dark">
                <MapPin size={16} className="text-primary" />
                <span>{location}</span>
              </div>
            </div>
            <div className="rounded-2xl border border-outline bg-surface p-4">
              <p className="text-xs font-semibold uppercase text-secondary">Date limite</p>
              <div className="mt-3 flex items-center gap-2 text-sm text-dark">
                <Calendar size={16} className="text-primary" />
                <span>{formatMarketDate(tender.limitDate)}</span>
              </div>
            </div>
            <div className="rounded-2xl border border-outline bg-surface p-4">
              <p className="text-xs font-semibold uppercase text-secondary">Montant</p>
              <div className="mt-3 flex items-center gap-2 text-sm text-dark">
                <Receipt size={16} className="text-primary" />
                <span>{formatMarketPrice(tender)}</span>
              </div>
            </div>
            <div className="rounded-2xl border border-outline bg-surface p-4">
              <p className="text-xs font-semibold uppercase text-secondary">Lots</p>
              <div className="mt-3 flex items-center gap-2 text-sm text-dark">
                <FileText size={16} className="text-primary" />
                <span>{lot}</span>
              </div>
            </div>
            <div className="rounded-2xl border border-outline bg-surface p-4">
              <p className="text-xs font-semibold uppercase text-secondary">Durée</p>
              <div className="mt-3 flex items-center gap-2 text-sm text-dark">
                <Calendar size={16} className="text-primary" />
                <span>{formatMarketDuration(tender.duration)}</span>
              </div>
            </div>
          </div>
          <PublicTenderFooter description={tender.footerDescription} />

          <div className="mt-6 flex flex-wrap gap-3 pb-2">
            <Button
              className="rounded-full bg-primary px-5 text-white hover:bg-primary/90"
              onClick={() => onRequestQuote(tender)}
            >
              Demander un devis pour ce marché
            </Button>
            {avisLink ? (
              <Button
                variant="outline"
                className="rounded-full border-outline px-5 text-dark"
                asChild
              >
                <a href={avisLink} target="_blank" rel="noreferrer">
                  Voir l'avis officiel
                </a>
              </Button>
            ) : (
              <Button
                variant="outline"
                className="rounded-full border-outline px-5 text-dark"
                disabled
              >
                Avis indisponible
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
