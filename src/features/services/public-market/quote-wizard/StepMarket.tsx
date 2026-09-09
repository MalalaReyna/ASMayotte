"use client";

import { GetMarketResponse } from "@/types/market/marketType";
import { formatMarketDate } from "../marketHelpers";

type StepMarketProps = {
  tender: GetMarketResponse;
  buyer: string;
  location: string;
};

export default function StepMarket({ tender, buyer, location }: StepMarketProps) {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      <div>
        <label className="text-xs font-semibold text-secondary">Titre du marché</label>
        <input
          readOnly
          defaultValue={tender.title}
          className="mt-2 w-full rounded-2xl border border-outline bg-surface px-4 py-3 text-sm text-dark"
        />
      </div>
      <div>
        <label className="text-xs font-semibold text-secondary">Référence</label>
        <input
          readOnly
          defaultValue={tender.reference || tender.sigleReference || ""}
          className="mt-2 w-full rounded-2xl border border-outline bg-surface px-4 py-3 text-sm text-dark"
        />
      </div>
      <div>
        <label className="text-xs font-semibold text-secondary">Acheteur</label>
        <input
          readOnly
          defaultValue={buyer}
          className="mt-2 w-full rounded-2xl border border-outline bg-surface px-4 py-3 text-sm text-dark"
        />
      </div>
      <div>
        <label className="text-xs font-semibold text-secondary">Date limite</label>
        <input
          readOnly
          defaultValue={formatMarketDate(tender.limitDate)}
          className="mt-2 w-full rounded-2xl border border-outline bg-surface px-4 py-3 text-sm text-dark"
        />
      </div>
      <div>
        <label className="text-xs font-semibold text-secondary">Lieu</label>
        <input
          readOnly
          defaultValue={location}
          className="mt-2 w-full rounded-2xl border border-outline bg-surface px-4 py-3 text-sm text-dark"
        />
      </div>
      <div>
        <label className="text-xs font-semibold text-secondary">Lien avis</label>
        <input
          readOnly
          defaultValue={tender.avisLink}
          className="mt-2 w-full rounded-2xl border border-outline bg-surface px-4 py-3 text-sm text-dark"
        />
      </div>
    </div>
  );
}
